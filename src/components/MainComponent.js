import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import Footer from './FooterComponent';
import Salary from "./SalaryComponent";
import { Route, Switch, Redirect, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { addNewStaff, fetchDepartments, fetchStaffs, fetchStaffsSalary } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNewStaff: (staffId, name, doB, startDate, department, salaryScale, annualLeave, overTime) => dispatch(addNewStaff(staffId, name, doB, startDate, department, salaryScale, annualLeave, overTime)),
    fetchStaffs: () => {dispatch(fetchStaffs())},
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchStaffsSalary();
    }

    render() {
        
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail
                    staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                />
            );
        }

        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path="/Nhân-Viên" component={() => <StaffList
                        staffs={this.props.staffs}
                        addNewStaff={this.props.addNewStaff}
                        isLoading={this.props.staffs.isLoading}
                        errMess={this.props.staffs.errMess}
                    />} />
                    <Route exact path="/Nhân-Viên/:staffId" component={StaffWithId} />
                    <Route exact path="/Phòng-Ban" component={() => <Department
                        departments={this.props.departments} 
                        isLoading={this.props.departments.isLoading}
                        errMess={this.props.departments.errMess}
                    />} />
                    <Route exact path="/Bảng-Lương" component={() => <Salary 
                        staffs={this.props.staffs}
                        isLoading={this.props.staffsSalary.isLoading}
                        errMess={this.props.staffsSalary.errMess}
                    />} />
                    <Redirect to="/Nhân-Viên" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));