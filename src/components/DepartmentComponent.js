import React from "react";
import { CardTitle, CardText, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

//Presentational components
function RenderDepartment ({department, numberOfStaff, isLoading, errMess}) {
    if (isLoading) {
        return(
            <Loading />
        )
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        )
    }
    else {
        //Render danh sách các phòng ban
        return(
            <div key={department.id} className="col-12 col-md-6 col-lg-4 pb-5 pl-5 pr-5">
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <div>
                        <Link to={`/Phòng-Ban/${department.id}`}>
                            <CardTitle>{department.name}</CardTitle>
                            <CardText className="border-top">Số lượng nhân viên: {numberOfStaff.length}</CardText>
                        </Link>
                    </div>
                </FadeTransform>
            </div>
        )
    }
}


//Container components
function Department(props) {
    if(props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else {
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
}

export default Department;
