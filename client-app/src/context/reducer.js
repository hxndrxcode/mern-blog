function reducer(store, action) {
    console.log('reducer', action.type, action.data)
    switch (action.type) {
        case 'set_user':
            return {
                ...store,
                authuser: action.data
            }
        case 'set_logout':
            localStorage.removeItem('jwt_token')
            return {
                ...store,
                authuser: null,
                authHeader: {
                    headers: {}
                },
            }
        case 'set_token':
            localStorage.setItem('jwt_token', action.data)
            return {
                ...store,
                authHeader: {
                    headers: { Authorization: 'Bearer ' + action.data }
                },
            }
        default:
            throw new Error()
    }
}
export default reducer