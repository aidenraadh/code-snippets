import { useController } from "react-hook-form";
import { BaseFormProps } from "./utils/types";
import { getFieldErrMsg } from "./utils/form-error";
import './utils/styles.css'

interface TextAreaFieldProps extends BaseFormProps {
    handleEnter?: (e: any) => void
}

export default function TextAreaField({
    fieldName, control, handleEnter,
    label, desc, className, errorCfg, ...rest
}: TextAreaFieldProps){
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
            <textarea className="form-control" onChange={field.onChange}
                name={field.name} value={field.value || ''} ref={field.ref} 
                {...rest}
            ></textarea>
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