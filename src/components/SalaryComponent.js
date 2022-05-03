import React, { useState } from "react";
import {Breadcrumb, BreadcrumbItem, CardTitle, CardText, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";

//Render danh sách lương của nhân viên
function RenderSalary({ staff }) {

    //Thêm thuộc tính salary vào trong staff và tính lương
    staff.salary = parseInt((parseFloat(staff.salaryScale) * 3000000 + (parseFloat(staff.overTime) / 8) * 200000),10);
    
    return(
        <Card>
            <CardTitle className="p-3 pl-4 m-0">{staff.name}</CardTitle>
            <CardBody className="p-0 pl-5 pb-3">
                <CardText>Mã nhân viên: {staff.id}</CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            </CardBody>
            <CardText className="border-top text-center p-2">Lương: {staff.salary}</CardText>
        </Card>
    )
}

function Salary(props) {

    //Dùng Hook useState để Render lại khi sortSalary được thay đổi
    const [sortSalary, setSort] = useState(false);

    //Sắp xếp lại danh sách theo lương khi sortStaff được thay đổi
    const salaryList = props.staffs.staffs.filter((staff) => staff.name != null).sort((a, b) => {
        if (sortSalary) {
            return b.salary - a.salary;
        } else {
            return a.salary - b.salary;
        }
        

    //Dùng map() để lặp qua từng nhân viên và lấy chúng vào danh sách 
    }).map((staff) => {
        return(
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 mb-5">
                <RenderSalary staff={staff} />
            </div>
        )
    })

    //Render toàn bộ giao diện của trang bảng lương
    return(
        <div className="container mt-3">
            <div className="row m-0">
                <Breadcrumb className="m-0">
                    <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
                <div className="col p-0">
                    <button className="btn btn-warning" onClick={() => setSort(!sortSalary)}>Sắp xếp theo lương</button>
                </div>
            </div>
            <hr />
            <div className="row">
                {salaryList}
            </div>
        </div>
    )
}

export default Salary;