import React, { Component } from 'react';
import { Card, CardImg, CardText, BreadcrumbItem, Breadcrumb, Form, FormGroup, FormFeedback,
    Col, Input, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

//Render từng nhân viên có trong danh sách
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
            name: "",
            modalOpen: false,
            doB: "",
            startDate: "",
            touched: {
                doB: false,
                startDate: false
            }
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    //Khi nhấn vào thì set lại state của touched thành true
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    //Khi Input bị thay đổi thì set state lại thành giá trị nhật
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    //Tạo một nhần viên mới với các dữ liệu đã được điền
    handleSubmit = (value) => {
        const newStaff = {
            name: value.name,
            doB: value.doB,
            startDate: this.state.startDate,
            department: value.department,
            salaryScale: value.salaryScale,
            annualLeave: value.annualLeave,
            overTime: value.overTime,
            image: "/assets/images/alberto.png"
        }
        if (!this.state.doB || !this.state.startDate) {
            this.setState({
                touched: {
                    doB: true,
                    startDate: true
                }
            })
        } else {
            this.props.onAdd(newStaff);
        }
    }

    //Validation cho các ô input date
    validate(doB, startDate) {
        const errors = {
            doB: "",
            startDate: ""
        }

        if (this.state.touched.doB && doB.length < 1) {
            errors.doB = "Yêu cầu nhập";
        }
        if (this.state.touched.startDate && startDate.length < 1) {
            errors.startDate = "Yêu cầu nhập";
        }

        return errors;
    }

    //Đóng mở Modal thêm nhân viên
    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    //Hàm tìm kiếm nhân viên theo từ khóa
    handleSearch(event) {
        const keyword = event.target.keyword.value;
        this.setState({ name: keyword });
        event.preventDefault();
    }

    render() {
        //Tạo biến errors để 
        const errors = this.validate(this.state.doB, this.state.startDate);

        //Dùng filter() để lọc ra nhân viên có keyword trong tên
        const staffList = this.props.staffs.filter((staff) => {
            if(this.state.name === "") {
                return staff;
            } else if(staff.name.toLowerCase().includes(this.state.name.toLowerCase())) {
                return staff;
            }

        //Dùng map() để lặp qua từng nhân viên và render danh sách nhân viên
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
                    <Button onClick={this.toggleModal} className="btn btn-warning">
                        <span className="fa fa-plus fa-lg"></span>
                    </Button>
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

                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} >Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="control-group">
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Control.text
                                        className="form-control"
                                        model=".name"
                                        id="name"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxlength: maxlength(30)
                                        }}
                                    />
                                    <Errors
                                        model=".name"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            minLength: "Yêu cầu nhập nhiều hơn 3 ký tự",
                                            maxlength: "Yêu cầu nhập ít hơn 30 ký tự"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Input 
                                        type="date"
                                        name="doB"
                                        id="doB"
                                        value={this.state.tenState}
                                        valid={errors.doB === ""}
                                        invalid={errors.doB !== ""}
                                        onBlur={this.handleBlur("doB")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        value={this.state.tenState}
                                        valid={errors.startDate === ""}
                                        invalid={errors.startDate !== ""}
                                        onBlur={this.handleBlur("startDate")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                <Col md={7}>
                                    <Control.select
                                        model=".department"
                                        name="department"
                                        id="department"
                                        defaultValue="Sale"
                                        className="form-control p-0"
                                    >
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Control.text
                                        model=".salaryScale"
                                        id="salaryScale"
                                        name="salaryScale"
                                        placeholder="1.0 -> 3.0"
                                        validators={{
                                            required,
                                            isNumber
                                        }}
                                        defaultValue="1"
                                        className="form-control"
                                    />
                                    <Errors
                                        model=".salaryScale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            isNumber: "Phải là chữ số"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Control.text
                                        model=".annualLeave"
                                        id="annualLeave"
                                        name="annualLeave"
                                        defaultValue="0"
                                        validators={{
                                            required,
                                            isNumber
                                        }}
                                        className="form-control"
                                    />
                                    <Errors
                                        model=".annualLeave"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            isNumber: "Phải là chữ số"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Control.text
                                        model=".overTime"
                                        id="overTime"
                                        name="overTime"
                                        defaultValue="0"
                                        validators={{
                                            required,
                                            isNumber
                                        }}
                                        className="form-control"
                                    />
                                    <Errors
                                        model=".overTime"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            isNumber: "Phải là chữ số"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" className="btn btn-warning">Thêm</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <div className="row">
                    {staffList}
                </div>
            </div>
        );
    }
}

export default StaffList;