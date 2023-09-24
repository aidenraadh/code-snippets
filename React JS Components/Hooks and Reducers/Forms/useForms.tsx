import { useReducer, useMemo } from "react"
import { 
    formsReducer, StateType as FormStateType, 
    fieldPayloadType, ACTIONS as FORMS_ACTIONS 
} from "./formsReducer"
import { 
    errorFieldsReducer, StateType as ErrStateType, 
    payloadType as errPayloadType, ACTIONS as ERR_ACTIONS,
    INITIAL_STATE as ERR_INIT_STATE
} from "./errorFieldsReducer"

export default function useForms(args: ArgsType): returns{
    const [forms, dispatchForms] = useReducer(formsReducer, initFormsState(args))
    const [errFields, dispatchErrFields] = useReducer(errorFieldsReducer, initErrorsState(args))

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
            const formattedForms = {}
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
            dispatchErrFields({
                type: ERR_ACTIONS.REFRESH, payload: errors
            })
        },
        emptyErr: () => {
            dispatchErrFields({type: ERR_ACTIONS.EMPTY})            
        }
    }), [dispatchForms, dispatchErrFields])
    return [
        forms, errFields, actions
    ]
}

const initFormsState = (args: ArgsType) => {
    const forms = {}
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

    emptyErr: () => void
}

type returns = [
    FormStateType, ErrStateType, actionsType
]