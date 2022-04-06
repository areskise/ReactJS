import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
           selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({selectedStaff: staff});
    }

    renderStaff(staff) {
        console.log(staff)
        if (staff != null) {
            return (
                <Card className="col-12">
                    <CardBody>
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return <div></div>;
        }
    }

    render() {
        const staffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-6 col-lg-4">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardBody>
                            <CardTitle>{(staff.id) + 1}. {staff.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )

        });

        return (
            <div className="container">
                <div className="row">
                    {staffList}
                </div>
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        );
    }
}
export default StaffList;
