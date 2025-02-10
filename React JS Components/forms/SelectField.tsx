'use client'

import { useCallback, useEffect, useMemo, useState, } from "react"
import { BaseFormProps } from "./utils/types"
import { useController } from "react-hook-form"
import Select, { SingleValue } from 'react-select'
import { getFieldErrMsg } from "./utils/form-error"
import './utils/styles.css'

interface SelectFieldProps extends BaseFormProps {
    options: SingleValue<any>[],
    desc?: string
}

export default function SelectField({
    fieldName, control, options, errorCfg,
    label, desc, className, ...rest
}: SelectFieldProps){
    const reactSelectId = useMemo(() => (Date.now().toString()), [])
    const [isMounted, setIsMounted] = useState(false);    
    const {field, fieldState} = useController({name: fieldName, control, rules: {required: rest.required || false}});
    let classes = 'form-group' + (className ? ' '+className : '')
    classes += rest.required ? ' required' : ''   

    const handleSelectChange = useCallback((selected: SingleValue<any>) => {
        field.onChange(selected)        
    }, [field.onChange]);

	useEffect(() => {
        setIsMounted(true)
    }, []);  

    if(!isMounted){
        return null
    }
    return (
        <span className={classes}>
            {label ? <label className='form-label'>{label}</label> : ''}
            <Select {...rest}
                id={reactSelectId} ref={field.ref}
                value={field.value}
                onChange={handleSelectChange}
                options={options} isClearable
                isOptionDisabled={(option: any) => option.isDisabled}
                styles={{
                    control: (base: any, state: any) => ({
                        ...base,
                        borderWidth: '1.4px', borderStyle: 'solid',
                        borderColor: state.isFocused ? '#EAECF0 !important' : '#EAECF0 !important',
                        borderRadius: '8px', boxShadow: "none",
                        outline: 'none', padding: '0.2em 0.2em',
                    })               
                }}
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