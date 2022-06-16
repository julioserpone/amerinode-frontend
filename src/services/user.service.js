import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('users', params)
    },
    get (id) {
        return httpService.get(`users/${id}`)
    },
    edit (id) {
        return httpService.get(`users/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`users/${id}`)
    },
    save (id, params) {
        if(id) {
            return httpService.put(`users/${id}`, params)
        }
        return httpService.post(`users`, params)
    }
}