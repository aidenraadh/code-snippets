import { Control } from "react-hook-form";

export interface BaseFormProps{
    fieldName: string, // The field name
    control: Control<any, {}>,    
    label?: JSX.Element | string, // The form's label
    desc?: string, // The form's description
    className?: string
    errorCfg?: {
        errLabel?: string, // Will replacing field name in the error message 
        hideErrMsg?: boolean // toggle hide error message
    }
    [attrName: string]: any
}