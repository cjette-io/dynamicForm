import ActionTypes from './types'
console.log(ActionTypes.SUBMIT_ACTION)

export const submitData = (data) => {
    console.log({data})
    return {
        type: ActionTypes.SUBMIT_ACTION,
        payload: data,
    }
}

export const getElements = (elements) => {
    return {
        type: ActionTypes.GET_FORM_ELEMENTS_ACTION,
        payload: elements,
    }
    
}