import { useCallback } from "react"
import { useController, Control, UseFieldArrayReturn, FieldValues } from "react-hook-form";
import './utils/styles.css'

interface CheckboxProps{
    fieldName: string,
    control: Control<any, {}>,    
    fieldArr: UseFieldArrayReturn<FieldValues, any, any>
    cbVal: any,
    label?: JSX.Element | string
    className?: string,
    [attrName: string]: any
}

export default function Checkbox({
    fieldName, control, fieldArr, cbVal, label, className, ...rest
}: CheckboxProps){
    let classes = 'multi-choice checkbox' + (className ? ' '+className : '')
    const {field: {value, ref}} = useController({name: fieldName, control});

    const toggleValue = useCallback((oldVal: any[]) => {
        if(oldVal && oldVal.includes(cbVal)){
            fieldArr.remove(oldVal.indexOf(cbVal))
        }
        else{
            fieldArr.append(cbVal)
        }
    }, [cbVal, fieldArr])

    return (
        <label className={classes}>
            <span className='choice-name'>{label || cbVal}</span>
            <input 
                {...rest} type='checkbox' value={cbVal} 
                onChange={() => toggleValue(value)}
                checked={value && value.includes(cbVal) ? true : false}
                ref={ref}
            />
			<span className="checkmark">
				<span></span>
			</span>
        </label>
    )
}
