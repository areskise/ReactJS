import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import Footer from './FooterComponent';
import Salary from "./SalaryComponent";
import { Route, Switch, Redirect, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { addNewStaff, fetchStaffs } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNewStaff: (staffId, name, doB, startDate, department, salaryScale, annualLeave, overTime, image) => dispatch(addNewStaff(staffId, name, doB, startDate, department, salaryScale, annualLeave, overTime, image)),
    fetchStaffs: () => {dispatch(fetchStaffs())}
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
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
                        staffsLoading={this.props.staffs.isLoading}
                        staffsErrMess={this.props.staffs.errMess}
                    />} />
                    <Route exact path="/Nhân-Viên/:staffId" component={StaffWithId} />
                    <Route exact path="/Phòng-Ban" component={() => <Department departments={this.props.departments} />} />
                    <Route exact path="/Bảng-Lương" component={() => <Salary staffs={this.props.staffs}/>} />
                    <Redirect to="/Nhân-Viên" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));