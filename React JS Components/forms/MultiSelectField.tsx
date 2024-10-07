'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import { BaseFormProps } from "./utils/types"
import { useController } from "react-hook-form"
import Select, { MultiValue } from 'react-select'
import { getFieldErrMsg } from "./utils/form-error"
import './utils/styles.css'

interface MultiSelectFieldProps extends BaseFormProps {
    options: {value: any, label: string}[],
    setChangeSelected?: (handleSelectChange: (opt: MultiValue<any>) => void) => void;   
}

export default function MultiSelectField({
    fieldName, control, options, errorCfg,
    label, desc, setChangeSelected, className, ...rest
}: MultiSelectFieldProps) {
    const reactSelectId = useMemo(() => (Date.now().toString()), [])
    const [isMounted, setIsMounted] = useState(false);    
    const [selectedOption, setSelectedOption] = useState<MultiValue<any>>([]);
    const {field, fieldState} = useController({name: fieldName, control,});
    let classes = 'form-group' + (className ? ' '+className : '')
    classes += rest.required ? ' required' : ''   

    const handleSelectChange = useCallback((selected: MultiValue<any>) => {
        setSelectedOption(state => {
            let newState = [...state]
            newState.push(selected)
            field.onChange(newState)
            return newState
        })
    }, [setSelectedOption, field.onChange]);

	useEffect(() => {
        setIsMounted(true)
    }, []);  

    useEffect(() => {
        if(isMounted && setChangeSelected){
            setChangeSelected(handleSelectChange)
        }
    }, [isMounted, handleSelectChange, setChangeSelected])

    if(!isMounted){
        return null
    } 
    return (
        <span className={classes}>
            {label ? <label className='form-label'>{label}</label> : ''}
            <Select {...rest}
                id={reactSelectId}
                ref={field.ref} options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                isOptionDisabled={(option: any) => option.isDisabled}
                isClearable
                isMulti styles={{
                    control: (base: any, state: any) => ({
                        ...base,
                        borderWidth: '1.4px', borderStyle: 'solid',
                        borderColor: state.isFocused ? '#EAECF0 !important' : '#EAECF0 !important',
                        borderRadius: '8px', boxShadow: "none",
                        outline: 'none', padding: '0.2em 0.2em'                      
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