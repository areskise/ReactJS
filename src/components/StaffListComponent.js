import React from 'react';
import { Card, CardImg, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderStaffListItem({ staff }) {
        return(
            <Card>
                <Link to={`/Nhân-Viên/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardText className="text-center m-2">{staff.name}</CardText>
                </Link>
            </Card>
        );
    }

    function StaffList(props) {

        const staffList = props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mb-3">
                    <RenderStaffListItem staff={staff} />
                </div>
            );
        });

        return (
            <div className="container mt-3">
                <div className="row m-0">
                    <Breadcrumb className="m-0">
                        <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <hr />
                <div className="row">
                    {staffList}
                </div>
            </div>
        );
    }

export default StaffList;