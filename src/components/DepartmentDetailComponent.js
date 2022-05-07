import React from "react";
import { Card, CardImg, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

const RenderDepartmentStaff = ({ staff, isLoading, errMess}) => {
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
        return(
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <Link to={`/Nhân-Viên/${staff.id}`}>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardText className="text-center m-2">{staff.name}</CardText>
                    </Link>
                </Card>
            </FadeTransform>
        );
    }
}

    const DepartmentDetail = (props) => {

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
            const departmentStaff = props.staffs.staffs.filter((staff) => staff.departmentId === props.department.id)
            //Dùng map() để lặp qua từng nhân viên và render danh sách nhân viên
            .map((staff) => {
                return (
                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 mb-3">
                        <RenderDepartmentStaff
                            staff={staff}
                            isLoading={props.staffsLoading}
                            errMess={props.staffsErrMess}
                        />
                    </div>
                );
            });
        
            return (
                <div className="container mt-3">
                    <div className="row m-0">
                        <Breadcrumb className="m-0">
                            <BreadcrumbItem><Link to='/Phòng-Ban'>Phòng Ban</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <hr />
                    <div className="row m-0">
                        {departmentStaff}
                    </div>
                </div>
            );
        }
    }
export default DepartmentDetail;
