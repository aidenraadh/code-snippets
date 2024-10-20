import { useCallback, useMemo, useRef } from "react"
import { useController, Control, UseFieldArrayReturn, FieldValues } from "react-hook-form";

interface CheckboxProps{
    fieldName: string,
    control: Control<any, {}>,    
    label?: JSX.Element | string
    className?: string,
    // Optionally set truthy and falsy value
    values?: {truthy: any, falsy: any}
    // Optionally set the length of the switch n times of the checkmark
    length?: number
    [attrName: string]: any
}

/**
 * To set the width and height of the checkmark, set the fontsize of this component
 * @returns 
 */

export default function Switch({
    fieldName, control, label, values, length, className, ...rest
}: CheckboxProps){
    const {field: {value, ref, onChange}} = useController({name: fieldName, control});
    const checmarkRef = useRef<HTMLSpanElement | null>(null)
    const switchVal = useMemo(() => {
        if(!values){
            return {truthy: true, falsy: false}
        }
        return values
    }, [values])

    // The position of the checkmark based on the value
    const checkMarkPos: string = useMemo(() => {
        if (value === switchVal.truthy) {
            return (((length || 2) * 1.4) - 1.97) + 'em';
        } else {
            return '0'
        }
    }, [value, switchVal])

    let classes = 'form-group switch' + (className ? ' '+className : '')

    const handleChange = useCallback(() => {
        onChange(value === switchVal.truthy ? switchVal.falsy : switchVal.truthy)
    }, [value])

    return (
        <label className={classes}>
            <span className='label'>{label}</span>
            <input 
                className="form-control"
                {...rest} type='checkbox' 
                onChange={handleChange}
                checked={value === switchVal.truthy ?  true : false}
                ref={ref}
            />            
            <span className="checkmark-wrapper" style={{width: `calc(${length || 2} * 1.4em)`}}>
                <span ref={checmarkRef} className="checkmark" style={{transform: `translateX(${checkMarkPos})`}}></span>
            </span>
        </label>
    )
}
