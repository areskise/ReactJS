import React, { Component } from 'react';
import { Card, CardImg, CardText, BreadcrumbItem, Breadcrumb, Form, FormGroup, Col, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

//Render danh sách nhân viên
const RenderStaffListItem = ({ staff }) => {
    return(
        <Card>
            <Link to={`/Nhân-Viên/${staff.id}`}>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardText className="text-center m-2">{staff.name}</CardText>
            </Link>
        </Card>
    );
}

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: "",
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        const keyword = event.target.keyword.value;
        this.setState({ keywords: keyword });
        event.preventDefault();
    }

    render() {

        const staffList = this.props.staffs.filter((staff) => {
            if(this.state.keywords === "") {
                return staff;
            } else if(staff.name.toLowerCase().includes(this.state.keywords.toLowerCase())) {
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
                    <button className="btn btn-warning">
                        <span className="fa fa-plus fa-lg"></span>
                    </button>
                    </div>
                    
                    <Form onSubmit={this.handleSearch} className="col-md-8 mb-0">
                        <FormGroup className="row mb-0">
                            <Col className="col p-0">
                                <Button type="submit" className="btn btn-warning">
                                    Tìm Kiếm
                                </Button>
                            </Col>
                            <Col className="col p-0">
                                <Input
                                    type="text"
                                    name="keyword"
                                    className="form-control"
                                    placeholder="Nhập từ khóa tìm kiếm..."
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <hr />
                <div className="row">
                    {staffList}
                </div>
            </div>
        );
    }
}

export default StaffList;