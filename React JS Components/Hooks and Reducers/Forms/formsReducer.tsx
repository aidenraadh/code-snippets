export const ACTIONS = {
    UPDATE: 'UPDATE',
}
export const formsReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case ACTIONS.UPDATE:
            let lastState = {...state}
            for (const key in action.payload) {
                const value = action.payload[key].value
                const type = action.payload[key].type
                if(lastState.hasOwnProperty(key)){
                    if(type === 'toggleArr'){
                        // If the value is not array, conver it to array
                        if(!Array.isArray(lastState[key])){
                            lastState[key] = [lastState[key]]
                        }
                        if(lastState[key].includes(value)){
                            lastState[key].splice(
                                lastState[key].indexOf(value), 1
                            )
                        }
                        else{
                            lastState[key] = [...lastState[key], value] 
                        }   
                    }
                    else if(type === 'toggleBool'){
                        lastState[key] = !lastState[key]    
                    }
                    else{
                        lastState[key] = value
                    }
                }
            }
            return lastState;
        default: return state
    }
}

type ActionType = {
    type: string
    payload?: {[field: string]: fieldPayloadType}
}
export type fieldPayloadType = {
    value: any, type?: 'toggleArr' | 'toggleBool'
}
export type StateType = {
    [field: string]: any
}