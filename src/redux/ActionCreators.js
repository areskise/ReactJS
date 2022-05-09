import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//Staffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
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
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('In danh sách nhân viên bị lỗi\nError: ' + error.message);
        })
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
        id: staffId,
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
        .then(response => dispatch(fetchStaffsSalary(response)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('Thêm nhân viên mới bị lỗi\nError: ' + error.message);
        })
}

//Delete Staff
export const deleteSuccess = (id) => ({
    type: ActionTypes.DELETE_SUCCESS,
    payload: id
})

export const deleteStaff = (id) => (dispatch) => {
    if (window.confirm("Chắc chắn muốn XÓA nhân viên này?")) {
        return fetch(baseUrl + `staffs/${id}`, {
            method: 'DELETE'
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
        .then((id) => dispatch(deleteSuccess(id)))
        .then(response => dispatch(fetchStaffsSalary(response)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('Xóa nhân viên bị lỗi\nError: ' + error.message);
        })
    } else return;
}
    
//Patch Staff
export const patchSuccess = (staffs) => ({
    type: ActionTypes.PATCH_SUCCESS,
    payload: staffs
})

export const patchStaff = (id, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    
    if (window.confirm("Chắc chắn muốn CẬP NHẬT nhân viên này?")) {
        return fetch(baseUrl + 'staffs', {
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
        .then((response) => dispatch(patchSuccess(response)))
        .then(response => dispatch(fetchStaffsSalary(response)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('Cập nhật nhân viên bị lỗi\nError: ' + error.message);
        })
    } else return;    
}    
    
//Departments
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
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
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('In danh sách phòng ban bị lỗi\nError: ' + error.message);
        })
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
        .then(response => response.json())
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => {console.log('Post staffs ', error.message)
            alert('In bảng lương bị lỗi\nError: ' + error.message);
        })
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