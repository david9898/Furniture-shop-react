export const CHANGESTATUSUSER = () => {
    return {
        type: 'CHANGESTATUS'
    }
}

export const LOGINUSER = (id, authToken, username) => {
    return {
        type: 'LOGINUSER',
        id: id,
        authToken: authToken,
        username: username
    }
}

export const LOGOUT = () => {
    return {
        type: 'LOGOUT'
    }
}

export const CREATEARTICUL = (obj) => {
    return {
        type: 'CREATEARTICUL',
        obj: obj
    }
}

export const GETALLARTICULS = (arr) => {
    return {
        type: 'GETALLARTICULS',
        arr: arr
    }
}

export const CHANGEACTIVEPAGE = (newPage) => {
    return {
        type: 'CHANGEACTIVEPAGE',
        newPage: newPage
    }
}

export const SEARCHITEMS = (arr) => {
    return {
        type: 'SEARCHITEMS',
        arr: arr
    }
}

export const CHANGEACTIVESEARCHPAGE = (page) => {
    return {
        type: 'CHANGEACTIVESEARCHPAGE',
        page: page
    }
}

export const CHANGEDETAILS = (obj) => {
    return {
        type: 'CHANGEDETAILS',
        obj: obj
    }
}

export const CHANGECOMMENTS = (arr) => {
    return {
        type: 'CHANGECOMMENTS',
        arr: arr
    }
}

export const ADDCOMMENT = (obj) => {
    return {
        type: 'ADDCOMMENT',
        obj: obj
    }
}

export const REMOVEARTICUL = (id) => {
    return {
        type: 'REMOVEARTICUL',
        id: id
    }
}
