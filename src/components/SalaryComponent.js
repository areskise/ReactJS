import React from "react";
import {Breadcrumb, BreadcrumbItem, Card, CardHeader, CardText } from "reactstrap";
import { Link } from "react-router-dom";


function RenderSalary({staff}){
    const salary = parseInt(staff.salaryScale) * 3000000 + (parseInt(staff.overTime)/8)* 200000
    return(
        <Card>
            <CardHeader>{staff.name}</CardHeader>
            <CardText>Mã nhân viên: {staff.id}</CardText>
            <CardText>Hệ số lương: {staff.salaryScale}</CardText>
            <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            <CardText>Lương: {salary}</CardText>
        </Card>
    )
}

function Salary(props) {

    const salaryList = props.staffs.map((staff) => {
        return(
            <div className="col-6 col-md-4 col-lg-2 mb-3">
                <RenderSalary staff={staff} />
            </div>
        )
    })
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {salaryList}
            </div>
        </div>
    )
}

export default Salary;