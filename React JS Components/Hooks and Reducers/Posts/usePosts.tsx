import { useReducer, useMemo } from "react"

import { InitialStateType, INITIAL_STATE, ACTIONS, postReducer } from "./postReducer"

export default function usePosts(args: ArgsType): returns{
    const [postsData, dispatchPosts] = useReducer(postReducer, {
        ...INITIAL_STATE, 
        posts: args.posts || INITIAL_STATE.posts,
        page: args.page !== undefined ? args.page : INITIAL_STATE.page,
        totalPosts: args.totalPosts !== undefined ? args.totalPosts : INITIAL_STATE.totalPosts,
        loadSize: args.loadSize !== undefined ? args.loadSize : INITIAL_STATE.loadSize,
    })
    
    const actions = useMemo<actionsType>(() => ({
        refresh: (refreshed) => {
            dispatchPosts({
                type: ACTIONS.REFRESH,
                payload: {
                    posts: refreshed.posts, page: refreshed.page, 
                    totalPosts: refreshed.totalPosts
                }
            })
        },
        load: (posts) => {
            dispatchPosts({
                type: ACTIONS.LOAD, payload: {posts: posts}
            })   
        }
    }), [dispatchPosts])
    return [
        postsData, actions
    ]
}
interface ArgsType{
    posts: InitialStateType['posts']
    page?: InitialStateType['page']
    totalPosts?: InitialStateType['totalPosts']
    loadSize?: InitialStateType['loadSize']
}
type actionsType = {
    refresh: (refreshed: {
        posts: InitialStateType['posts'],
        page?: InitialStateType['page'],
        totalPosts?: InitialStateType['totalPosts']          
    }) => void
    load: (posts: InitialStateType['posts']) => void
}

type returns = [
    InitialStateType, actionsType
]