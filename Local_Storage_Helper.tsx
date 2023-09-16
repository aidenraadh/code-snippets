// Get data from local storage and return it as JSON object
export function getLocalStorage(key: string){
    let value: string | {[key: string]: any} | null = null
    if(typeof window !== "undefined"){
        value = localStorage.getItem(key);
    }
    if(value === null){
        return value
    }
    return JSON.parse(value)
}

// Set data to local storage and auto convert it to JSON string
export function setLocalStorage(key: string, value:any){
    if(typeof window !== "undefined"){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// Remove data from local storage
export function removeLocalStorage(key: string){
    if(typeof window !== "undefined"){
        localStorage.removeItem(key);
    }
}