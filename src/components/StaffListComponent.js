import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
           selectedStaff: null,
           colDefault: "col-12 col-md-6 col-lg-4",
        }
    }

    onStaffSelect(staff) {
        this.setState({selectedStaff: staff});
    }
    numCol(col) {
        this.setState({colDefault: col});
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <div className="col-12">
                    <Card>
                        <CardBody>
                            <CardTitle>Họ và tên: {staff.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {staff.department.name}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    render() {
        const staffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className={this.state.colDefault}>
                    <Card onClick={() => this.onStaffSelect(staff)} className="hover">
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
                    <button className="btn btn-warning col" onClick={() => this.numCol("col-12 col-md-6 col-lg-4")}>mặc định</button>
                    <button className="btn btn-warning col" onClick={() => this.numCol("col-md-12")}>1 cột</button>
                    <button className="btn btn-warning col" onClick={() => this.numCol("col-md-6")}>2 cột</button>
                    <button className="btn btn-warning col" onClick={() => this.numCol("col-md-4")}>3 cột</button>
                    <button className="btn btn-warning col" onClick={() => this.numCol("col-md-3")}>4 cột</button>
                    <button className="btn btn-warning col" onClick={() => this.numCol("col-md-2")}>6 cột</button>
                </div>
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
