import { useMemo } from "react"
import './styles.css'

interface TableProps {
    children: any,
    className?: string,
    [attrName: string]: any // HTML attributes  
}
export function Table({children, className, ...rest}: TableProps){
    const classes = 'table-container' + (className ? ' '+className : '')
    const headings = useMemo(() => {
        if(!children){
            return <></>
        }
        if(Array.isArray(children)){
            let childArr = children.flat()
            return childArr.filter(child => child.props && child.props.identifier === 'thead')
        }
        else{
            if(children.props && children.props.identifier === 'thead') return children
            return <></>
        }
    }, [children])

    const body = useMemo(() => {
        if(!children){
            return <></>
        }
        if(Array.isArray(children)){
            let childArr = children.flat()
            return childArr.filter(child => child.props && child.props.identifier === 'tbody')
        }
        else{
            if(children.props && children.props.identifier === 'tbody') return children
            return <></>
        }
    }, [children])    

    return (
        <div className={classes} {...rest}>
            <table>
                <thead>{headings}</thead>
                <tbody>{body}</tbody>
            </table>
        </div>
    )
}

interface TbodyProps {
    rows: JSX.Element[][] | string[][],
    className?: string,
    [attrName: string]: any // HTML attributes  
}
export function Tbody({rows, className, ...rest}: TbodyProps){
    const classes = (className ? className : '')
    return (
        <tbody className={classes} {...rest}>
            {rows.map((columns, index) => (
                <tr key={index}>
                    {columns.map((column, idx) => (
                        <td key={idx}>{column}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

export function THead({children}: {children: any}){
    return (
        <tr>{children}</tr>
    )
}

THead.defaultProps = {
    identifier: 'thead'
}

export function TBody({children}: {children: any}){
    return (
        <tr>{children}</tr>
    )
}

TBody.defaultProps = {
    identifier: 'tbody'
}

export function Th({children, className, sorting, ...rest}: CellType){
    let classes = ''+(className ? ` ${className}` : '')
    return <th className={classes} {...rest}>{children || <></>}</th>
}


export function Td({children, className, ...rest}: CellType){
    const classes = ''+(className ? ` ${className}` : '')
    return <td className={classes} {...rest}>{children || <></>}</td>
}

interface CellType{
    children?: any
    className?: string
    [attrName: string]: any // HTML attributes  
}