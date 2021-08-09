const ApiURL = process.env.REACT_APP_API_URL
const axios = require('axios')

export const handleApiError = (err, store, dispatch) => {
    if (err.response) {
        console.log(err.response)
        if (err.response.status === 401) {
            dispatch('set_logout')
        }
        if (err.response.data.message) {
            dispatch({
                type: 'set_warning',
                data: err.response.data.message
            })
        }
    } else {
        console.error(err)
    }
}

export const Api = axios.create({
    baseURL: ApiURL,
    params: {
        t: new Date().getTime()
    }
})