import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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

//Post Staff
export const postStaff = (staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {

    const newStaff = {
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

    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: {'Content-type': 'application/json'},
        credentials: 'same-origin'
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error( "Error " + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then((response) => response.json())
        .then(response => dispatch(addStaffs(response)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('Không thể thêm nhân viên mới\nError: ' + error.message);
        })
}

//Delete Staff
export const deleteStaff = (id) => (dispatch) => {
    if (window.confirm("Chắc chắn muốn XÓA nhân viên này?")) {
        return fetch(baseUrl + `staffs/${id}`, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then(response => dispatch(addStaffs(response)))
        .then((id) => dispatch(deleteSuccess(id)))
    } else return;
}
    
export const deleteLoading = () => ({
    type: ActionTypes.DELETE_LOADING
})

export const deleteSuccess = (id) => ({
    type: ActionTypes.DELETE_SUCCESS,
    payload: id
})

//Patch Staff
export const patchStaff = (id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    
    if (window.confirm("Chắc chắn muốn CẬP NHẬT nhân viên này?")) {
        return fetch(baseUrl + `staffs/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                name: name,
                doB: doB,
                startDate: startDate,
                departmentId: departmentId,
                salaryScale: salaryScale,
                annualLeave: annualLeave,
                overTime: overTime,
                image: "/assets/images/alberto.png"
            }),
            headers: {'Content-type': 'application/json'}
        })
        .then((response) => response.json())
        .then(response => dispatch(addStaffs(response)))
        .then((staffId) => dispatch(patchSuccess(staffId)))
    } else return;
}
    
export const patchLoading = () => ({
    type: ActionTypes.PATCH_LOADING
})

export const patchSuccess = (id) => ({
    type: ActionTypes.PATCH_SUCCESS,
    payload: id
})

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