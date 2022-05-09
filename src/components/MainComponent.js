import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import DepartmentDetail from "./DepartmentDetailComponent";
import Footer from './FooterComponent';
import Salary from "./SalaryComponent";
import { Route, Switch, Redirect, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { postStaff, fetchDepartments, fetchStaffs, fetchStaffsSalary, deleteStaff, patchStaff } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchStaffs: () => {dispatch(fetchStaffs())},
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
    postStaff: (staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(postStaff(staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
    patchStaff: (id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => dispatch(patchStaff(id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime)),
    deleteStaff: (id) => {dispatch(deleteStaff(id))},
    
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
                    departments={this.props.departments}
                    staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                    patchStaff={this.props.patchStaff}
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                />
            );
        }
        const DepartmentWithId = ({match}) => {
            return(
                <DepartmentDetail
                    staffs={this.props.staffs}
                    department={this.props.departments.departments.filter((department) => department.id === match.params.departmentId)[0]}
                    isLoading={this.props.departments.isLoading}
                    errMess={this.props.departments.errMess}
                />
            );
        }

        return(
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location}>
                            <Route exact path="/Nhân-Viên" component={() => <StaffList
                                staffs={this.props.staffs}
                                deleteStaff={this.props.deleteStaff}
                                postStaff={this.props.postStaff}
                                isLoading={this.props.staffs.isLoading}
                                errMess={this.props.staffs.errMess}
                            />} />
                            <Route exact path="/Nhân-Viên/:staffId" component={StaffWithId} />
                            <Route exact path="/Phòng-Ban" component={() => <Department
                                departments={this.props.departments} 
                                staffs={this.props.staffs}
                                isLoading={this.props.departments.isLoading}
                                errMess={this.props.departments.errMess}
                            />} />
                            <Route exact path="/Phòng-Ban/:departmentId" component={DepartmentWithId} />
                            <Route exact path="/Bảng-Lương" component={() => <Salary 
                                staffsSalary={this.props.staffsSalary}
                                isLoading={this.props.staffsSalary.isLoading}
                                errMess={this.props.staffsSalary.errMess}
                            />} />
                            <Redirect to="/Nhân-Viên" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));