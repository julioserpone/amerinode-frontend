import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('statuses', params)
    },
    get (id) {
        return httpService.get(`statuses/${id}`)
    },
    edit (id) {
        return httpService.get(`statuses/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`statuses/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`statuses/${id}`, params)
        }
        return httpService.post(`statuses`, params)
    }
}