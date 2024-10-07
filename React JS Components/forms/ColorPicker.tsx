import { useController } from "react-hook-form";
import { BaseFormProps } from "./utils/types";
import { getFieldErrMsg } from "./utils/form-error";
import './utils/styles.css'

interface ColorPickerProps extends BaseFormProps {
    isNumeric?: boolean,
    handleEnter?: (e: any) => void
}

export default function ColorPicker({
    fieldName, control, label, desc, className, errorCfg, ...rest
}: ColorPickerProps){
    const {field, fieldState} = useController({name: fieldName, control});
    let classes = 'form-group color-picker' + (className ? ' '+className : '')
    classes += rest.required ? ' required' : ''
    return (
        <span className={classes}>
            {label ? <label className='form-label'>{label}</label> : ''}
            <span className="gap-2 flex-ct-y">
                <input {...rest} className="form-control" onChange={field.onChange} type="color"
                    name={field.name} value={field.value || ''} ref={field.ref} 
                />             
                {field.value ? field.value.toUpperCase() : ''}   
            </span>
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