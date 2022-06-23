import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('permissions', params)
    },
    get (id) {
        return httpService.get(`permissions/${id}`)
    },
    edit (id) {
        return httpService.get(`permissions/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`permissions/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`permissions/${id}`, params)
        }
        return httpService.post(`permissions`, params)
    }
}