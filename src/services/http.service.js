import axios from 'axios'
//import router from '../routes.js'
import {notify} from "notiwind";

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
        //API server offline
        if (error.code == "ERR_NETWORK") {
            notify({
                group: "top",
                title: "Error",
                text: "Offline server. Please try your request later",
                type: "error"
            }, 5000)
        } else {
            if (error.response.status === 401) {
                if (localStorage.getItem('url') === null) {
                    localStorage.setItem('url', window.location.href)
                }
                // remove the user logged in storage
                localStorage.removeItem('jwt')
                localStorage.removeItem('user')

                //router.push({ name: 'login' }).then()
            }
        }
        return Promise.reject(error)
    }
)

export default httpClient
