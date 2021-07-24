export const handleApiError = (err, store, dispatch) => {
    if (err.response) {
        if (err.response.status === 401) {
            dispatch({
                type: 'set_logout'
            })
        }
        if (err.response.status === 404) {
            // dispatch({
            //     type: 'set_'
            // })
        }
    } else {
        console.error(err)
    }
}
