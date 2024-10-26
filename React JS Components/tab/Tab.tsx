'use client'

import { useMemo, useState } from "react"

/**
 * A Tab
 * @param children - List of TabPanel component(s)
 * @param className - The classes of the component (optional)
 * @returns JSX element
 */

export function Tab({children, className, ...rest}: TabType){
    const [lastShownPanel, setLastShownPanel] = useState<number>(0)
    const panels = useMemo(() => {
        if(!children){
            return null
        }
        if(Array.isArray(children)){
            let childArr = children.flat()
            return childArr.filter(child => child.props && child.props.identifier === 'tabpanel')
        }
        else{
            if(children.props && children.props.identifier === 'tabpanel') return children
            return null
        }
    }, [children])
    const classes = 'tab'+ (className ? ` ${className}` : '')
    const transitionDur = 300

    return (
        <div className={classes} {...rest}>
            <ul className="tab-links">
                {
                    !panels ? <></> : (
                        Array.isArray(panels) ? panels.map((panel, index) => (
                            <li key={index} className={`tab-link ${index === lastShownPanel ? ' active' : ''}`} 
                                onClick={() => {setLastShownPanel(index)}}
                            >
                                <button type="button">{panel.props.title}</button>
                            </li>  
                        )) :
                        <li className={`tab-link active`} onClick={() => {setLastShownPanel(0)}}>
                            <a href={`#${panels.props.id}`}>{panels.props.title}</a>
                        </li>                        
                    )
                }
            </ul>
            <div className="tab-panels">
                {
                    !panels ? <></> : (
                        Array.isArray(panels) ? panels.map((panel, index) => (
                            <div key={index} style={{transitionDuration: `${transitionDur}ms`}}  className={`tab-panel ${index === lastShownPanel ? ' shown active' : ''}`} id={panel.props.id}>
                                {panel.props.children}
                            </div>
                        )) :
                        <div className={`tab-panel ${0 === lastShownPanel ? ' shown active' : ''}`} id={panels.props.id} style={{transitionDuration: `${transitionDur}ms`}}>
                            {panels.props.children}
                        </div>                    
                    )
                }                              
            </div>
        </div>
    )
}

/**
 * The tab panel
 * @param id - The ID of the tab panel
 * @param title - The title of the tab panel
 * @param children - The content of the tab panel (optional)
 * @param className - The classes of the component (optional)
 * @returns JSX element
 */

export function TabPanel({id, title, children, className, ...rest}: TabPanelType){
    return (
        <div className="tab-panel" {...rest} id={id}>
            {children}
        </div>
    )
}

TabPanel.defaultProps = {
    identifier: 'tabpanel'
}

interface TabType{
    children: any
    className?: string
    /** Other HTML attributes */
    [attrName: string]: any
}

interface TabPanelType{
    id: string
    title: string
    children?: any
    className?: string
    /** Other HTML attributes */
    [attrName: string]: any
}