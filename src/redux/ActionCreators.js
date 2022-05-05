import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addNewStaff = (staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => ({
    
    type: ActionTypes.ADD_NEWSTAFF,
    payload: {
        staffId: staffId,
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "/assets/images/alberto.png"
    }
});

//Staffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

//Departments
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

//StaffsSalary
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
}

export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
});

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffsSalary
});

//DeleteStaff
export const deleteSuccess = (id) => ({
    type: ActionTypes.DELETE_SUCCESS,
    payload: id
})

export const deleteStaff = (id) => (dispatch) => {
    if (window.confirm("Chắc chắn muốn XÓA nhân viên này?")) {
        return fetch(baseUrl + `staffs/${id}`, {method: 'DELETE'})
            .then(() => dispatch(deleteSuccess(id)))
    } else return;
}