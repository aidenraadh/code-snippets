type ActionType = {
    type: string
    payload?: {
        itemId?: string,
        items?: {[itemId: string]: number}        
    }
}
export const cartReducer = (state: any, action: ActionType) => {
    const lastItems: {[itemId: string]: number} = {...state.items}
    let newCart: {[key: string]: any} = {}
    switch (action.type) {
        case ACTIONS.UPDATE:
            const items = (action.payload && action.payload.items) || {}
            // Update last items
            for (const itemId in items) {
                lastItems[itemId] = items[itemId]
            }

            newCart = sanitizeItems(lastItems)
            setLocalStorage(
                'cart', {
                    items: newCart.newItems, totalItems: newCart.totalNewItems
                } 
            )
            return {
                ...state, items: newCart.newItems, totalItems: newCart.totalNewItems
            }; 
        case ACTIONS.INCREASE:
            // Get the item ID
            const incItemId = (action.payload && action.payload.itemId) || ''
            lastItems[incItemId] = (
                lastItems[incItemId] ? lastItems[incItemId] + 1 : 1
            )
            newCart = sanitizeItems(lastItems)
            setLocalStorage(
                'cart', {
                    items: newCart.newItems, totalItems: newCart.totalNewItems
                } 
            )
            return {
                ...state, items: newCart.newItems, totalItems: newCart.totalNewItems
            }  
        case ACTIONS.DECREASE:
            // Get the item ID
            const decItemId = (action.payload && action.payload.itemId) || ''
            lastItems[decItemId] = (
                lastItems[decItemId] ? lastItems[decItemId] - 1 : 0
            )

            newCart = sanitizeItems(lastItems)
            setLocalStorage(
                'cart', {
                    ...state, items: newCart.newItems, totalItems: newCart.totalNewItems
                } 
            )
            return {
                ...state, items: newCart.newItems, totalItems: newCart.totalNewItems
            }                        
        case ACTIONS.EMPTY:
            setLocalStorage('cart', INITIAL_STATE)
            return INITIAL_STATE          
        default: return state
    }
}
export type InitialStateType = {
    items: {[itemId: string]: number}
    totalItems: number
}
export const INITIAL_STATE: InitialStateType = {
    items: {},
    totalItems: 0,
}
export const ACTIONS = {
    UPDATE: 'UPDATE', // Bulk update quantity of one or more items
    INCREASE: 'INCREASE', // Increase quantity of an item,
    DECREASE: 'DECREASE', // Decrease quantity of an item
    EMPTY: 'EMPTY' // Empty the cart
}
export const getLastCart = () => {
    let cart = getLocalStorage('cart')
    if(cart === null){
        cart = INITIAL_STATE
        setLocalStorage('cart', cart)
        return cart
    }
    return cart

}



// Filter only items that has quantity and recalculate total items in cart
const sanitizeItems = (lastItems: {[itemId: string]: number}) => {
    const items: {[itemId: string]: number} = {}
    let totalNewItems = 0            
    for (const itemId in lastItems) {
        if(lastItems[itemId]){
            items[itemId] = lastItems[itemId]
            totalNewItems += lastItems[itemId]
        }
    }
    return {items, totalNewItems}
}

// Get data from local storage and return it as JSON object
const getLocalStorage = (key: string) => {
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
const setLocalStorage = (key: string, value:any) => {
    if(typeof window !== "undefined"){
        localStorage.setItem(key, JSON.stringify(value));
    }
}