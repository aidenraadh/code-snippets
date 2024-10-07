import { FieldError, FieldErrors, FieldValues } from "react-hook-form"

export function getFieldErrMsg(error: FieldError | undefined, field: string, label?: string){
    if(error && error.message){
        let msg = error.message
        if(label) msg = msg.replace(field, label)
        msg = msg.toLowerCase()
        return msg.charAt(0).toUpperCase() + msg.slice(1)
    }
    return ''
}

export function findFieldErrMsg(errors: FieldErrors<FieldValues>, field: string, label?: string){
    let error: any = undefined
    for (const key in errors) {
        if(key === field){
            error = errors[key]
        }
    }
    return getFieldErrMsg(error, field, label)
}