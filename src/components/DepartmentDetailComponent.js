import React from "react";
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

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
            <Card>
                <Link to={`/Nhân-Viên/${staff.id}`}>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardText className="text-center m-2">{staff.name}</CardText>
                </Link>
            </Card>
        );
    }
}

    const DepartmentDetail = (props) => {

        if (props.isLoading) {
            return(
                <Loading />
            )
        }
        else if (props.errMess) {
            return(
                <h4>{props.errMess}</h4>
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
