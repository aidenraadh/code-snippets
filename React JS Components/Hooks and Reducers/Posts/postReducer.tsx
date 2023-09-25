type ActionType = {
    type: string
    payload?: {[key: string]: any}
}
export interface StateType{
    posts: any[],
    page: number,
    totalPosts?: number,
    loadSize: number,
    canLoadMore: boolean
}
export const INITIAL_STATE: StateType = {
    posts: [],
    page: 1,
    totalPosts: undefined,
    loadSize: 20,
    canLoadMore: false
}
export const ACTIONS = {
    REFRESH: 'REFRESH',
    LOAD: 'LOAD',
}
export const postReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case 'REFRESH':
            const freshPosts = (action.payload && action.payload.posts) ? action.payload.posts : []
            const page = action.payload && action.payload.page ? action.payload.page : state.page
            const totalPosts = action.payload && action.payload.totalPosts ? action.payload.totalPosts : state.totalPosts
            return {
                ...state,
                posts: freshPosts,
                page: page,
                totalPosts: totalPosts,
                canLoadMore: freshPosts.length < state.loadSize ? false : true
            }
        case 'LOAD':
            const newPosts = (action.payload && action.payload.posts) ? action.payload.posts : []
            return {
                ...state,
                posts: [...state.posts, ...newPosts],
                page: state.page + 1,
                canLoadMore: newPosts.length < state.loadSize ? false : true
            }
        default: return INITIAL_STATE
    }
}