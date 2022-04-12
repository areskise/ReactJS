import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'

    function RenderStaff({staff}) {
        if (staff != null) {
        
            return(
                <div className="col-12 p-0">
                        <CardImg src={staff.image} alt={staff.name} className="col-12 col-md-4 col-lg-3 p-0 mb-3"/>
                        <div className="col-12 col-md-8 col-lg-9 float-right mb-3">
                            <CardTitle>Họ và tên: {staff.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {staff.department.name}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                        </div>
                </div>
            ); 
        } else {
                    return(
                        <div></div>
                    );
                }
    }

    const StaffDetail = (props) => {
        if(props.staff != null) {
            return (
                <div className="container">
                    <div className="row m-0">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row m-0">
                        <RenderStaff staff={props.staff} />
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            )
        }
    }
export default StaffDetail;
