import React from "react";
import { CardTitle, CardText, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

//Presentational components
function RenderDepartment ({department, numberOfStaff}) {

    //Render danh sách các phòng ban
    return(
        <div key={department.id} className="col-12 col-md-6 col-lg-4 pb-5 pl-5 pr-5">
            <div>
                <Link to={`/Phòng-Ban/${department.id}`}>
                    <CardTitle>{department.name}</CardTitle>
                    <CardText className="border-top">Số lượng nhân viên: {numberOfStaff.length}</CardText>
                </Link>
            </div>
        </div>
    )
}


//Container components
function Department(props) {

    //Dùng map() để lặp qua từng phòng ban và lấy chúng vào danh sách 
    const department = props.departments.departments.map((department) => {
        return(
            <RenderDepartment
                department={department}
                numberOfStaff={props.staffs.staffs.filter((staff) => staff.departmentId === department.id)}
            />
        )
    })

    //Render toàn bộ giao diện của trang phòng ban
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
