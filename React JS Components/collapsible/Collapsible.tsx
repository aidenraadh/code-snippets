'use client'

import { useEffect, useRef } from "react";

/**
 * A collapsible
 * 
 * @param expanded - Whether or not the collapsible is expanded. Use a boolean state from the parent component
 * @param children - The content of the collapsible (boolean)
 * @param className - The classes of the component
 * @returns JSX element
 */

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

interface CollapsibleType {
    expanded: boolean,
    children?: any,
    className?: string,
    /** Other HTML attributes */
    [attrName: string]: any
}