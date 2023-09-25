/**
 * This reducer will format a field's error message by replacing the field name
 * with a label
 * Inteded to use when receiving multiple field errors where the field name is used
 * inside the error message
 */

export const INITIAL_STATE: StateType = {_global: {label: 'Global', msg: ''}}

export const ACTIONS = {
    REFRESH: 'REFRESH',
    EMPTY: 'EMPTY'
}
export const errorMsgsReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case ACTIONS.REFRESH:
            const errors: StateType = {...state}
            if(action.payload){
                for (const field in errors) {
                    const errMsg = action.payload[field]
                    if(errMsg){
                        errors[field].msg = (
                            errors[field].label && field !== '_global' ? 
                            errMsg.replace(field, errors[field].label) : errMsg
                        )
                    }
                    else{
                        errors[field].msg = ''                        
                    }
                }
            }
            return errors
                            
        case ACTIONS.EMPTY:
            const emptiedErrors = {...state}
            for (const field in emptiedErrors) {
                emptiedErrors[field].msg = ''
            }
            return emptiedErrors         
        default: return state
    }
}

export type StateType = {[field: string]: {label: string, msg: string}}
export type ActionType = {
    type: string
    payload?: payloadType
}
export type payloadType = {[field: string]: string}