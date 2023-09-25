import { useReducer, useMemo, useState, useEffect } from "react"
import { 
    formsReducer, StateType as FormStateType, 
    fieldPayloadType, ACTIONS as FORMS_ACTIONS 
} from "./formsReducer"
import { 
    errorMsgsReducer, StateType as ErrStateType, 
    payloadType as errPayloadType, ACTIONS as ERR_ACTIONS,
    INITIAL_STATE as ERR_INIT_STATE
} from "./errorMsgsReducer"

export default function useForms(args: ArgsType): returns{
    const [forms, dispatchForms] = useReducer(formsReducer, initFormsState(args))
    const [errMsgs, dispatchErrMsgs] = useReducer(errorMsgsReducer, initErrorsState(args))
    const [errFields, setErrFields] = useState({fields: {}, total: 0})

    const actions = useMemo<actionsType>(() => ({
        change: (field, value, type) => {
            dispatchForms({
                type: FORMS_ACTIONS.UPDATE,
                payload: {
                    [field]: {value: value, type: type}
                }
            })
        },
        bulkChange: (forms) => {
            const formattedForms: {[field: string]: fieldPayloadType}  = {}
            forms.forEach(form => {
                formattedForms[form.field] = {
                    value: form.value, type: form.type
                }
            })
            dispatchForms({
                type: FORMS_ACTIONS.UPDATE,
                payload: formattedForms
            })  
        },
        refreshErr: (errors) => {
            dispatchErrMsgs({
                type: ERR_ACTIONS.REFRESH, payload: errors
            })
        },
        clearErr: () => {
            dispatchErrMsgs({type: ERR_ACTIONS.EMPTY})            
        }
    }), [dispatchForms, dispatchErrMsgs])

    useEffect(() => {
        setErrFields(generateErrFields(errMsgs))
    }, [errMsgs])
    
    return [
        forms, actions, errFields
    ]
}

const initFormsState = (args: ArgsType) => {
    const forms: FormStateType = {}
    for (const field in args) {
        forms[field] = args[field].value
    }
    return forms
}

const initErrorsState = (args: ArgsType) => {
    const errors = ERR_INIT_STATE
    for (const field in args) {
        errors[field] = {
            label: args[field].label || '',
            msg: ''
        }
    }
    return errors
}
const generateErrFields = (errMsgs: ErrStateType) => {
    const errFields: ErrFieldsStateType = {fields: {}, total: 0}
    for (const field in errMsgs) {
        errFields.fields[field] = errMsgs[field].msg
        if(errMsgs[field].msg){
            errFields.total += 1
        }
    }
    return errFields
}
interface ArgsType{
    [field: string]: {
        value: any, label?: string
    }
}
type actionsType = {
    change: (
        field: string, value: fieldPayloadType['value'], 
        type?: fieldPayloadType['type']
    ) => void,

    bulkChange: (forms: {
        field: string, value: fieldPayloadType['value'], 
        type?: fieldPayloadType['type']        
    }[]) => void, 

    refreshErr: (errors: errPayloadType) => void, 

    clearErr: () => void
}
type ErrFieldsStateType = {
    fields: {[field: string]: string}, total: number
}
type returns = [
    FormStateType, actionsType, ErrFieldsStateType
]