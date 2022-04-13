import React from "react";
import { CardTitle, CardText, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';


function RenderDepartment ({department}) {
    return(
        <div key={department.id} className="col-12 col-md-6 col-lg-4 pb-5 pl-5 pr-5">
            <div>
                <CardTitle>{department.name}</CardTitle>
                <CardText className="border-top">Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </div>
        </div>
    )
}

function Department(props) {
    const department = props.departments.map((department) => {
        return(
            <RenderDepartment department={department} />
        )
    })

    return(
        <div className="container mt-3">
            <div className="row m-0">
                <Breadcrumb className="m-0">
                    <BreadcrumbItem><Link to='/Phòng-Ban'>Phòng Ban</Link></BreadcrumbItem>
                </Breadcrumb>
            </div>
            <hr />
            <div className="row">
                {department}
            </div>
        </div>
    )
}

export default Department;
