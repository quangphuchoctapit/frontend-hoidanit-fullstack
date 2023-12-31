import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getAllSpecialties,
    getAllClinic
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            console.log('fetch gender failed: ', e);
            dispatch(fetchGenderFailed())
        }
    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.FETCH_POSITION_START
            // })
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            console.log('fetch position failed: ', e);
            dispatch(fetchGenderFailed())
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.FETCH_ROLE_START
            // })
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            console.log('fetch Role failed: ', e);
            dispatch(fetchRoleFailed())
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            console.log('check create user: ', res);
            if (res && res.errCode === 0) {
                toast.success('Created new user successfully')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            console.log('saveUserFailed');
            dispatch(saveUserFailed())
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                let users = res.users.reverse()
                dispatch(fetchAllUsersSuccess(users))
            }
            else {
                toast.error('Fetch all users error!')
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            toast.error('Fetch all users error!')
            console.log('fetch All users failed: ', e);
            dispatch(fetchAllUsersFailed())
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success('Delete A User successfully')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error('Delete A User error')
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error('Delete A User error')
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success('editUserSuccess')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error('editUserFailed')
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error('editUserFailed')
            dispatch(editUserFailed())
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('feth top doctor failed: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            // console.log('check res adminactions: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            console.log('feth all doctor failed: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success(`Update doctor's details successfully`)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            } else {
                console.log('check err: ', res)
                toast.error(`Update doctor's details failed`)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            toast.error(`Update doctor's details failed`)
            console.log('feth all doctor failed: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
            })
        }
    }
}


export const fetchAllScheduleHours = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")
            // console.log('check res adminactions: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const fetchRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO
            })
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await getAllSpecialties()

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorInfoFailed())
            }
        } catch (e) {
            console.log('fetchRequiredDoctorInfoFailed: ', e);
            dispatch(fetchRequiredDoctorInfoFailed())
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData,
})

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})

export const fetchAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ALL_CLINIC
            })
            let resClinic = await getAllClinic()
            if (resClinic && resClinic.errCode === 0) {
                let data = {
                    resClinic: resClinic.data
                }
                dispatch(fetchAllClinicSuccess(data))
            }
            else {
                dispatch(fetchAllClinicSuccess(fetchAllClinicFailed))
            }
        } catch (e) {
            dispatch(fetchAllClinicSuccess(fetchAllClinicFailed))
        }
    }
}


export const fetchAllClinicSuccess = (allClinicData) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: allClinicData
})

export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED
})