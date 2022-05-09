import React, { Component } from "react";
import { CardImg, CardText, CardTitle, BreadcrumbItem, Breadcrumb,
    Col, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
    
function RenderStaff({staff, department, isLoading, errMess, toggleModal}) {
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
    else if (staff != null) {
        return(
            <div className="col-12 p-0">
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <CardImg src={staff.image} alt={staff.name} className="col-12 col-md-4 col-lg-3 p-0 mb-3"/>
                    <div className="col-12 col-md-2 col-lg-3 float-right mb-3 p-0">
                        <Button onClick={()=>toggleModal()} className="btn btn-warning mb-3" >Sửa</Button>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 float-right mb-3">
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </div>
                </FadeTransform>
            </div>
        ); 
    } else {
                return(
                    <div></div>
                );
            }
}

class StaffDetail extends Component {
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

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    //Khi nhấn vào thì set lại state của touched thành true
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    //Tạo một nhần viên mới với các dữ liệu đã được điền
    handleSubmit = (value) => {
        this.props.patchStaff(this.props.staff.id, value.name, value.doB, value.startDate, value.departmentId, value.salaryScale, value.annualLeave, value.overTime);
    }

    //Đóng mở Modal thêm nhân viên
    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen,
            touched: {
                doB: false,
                startDate: false
            }
        })
    }

    render () {
        if(this.props.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (this.props.errMess) {
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(this.props.staff != null) {
            return (
                <div className="container mt-3">
                    <div className="row m-0">
                        <Breadcrumb className="m-0">
                            <BreadcrumbItem><Link to='/Nhân-Viên'>Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <hr />
                    <div className="row m-0">
                        <RenderStaff
                            department={this.props.departments.departments.find((department) => {if(department.id === this.props.staff.departmentId){return department} return 0})}
                            staff={this.props.staff}
                            postStaff={this.props.postStaff}    
                            staffId={this.props.staffId}
                            isLoading={this.props.staffsLoading}
                            errMess={this.props.staffsErrMess}
                            toggleModal={this.toggleModal}
                        />
                    </div> 

                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal} >Sửa Nhân Viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={5}>Tên</Label>
                                    <Col md={7}>
                                        <Control.text
                                            className="form-control"
                                            model=".name"
                                            id="name"
                                            name="name"
                                            defaultValue={this.props.staff.name}
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

                                <Row className="form-group mt-3">
                                    <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                    <Col md={7}>
                                        <Control.text 
                                            className="form-control"
                                            type="date"
                                            model=".doB"
                                            name="doB"
                                            id="doB"
                                            defaultValue={this.props.staff.doB}
                                            value={this.state.tenState}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            model=".doB"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: "Yêu cầu nhập"
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group mt-3">
                                    <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                    <Col md={7}>
                                        <Control.text
                                            className="form-control"
                                            type="date"
                                            model=".startDate"
                                            name="startDate"
                                            id="startDate"
                                            defaultValue={this.props.staff.startDate}
                                            value={this.state.tenState}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors
                                            model=".startDate"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: "Yêu cầu nhập"
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group mt-3">
                                    <Label htmlFor="departmentId" md={5}>Phòng ban</Label>
                                    <Col md={7}>
                                        <Control.select
                                            model=".departmentId"
                                            name="departmentId"
                                            id="departmentId"
                                            defaultValue={this.props.staff.departmentId}
                                            className="form-control p-0"
                                        >
                                            <option value="Dept01">Sale</option>
                                            <option value="Dept02">HR</option>
                                            <option value="Dept03">Marketing</option>
                                            <option value="Dept04">IT</option>
                                            <option value="Dept05">Finance</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group mt-3">
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
                                            defaultValue={this.props.staff.salaryScale.toString()}
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

                                <Row className="form-group mt-3">
                                    <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                    <Col md={7}>
                                        <Control.text
                                            model=".annualLeave"
                                            id="annualLeave"
                                            name="annualLeave"
                                            defaultValue={this.props.staff.annualLeave.toString()}
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

                                <Row className="form-group mt-3">
                                    <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                    <Col md={7}>
                                        <Control.text
                                            model=".overTime"
                                            id="overTime"
                                            name="overTime"
                                            defaultValue={this.props.staff.overTime.toString()}
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

                                <Row className="form-group mt-3">
                                    <Col md={{size:10, offset: 2}}>
                                        <Button type="submit" className="btn btn-warning">Cập nhật</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        } else {
            return(
                <div></div>
            )
        }
    }
}
export default StaffDetail;
