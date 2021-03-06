function reducer(store, action) {
    if (typeof action === 'string') {
        action = { type: action }
    }
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
        case 'set_doctitle':
            return {
                ...store,
                docTitle: store.siteName + ' - ' + action.data
            }
        case 'set_warning':
            return {
                ...store,
                alert: {
                    status: 'danger',
                    message: action.data
                }
            }
        case 'set_notif':
            return {
                ...store,
                alert: {
                    status: 'success',
                    message: action.data
                }
            }
        case 'hide_alert':
            return {
                ...store,
                alert: null
            }
        default:
            throw new Error()
    }
}
export default reducer