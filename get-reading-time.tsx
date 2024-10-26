/**
 * This function takes a string and calculate how much time does it take
 * to read the string in minute/hour. Useful to count the reading time of a post
 * 
 * @param text - The text
 * @param wpm - words per minute
 * @param hrFormat - Set reading time to hour format
 * @returns 
 */

export default function readingTime(text: string, wpm=225, hrFormat=false): number{
    if(!text){
        return 0
    }
    // Replace double whitespace with single whitespace and split the text between whitespace
    const words = text.trim().replace(/\s{2,}/g, ' ').split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    if(hrFormat){
        time / 60
    }
    return time
}