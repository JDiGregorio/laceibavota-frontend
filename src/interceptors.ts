import axios from 'axios'

const setupInterceptors = () => {
    axios.defaults.withCredentials = true
    axios.defaults.withXSRFToken = true

    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response?.status === 401) {
                localStorage.clear()
            }

            return Promise.reject(error)
        }
    )
}

export default setupInterceptors