import React, { Component } from 'react';
import { Card, CardImg, CardText, BreadcrumbItem, Breadcrumb, Form, FormGroup, FormFeedback,
    Col, Input, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            keywords: "",
            modalOpen: false,
            name: "",
            doB: "",
            salaryScale: 1,
            startDate: "",
            department: "Sale",
            annualLeave: 0,
            overTime: 0,
            salary: 30000,
            image: '/assets/images/alberto.png',
            touched: {
                name: false,
                doB: false,
                salaryScale: false,
                startDate: false,
                department: false,
                annualLeave: false,
                overTime: false
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
    handleSubmit = (event) => {
        if(this.state.name === ""){
        this.setState({
            touched: {
                name: true,
                doB: true,
                salaryScale: true,
                startDate: true,
                department: true,
                annualLeave: true,
                overTime: true
            }
        })
        this.validate();
    } else {
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            startDate: this.state.startDate,
            department: this.state.department,
            salaryScale: this.state.salaryScale,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            image: this.state.image
        }
        this.props.onAdd(newStaff);
    }
        event.preventDefault();

    }


    //Validation khi nhập dữ liệu vào input
    validate(name, doB, startDate, department, salaryScale, annualLeave, overTime) {
        const errors = {
            name: "",
            doB: "",
            startDate: "",
            department: "",
            salaryScale: "",
            annualLeave: "",
            overTime: ""
        }
        if (this.state.touched.name && name.length == 0) {
            errors.name = "Yêu cầu nhập"
        }else if (this.state.touched.name && name.length < 3) {
            errors.name = "Yêu cầu nhiều hơn 2 ký tự"
        } else if (this.state.touched.name && name.length > 30) {
            errors.name = "Yêu cầu ít hơn 30 ký tự"
        }
        if (this.state.touched.doB && doB.length < 1) {
            errors.doB = "Yêu cầu nhập";
        }
        if (this.state.touched.startDate && startDate.length < 1) {
            errors.startDate = "Yêu cầu nhập";
        }
        if (this.state.touched.department && department.length < 1) {
            errors.department = "Yêu cầu nhập";
        }
        if (this.state.touched.salaryScale && salaryScale.length < 1) {
            errors.salaryScale = "Yêu cầu nhập";
        } else if (this.state.salaryScale < 0 ) {
            errors.salaryScale = "Phải lớn >= 0";
        }
        if (this.state.touched.annualLeave && annualLeave.length < 1) {
            errors.annualLeave = "Yêu cầu nhập";
        } else if (this.state.annualLeave < 0 ) {
            errors.annualLeave = "Phải lớn >= 0";
        }
        if (this.state.touched.overTime && overTime.length < 1) {
            errors.overTime = "Yêu cầu nhập";
        } else if (this.state.overTime < 0 ) {
            errors.overTime = "Phải lớn >= 0";
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
        this.setState({ keywords: keyword });
        event.preventDefault();
    }

    render() {
        //Tạo biến errors để 
        const errors = this.validate(this.state.name, this.state.doB, this.state.startDate,
            this.state.department, this.state.salaryScale, this.state.annualLeave, this.state.overTime);

        //Dùng filter() để lọc ra nhân viên có keyword trong tên
        const staffList = this.props.staffs.filter((staff) => {
            if(this.state.keywords === "") {
                return staff;
            } else if(staff.name.toLowerCase().includes(this.state.keywords.toLowerCase())) {
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
                    <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Row className="control-group">
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        valid={errors.name === ""}
                                        invalid={errors.name !== ""}
                                        onBlur={this.handleBlur("name")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Input 
                                        type="date"
                                        name="doB"
                                        className="form-control"
                                        id="doB"
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
                                        className="form-control"
                                        name="startDate"
                                        id="startDate"
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
                                    <Input
                                        type="select"
                                        name="department"
                                        id="department"
                                        className="form-control p-0"
                                        value={this.state.department}
                                        valid={errors.department === ""}
                                        invalid={errors.department !== ""}
                                        onBlur={this.handleBlur("department")}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Input>
                                    <FormFeedback>{errors.department}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Input
                                        type="number"
                                        id="salaryScale"
                                        name="salaryScale"
                                        className="form-control"
                                        value={this.state.salaryScale}
                                        valid={errors.salaryScale === ""}
                                        invalid={errors.salaryScale !== ""}
                                        onBlur={this.handleBlur("salaryScale")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.salaryScale}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Input
                                        type="number"
                                        id="annualLeave"
                                        name="annualLeave"
                                        className="form-control"
                                        value={this.state.annualLeave}
                                        valid={errors.annualLeave === ""}
                                        invalid={errors.annualLeave !== ""}
                                        onBlur={this.handleBlur("annualLeave")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.annualLeave}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Input
                                        type="number"
                                        id="overTime"
                                        name="overTime"
                                        className="form-control"
                                        value={this.state.overTime}
                                        valid={errors.overTime === ""}
                                        invalid={errors.overTime !== ""}
                                        onBlur={this.handleBlur("overTime")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.overTime}</FormFeedback>
                                </Col>
                            </Row>

                            <Row className="control-group mt-3">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" className="btn btn-warning">Thêm</Button>
                                </Col>
                            </Row>
                        </Form>
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