import actionTypes from '../actions/actionTypes';
import { getAllCodeService } from '../../services/userService';

const initialState = {
    genders: [],
    role: [],
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('gender fetch start: ', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('gender fetch success: ', action)
            let copyState = { ...state }
            copyState.genders = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('gender fetch failed: ', action)

            return {
                ...state,
            }
        default: return state
    }
}

export default adminReducer;