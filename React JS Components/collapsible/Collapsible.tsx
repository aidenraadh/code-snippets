'use client'

import { useEffect, useRef } from "react";

interface CollapsibleType {
    expanded: boolean,
    children?: any,
    className?: string, // Classes
    [attrName: string]: any // attributes      
}

export default function Collapsible({expanded, children, className, ...rest}: CollapsibleType){
    const ref = useRef<HTMLDivElement | null>(null)
    let classes = 'collapsible' + (className ? ` ${className}` : '')

    useEffect(() => {
        if(ref && ref.current){
            if(expanded){
                ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
            }
            else {
                ref.current.style.maxHeight = `0`
            }
        }
    }, [ref, expanded])
    return (
        <div {...rest} ref={ref} className={classes}>{children}</div>
    )
}