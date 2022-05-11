import axios from 'axios'
import router from '../routes.js'

/**
 *
 * @type {{headers: {Accept: string, "Content-Type": string}, baseURL}}
 */
const config = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}
const httpClient = axios.create(config)
//console.log(import.meta.env)
/**
 * @param config
 * @returns {*}
 */
const authInterceptor = config => {
    /** add auth token */
    const token = localStorage.getItem('jwt')
    config.headers.Authorization = `Bearer ${token}`
    return config
}

const loggerInterceptor = config => {
    return config
}

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor)
httpClient.interceptors.request.use(loggerInterceptor)

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status === 401) {
            console.log('error 401')
            if (localStorage.getItem('url') === null) {
                localStorage.setItem('url', window.location.href)
            }
            // remove the user logged in storage
            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
            //TODO: Validar previamente que el 401 no provenga del login, ya que al realizar un push sobre la misma página no se renderiza el router-view del LayoutAuth
            //router.push({ name: 'login' }).then()
        }
        return Promise.reject(error)
    }
)

export default httpClient
