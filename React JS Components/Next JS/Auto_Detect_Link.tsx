import Link from "next/link"

/**
 * This component generate an anchor tag or Next link based on the URL
 * passed into it. If the URL starts with "/" it will return Next Link
 * Otherwise it will return anchor tag link
 */

interface AutoLinkProps {
    children?: any, // Content of the link
    href?: string, // The URL
    className?: string,
    [attrName: string]: any // HTML attributes  
}

// Generate an anchor tag or Next link based on the URL
export function AutoLink({children, href, className, ...rest}: AutoLinkProps){
    if(href?.charAt(0) === '/'){
        return (
            <Link href={href || '/'} className={className} {...rest}>{children}</Link>
        )
    }
    return (
        <a href={href || '/'} className={className || ''} {...rest}>{children}</a>
    )
}