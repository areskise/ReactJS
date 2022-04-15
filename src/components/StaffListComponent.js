import React, {useState} from 'react';
import { Card, CardImg, CardText, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

//Render danh sách nhân viên
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

    //Dùng Hook useState để Render lại khi keyword được thay đổi
    const [keyword, setName] = useState("");

    //Dùng Hook useState để Render lại khi sortStaff được thay đổi
    const [sortStaff, setSort] = useState(false);

    //Sắp xếp lại danh sách theo mã số nhân viên khi sortStaff được thay đổi
    const staffList = props.staffs.sort((a,b) => {
        if (sortStaff) {
            return b.id - a.id;
        } else {
            return a.id - b.id;
        }

    //Dùng filter() để lọc ra những nhân viên trong tên có từ khóa tìm kiếm
    }).filter((staff) => {
        if(keyword === "") {
            return staff;
        } else if(staff.name.toLowerCase().includes(keyword.toLowerCase())) {
            return staff;
        }

    //Dùng map() để lặp qua từng nhân viên và lấy chúng vào danh sách 
    }).map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mb-3">
                    <RenderStaffListItem staff={staff} />
                </div>
            );
    });

    
    //Render toàn bộ giao diện của trang nhân viên
    return (
        <div className="container mt-3">
            <div className="row m-0">
                <Breadcrumb className="m-0">
                    <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="col">
                <button className="btn btn-warning" onClick={() => setSort(!sortStaff)}>Sắp xếp theo mã số nhân viên</button>
                </div>
                
                {/* Tìm kiếm khi value được thay đổi*/}
                <div className="col p-0">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        value={ keyword }
                        onChange={(event) => setName(event.target.value)}
                        />
                </div>
            </div>
            <hr />
            <div className="row">
                {staffList}
            </div>
        </div>
    );
}

export default StaffList;