import React from "react";
import {Breadcrumb, BreadcrumbItem } from "reactstrap";

function Salary() {
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default Salary;