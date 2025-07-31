import axios from 'axios'

const setupInterceptors = () => {
    axios.defaults.withCredentials = true
    axios.defaults.withXSRFToken = true

    axios.interceptors.request.use(
        (config) => {
            if (config.url?.startsWith('http://')) {
                config.url = config.url.replace('http://', 'https://')
            }

            if (config.baseURL?.startsWith('http://')) {
                config.baseURL = config.baseURL.replace('http://', 'https://')
            }

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

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