import React from "react";
import { CardTitle, CardText } from "reactstrap";

function RenderDepartment ({department}) {
    return(
        <div key={department.id} className="col-12 col-md-6 col-lg-4 p-4 pl-5 pr-5">
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
        <div className="row m-0">
            {department}
        </div>
    )
}

export default Department;
