import httpService from './http.service.js'

export default {
    login (payload) {
        return httpService.post('login', payload)
    },
    token (payload) {
        return httpService.post('token', payload)
    },
    logout (payload) {
        return httpService.post('logout', payload)
    }
}
