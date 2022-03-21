import { combineReducers } from 'redux'
import ActionTypes from './types'

const initialState = {}

const formElements = (state = initialState, action) => {
    const { type, payload } = action
    console.log({type, payload})
    switch (type) {
        case ActionTypes.SUBMIT_ACTION:
            console.log({payload});
            return { ...state, payload }
        case ActionTypes.GET_FORM_ELEMENTS_ACTION:
            
            console.log({payload});
            return { ...state, formFields: payload }
        default:
            return state;
    }
}

export default combineReducers({
    formFields: formElements
});
