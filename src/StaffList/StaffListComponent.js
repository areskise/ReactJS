import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
           selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff});
    }

    renderStaff(staff) {
        if (staff != null) {
            return(
                <Card>
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyy")}</CardText>
                    <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyy")}</CardText>
                    <CardText>Phòng ban: {staff.department}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </Card>
            );
        } else {
            return(<div></div>);
        }
    }

    render() {
        const StaffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-6 col-lg-4">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardTitle>{(staff.id) + 1}. {staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    {StaffList}
                </div>
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        )
      }
}

export default StaffList;
