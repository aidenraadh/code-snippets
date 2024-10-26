'use client'

/**
 * A grid section
 * @param col - The number of column of the grid in desktop viewport 
 * @param colTablet - The number of column of the grid in the tablet viewport (optional, default will be the same with desktop viewport)
 * @param colMobile - The number of column of the grid in the mobile viewport (optional, default will be the same with desktop viewport)
 * @param className - The classes of the component
 * @param children - List of GridItem component(s)
 * @param tag - The GridSection tag (optional, default "div")
 * @returns JSX element
 */

export default function GridSection({className, col, colTablet, colMobile, children, tag, ...rest}: GridSectionType){
    const Tag = tag || 'div'
    let classes = 'grid-section' + (className ? ` ${className}` : '')    
    classes += (col ? ` col-${(col)}` : '')
    classes += (colTablet ? ` col-${(colTablet)}-tablet` : '')
    classes += (colMobile ? ` col-${(colMobile)}-mobile` : '')    
 
    return (
        <Tag {...rest} className={classes}>
            {children}
        </Tag>        
    )
}

/**
 * The column of the grid section
 * @param span - The total span of the column in desktop viewport. Must not be exceed the total column of the grid (optional, default 1)
 * @param spanTablet - The total span of the column in tablet viewport. Must not be exceed the total column of the grid (optional, default 1)
 * @param spanMobile - The total span of the column in mobile viewport. Must not be exceed the total column of the grid (optional, default 1)
 * @param children - The content of the column (optional)
 * @param tag - The GridItem tag (optional, default "div")
 * @param className - The classes of the component
 * 
 * @returns JSX element
 */

export function GridItem({className, children, span, spanTablet, spanMobile, tag, ...rest}: GridItemType){
    const Tag = tag || 'div'
    let classes = 'grid-item' + (className ? ` ${className}` : '')
    classes += (span ? ` item-span-${(span * 2)}` : '')
    classes += (spanTablet ? ` item-span-${(spanTablet * 2)}-tablet` : '')
    classes += (spanMobile ? ` item-span-${(spanMobile * 2)}-mobile` : '')
    return (
        <Tag {...rest} className={classes}>
            {children}
        </Tag>
    )
}

interface GridSectionType {
    /** The number of column of the grid in desktop viewport  */
    col: 1 | 2 | 3 | 4 | 5
    /** The number of column of the grid in the tablet viewport (optional, default will be the same with desktop viewport) */
    colTablet?: 1 | 2 | 3 | 4 | 5
    /** The number of column of the grid in the mobile viewport (optional, default will be the same with desktop viewport) */
    colMobile?: 1 | 2 | 3 | 4 | 5
    /** The classes of the component */
    className?: string
    /** List of GridItem component(s) */
    children?: any
    /** The GridSection tag */
    tag?: keyof JSX.IntrinsicElements,
    /** Other HTML attributes */
    [attrName: string]: any
}

interface GridItemType {
    /** The total span of the column in desktop viewport. Must not be exceed the total column of the grid (optional, default 1) */
    span?: 1 | 2 | 3 | 4 | 5
    /** The total span of the column in tablet viewport. Must not be exceed the total column of the grid (optional, default 1) */
    spanTablet?: 1 | 2 | 3 | 4 | 5
    /** The total span of the column in mobile viewport. Must not be exceed the total column of the grid (optional, default 1) */
    spanMobile?: 1 | 2 | 3 | 4 | 5
    /** The classes of the component (optional) */
    className?: string
    /** The content of the column (optional) */
    children?: any
    /** The GridItem tag */
    tag?: keyof JSX.IntrinsicElements,
    /** Other HTML attributes */
    [attrName: string]: any
}