import React from "react";
import {Breadcrumb, BreadcrumbItem, CardTitle, CardText, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";


function RenderSalary({ staff }) {
    const salary = parseInt(staff.salaryScale) * 3000000 + (parseInt(staff.overTime)/8)* 200000
    return(
        <Card>
            <CardTitle className="p-3 pl-4 m-0">{staff.name}</CardTitle>
            <CardBody className="p-0 pl-5 pb-3">
                <CardText>Mã nhân viên: {staff.id}</CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            </CardBody>
            <CardText className="border-top text-center p-2">Lương: {salary}</CardText>
        </Card>
    )
}

function Salary(props) {

    const salaryList = props.staffs.map((staff) => {
        return(
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 mb-5">
                <RenderSalary staff={staff} />
            </div>
        )
    })
    return(
        <div className="container mt-3">
            <div className="row m-0">
                <Breadcrumb className="m-0">
                    <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <hr />
            <div className="row">
                {salaryList}
            </div>
        </div>
    )
}

export default Salary;