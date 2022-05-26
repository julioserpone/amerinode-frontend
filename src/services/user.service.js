import httpService from './http.service.js'

export default {
    users (payload) {
        return httpService.get('users', payload)
    },
    token (payload) {
        return httpService.post('token', payload)
    },
    logout (payload) {
        return httpService.post('logout', payload)
    }
}