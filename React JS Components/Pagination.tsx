import { useEffect, useMemo, useState } from "react"

export default function Pagination({
    currentPage, pageSize, range, totalItems, 
    clickHandler, config, tag, className, ...rest
}: Props){
    const [pagesListData, setPagesList] = useState<PagesListDataType>({list:[], botNum: 0, topNum: 0})
    const currentPageInt = typeof currentPage === 'number' ? currentPage : parseInt(currentPage)
    const totalPages = useMemo(() => (
        !totalItems || !pageSize ? 0 : Math.ceil(totalItems/pageSize)
    ), [totalItems, pageSize])
    
    const Tag = tag || 'div'
    let classes = 'pagination' + (className ? ` ${className}` : '')

    useEffect(() => {
        const separator = !config || !config.separator ? '...' : config.separator
        let lastSibling = 0
        if(currentPageInt <= range){
            lastSibling = totalPages < range ? totalPages : range
        }
        else{
            lastSibling = Math.ceil(currentPageInt/range) * range
            if(lastSibling > totalPages){ lastSibling = totalPages }
        }

        let arrPageNumbers = []
        for (let index = lastSibling; (index > 0) && (index >= (lastSibling - range + 1)); --index) {
            arrPageNumbers.push(index)        
        }
        arrPageNumbers.sort(function(a: number, b: number){return a-b});

        let data: PagesListType = arrPageNumbers.map(pageNumber => ({
            pageNumber: pageNumber, text: pageNumber
        }))
        if(arrPageNumbers[0] !== 1){
            data = [
                {pageNumber: 1, text: 1}, {pageNumber: 0, text: separator, sprtOnly: true}, 
                ...data
            ]
        }
        if(arrPageNumbers[arrPageNumbers.length - 1] !== totalPages){
            data = [ 
                ...data, {pageNumber: 0, text: separator, sprtOnly: true}, 
                {pageNumber: totalPages, text: totalPages}
            ]            
        }

        setPagesList({
            list: data, 
            botNum: arrPageNumbers[0], 
            topNum: arrPageNumbers[arrPageNumbers.length - 1]
        })
    }, [setPagesList, currentPageInt, range, totalPages, config])

    if(totalPages === 1 || !totalPages){
        return ''
    }
    return (
        <Tag className={classes} {...rest}>
            <ul className="inner">
                <PrevPageList
                    botNum={pagesListData?.botNum || null}
                    clickHandler={clickHandler} 
                    config={config}
                />
                {
                    !pagesListData ? '' : pagesListData.list.map((page, idx: number) => {
                        let pageLinkClass = 'page-link'
                        if(page.sprtOnly){
                            return (
                                <li key={idx} className={pageLinkClass+' separator'}>{page.text}</li>
                            )
                        }
                        if(page.pageNumber === (currentPageInt)){
                            pageLinkClass += ' active'
                        }
                        return (
                            <li key={idx} className={pageLinkClass}>
                                <button type="button" onClick={() => {clickHandler(page.pageNumber)}}>
                                    {page.text}
                                </button>   
                            </li>  
                        )                   
                    })
                }
                <NextPageList
                    topNum={pagesListData?.topNum || null}
                    totalPages={totalPages}
                    clickHandler={clickHandler}
                    config={config}
                />            
            </ul>
        </Tag>
    )
}

const PrevPageList = ({botNum, clickHandler, config}: PrevPageListProps) => {
    if(!botNum || botNum - 1 < 1){
        return ''
    }    
    return (
        <li className="page-list-nav prev">
            <button type="button" onClick={() => {clickHandler(botNum - 1)}}>
                {!config || !config.prevArrow ? '<' : config.prevArrow}
            </button>
        </li>
    )  
}

const NextPageList = ({topNum, totalPages, clickHandler, config}: NextPageListProps) => {
    if(!topNum || topNum + 1 > totalPages){
        return ''
    }    
    return (
        <li className="page-list-nav next">
            <button type="button" onClick={() => {clickHandler(topNum + 1)}}>
                {!config || !config.nextArrow ? '>' : config.nextArrow}
            </button>
        </li>
    )  
}



type PagesListType = {
    pageNumber: number | string, // The page number
    text: number | string | JSX.Element,  // The text inside the page link
    sprtOnly?: boolean
}[]

type PagesListDataType = {
    list: PagesListType, botNum: number, topNum: number
}

type ConfigType = {
    separator?: string | JSX.Element
    prevArrow?: string | JSX.Element
    nextArrow?: string | JSX.Element
}

type ClickHandlerType = (page: number | string) => void

type Props = {
    pageSize: number, // Amount of items in one page
    currentPage: number | string, // The current page, this comes from the parent component
    range: number,
    totalItems: number, // The total number of the items
    clickHandler: ClickHandlerType,
    config?: ConfigType
    tag?: keyof JSX.IntrinsicElements,
    className?: string,
    [attrName: string]: any // HTML attributes  
}

type NextPageListProps = {
    topNum: number | null, 
    totalPages: number, 
    clickHandler: ClickHandlerType
    config?: ConfigType
}

type PrevPageListProps = {
    botNum: number | null, 
    clickHandler: ClickHandlerType
    config?: ConfigType
}