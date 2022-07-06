import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('branches', params)
    },
    get (id) {
        return httpService.get(`branches/${id}`)
    },
    edit (id) {
        return httpService.get(`branches/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`branches/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`branches/${id}`, params)
        }
        return httpService.post(`branches`, params)
    }
}
