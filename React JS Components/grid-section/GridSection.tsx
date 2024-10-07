'use client'

interface GridSectionType {
    col: number // 1,2,3,4
    colTablet?: number // 1,2,3,4
    colMobile?: number // 1,2,3,4
    className?: string
    children?: any
    [attrName: string]: any
}
export default function GridSection({className, col, colTablet, colMobile, children, ...rest}: GridSectionType){
    let classes = 'grid-section' + (className ? ` ${className}` : '')    
    classes += (col ? ` col-${(col)}` : '')
    classes += (colTablet ? ` col-${(colTablet)}-tablet` : '')
    classes += (colMobile ? ` col-${(colMobile)}-mobile` : '')    
 
    return (
        <div {...rest} className={classes}>
            {children}
        </div>        
    )
}

interface GridItemType {
    span?: number // 1,2,3,4
    spanTablet?: number // 1,2,3,4
    spanMobile?: number // 1,2,3,4
    className?: string
    children?: any
    [attrName: string]: any
}
export function GridItem({className, children, span, spanTablet, spanMobile, ...rest}: GridItemType){
    let classes = 'grid-item' + (className ? ` ${className}` : '')
    classes += (span ? ` item-span-${(span * 2)}` : '')
    classes += (spanTablet ? ` item-span-${(spanTablet * 2)}-tablet` : '')
    classes += (spanMobile ? ` item-span-${(spanMobile * 2)}-mobile` : '')
    return (
        <div {...rest} className={classes}>
            {children}
        </div>
    )
}