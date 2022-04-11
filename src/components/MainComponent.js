import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Footer from './FooterComponent';
import { STAFFS } from "../shared/staffs";
import { Route, Switch, Redirect } from "react-router-dom";

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
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
                    <Route path="/Nhân-Viên" component={() => <StaffList staffs={this.state.staffs} />} />
                    <Route path="/Nhân-Viên/:staffId" component={StaffWithId} />
                    <Redirect to="/Nhân-Viên" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main;