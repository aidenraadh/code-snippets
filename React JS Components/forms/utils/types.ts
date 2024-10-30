import { Control } from "react-hook-form";

export interface BaseFormProps{
    /* The form's name */
    fieldName: string,
    /* useForm's Control object */
    control: Control<any, {}>, 
    /* The form's label */   
    label?: JSX.Element | string, 
    /* The form's description */
    desc?: string,
    /* The form's classes */
    className?: string
    /* Form's error configuration */
    errorCfg?: {
        /* If set, the name of the field in the error message will be replace with this */
        errLabel?: string,
        /* Whether or not to hide the error message */
        hideErrMsg?: boolean 
    }
    /* HTML attributes */
    [attrName: string]: any
}