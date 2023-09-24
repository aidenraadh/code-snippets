import { useReducer, useMemo } from "react"

import { cartReducer, ACTIONS, InitialStateType, getLastCart } from "./cartReducer"

export default function useCart(){
    const [cart, dispatchCart] = useReducer(cartReducer, getLastCart())
    
    const actions = useMemo<cartActionsType>(() => ({
        update: (items) => {
            dispatchCart({
                type: ACTIONS.UPDATE,
                payload: {items: items}
            })
        },
        increase: (itemId) => {
            dispatchCart({type: ACTIONS.INCREASE, payload: {itemId: itemId}})
        },       
        decrease: (itemId) => {
            dispatchCart({type: ACTIONS.DECREASE, payload: {itemId: itemId}})
        }, 
        empty: () => {
            dispatchCart({type: ACTIONS.EMPTY})
        }          
    }), [dispatchCart])
    return [
        cart, actions
    ]
}

type cartActionsType = {
    update: (items: InitialStateType['items']) => void
    increase: (itemId: string) => void
    decrease: (itemId: string) => void
    empty: () => void
}