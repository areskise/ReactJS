import { STAFFS } from "../shared/staffs";
import * as ActionTypes from './ActionTypes';

export const addNewStaff = (staffId, name, doB, startDate, department, salaryScale, annualLeave, overTime) => ({
    
    type: ActionTypes.ADD_NEWSTAFF,
    payload: {
        staffId: staffId,
        name: name,
        doB: doB,
        startDate: startDate,
        department: department,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "/assets/images/alberto.png"
    }
})

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    setTimeout(() => {
        dispatch(addStaffs(STAFFS));
    }, 1000);
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
})

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})