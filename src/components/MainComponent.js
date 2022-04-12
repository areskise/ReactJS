import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import Footer from './FooterComponent';
import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import { Route, Switch, Redirect } from "react-router-dom";
import Salary from "./SalaryComponent";

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,

        }
    }

    render() {
        
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail
                    staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                />
            );

        }

        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path="/Nhân-Viên" component={() => <StaffList staffs={this.state.staffs} />} />
                    <Route exact path="/Nhân-Viên/:staffId" component={StaffWithId} />
                    <Route exact path="/Phòng-Ban" component={() => <Department departments={this.state.departments} />} />
                    <Route exact path="/Nhân-Viên/Bảng-Lương" component={() => <Salary staffs={this.state.staffs}/>} />
                    <Redirect to="/Nhân-Viên" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main;