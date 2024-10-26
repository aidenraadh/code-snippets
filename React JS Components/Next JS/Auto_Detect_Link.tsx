import Link from "next/link"

/**
 * This component generate an anchor tag or Next link based on the URL
 * passed into it. If the URL starts with "/" it will return Next Link
 * Otherwise it will return anchor tag link
 * 
 * @param children - Content of the link (optional)
 * @param href - The URL (optional, default "")
 * @param className - The classes of the component
 * @returns JSX element
 */

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

interface AutoLinkProps {
    children?: any,
    href?: string,
    className?: string,
    /** Other HTML attributes */
    [attrName: string]: any
}