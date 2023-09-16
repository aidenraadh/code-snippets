/**
 * Both function below will be useful if you want to use a post title as
 * a slug
 */

// Pretty encode string, by replacing ' ' with '-' and '-' with '_'
// Example "This is Post" will be "this-is-post"
export const prtEncString = (string: string): string => {
    const sanitized = string.replace(/-/g, '_').replace(/ /g, '-').toLowerCase()
    return encodeURIComponent(sanitized)
}

// Reverse pretty encode string
// Example "this-is-post" will be "this is post"
export const revPrtEncString = (string: string): string => {
    let decoded = decodeURIComponent(string)
    decoded = decoded.replace(/-/g, ' ').replace(/_/g, '-')
    return encodeURIComponent(decoded)
}