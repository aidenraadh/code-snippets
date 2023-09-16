
/**
 * Truncate a string if the it exceeds a certain amount of characters
 * Also add suffix (like ...) to the end of the truncated text
 * 
 * @param text - The text you want to truncate
 * @param maxChar - The maximum character
 * @param suffix - The truncated's text suffix

 */
export default function truncateText(text: string, maxChar=10, suffix='...'): string{
    let textArr = text.split('')
    if(textArr.length > maxChar){
        textArr.splice(maxChar)
        return textArr.join('') + suffix
    }
    return textArr.join('')
}