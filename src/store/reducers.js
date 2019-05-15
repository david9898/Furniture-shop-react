const initialState = {
    isLog: false,
    username: '',
    authToken: '',
    id: '',
    articuls: [],
    renderArr: [],
    activePage: 1,
    seachArticuls: [],
    renderSearchArticuls: [],
    activeSearchPage: 1,
    details: {},
    comments: []
}

const rootReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGESTATUS':
            return {
                ...state,
                isLog: !state.isLog
            }
        case 'LOGINUSER':
            return {
                ...state,
                id: action.id,
                authToken: action.authToken,
                username: action.username
            }
        case 'LOGOUT':
            return {
                ...state,
                id: '',
                authToken: '',
                username: ''
            }   
        case 'CREATEARTICUL': 
            return {
                ...state,
                articuls: [action.obj, ...state.articuls]
            }
        case 'GETALLARTICULS':
            let startIndex = (state.activePage * 6) - 6
            let endIndex = startIndex + 6
            return {
                ...state,
                articuls: action.arr,
                renderArr: action.arr.slice(startIndex, endIndex)
            }
        case 'CHANGEACTIVEPAGE':
            let startIndexPage = (action.newPage * 6) - 6
            let endIndexPage = startIndexPage + 6
            return {
                ...state,
                activePage: action.newPage,
                renderArr: state.articuls.slice(startIndexPage, endIndexPage)
            }    
        case 'SEARCHITEMS':
            return {
                ...state,
                seachArticuls: action.arr,
                renderSearchArticuls: action.arr.slice(0, 6)
            }
        case 'CHANGEACTIVESEARCHPAGE':
            let startIndexSearchPage = (action.page * 6) - 6
            let endIndexSearchPage = startIndexSearchPage + 6
            return {
                ...state,
                activeSearchPage: action.page,
                renderSearchArticuls: state.seachArticuls.slice(startIndexSearchPage, endIndexSearchPage)
            }
        case 'CHANGEDETAILS':
            return {
                ...state,
                details: action.obj
            }
        case 'CHANGECOMMENTS':
            return {
                ...state,
                comments: action.arr
            }
        case 'ADDCOMMENT':
            return {
                ...state,
                comments: [action.obj, ...state.comments]
            }
        case 'REMOVEARTICUL':
            let filterArticuls = state.articuls.filter(obj => obj._id !== action.id)
            return {
                ...state,
                articuls: filterArticuls
            }
        default:
            return state
    }
}

export default rootReducers