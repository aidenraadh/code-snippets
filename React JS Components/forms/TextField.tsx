import { useController } from "react-hook-form";
import { BaseFormProps } from "./utils/types";
import { getFieldErrMsg } from "./utils/form-error";
import './utils/styles.css'

/**
 * Text form
 * 
 * @param fieldName - The form's name
 * @param control - useForm's Control object
 * @param label - The form's label
 * @param desc - The form's description
 * @param isNumeric - Set the user's input to numeric. Also remove all non digits character when the blur event of the form is triggered
 * @param handleEnter - A function to execute when enter key is pressed
 * @param className - The form's classes
 * @param errorCfg.errLabel - If set, the name of the field in the error message will be replace with this
 * @param errorCfg.hideErrMsg - Whether or not to hide the error message
 * @returns JSX element
 */

export default function TextField({
    fieldName, control, isNumeric, handleEnter,
    label, desc, className, errorCfg, ...rest
}: TextFieldProps){
    const {field, fieldState} = useController({name: fieldName, control});
    let classes = 'form-group' + (className ? ' '+className : '')
    classes += rest.required ? ' required' : ''
    if(handleEnter){
        rest.onKeyUp = (e: any) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                handleEnter(e)
            }
        }
    }
    return (
        <span className={classes}>
            {label ? <label className='form-label'>{label}</label> : ''}
            <input className="form-control" onChange={field.onChange}
                onBlur={(e: any) => {
                    let value: string | number = e.target.value
                    if(isNumeric){
                        value = Number(value)
                        if(isNaN(value)) value = ''
                    }
                    field.onChange(value)
                }} 
                name={field.name} value={field.value || ''} ref={field.ref} 
                {...rest}
            />
            <span className="flex flex-col">
                {!desc ? <></> : <span className="desc">{desc}</span>}                
                {
                    !fieldState.error || (errorCfg && errorCfg.hideErrMsg) ? <></> :
                    <span className="err-msg">
                        {getFieldErrMsg(
                            fieldState.error, fieldName, (errorCfg && errorCfg.errLabel ? errorCfg.errLabel : '')
                        )}
                    </span>
                }
            </span>
        </span>
    )
}

interface TextFieldProps extends BaseFormProps {
    /* Set the user's input to numeric. Also remove all non digits character when the blur event of the form is triggered */
    isNumeric?: boolean,
    /* A function to execute when enter key is pressedA function to execute when enter key is pressed */
    handleEnter?: (e: any) => void
}