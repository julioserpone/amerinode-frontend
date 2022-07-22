import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('sla', params)
    },
    get (id) {
        return httpService.get(`sla/${id}`)
    },
    edit (id) {
        return httpService.get(`sla/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`sla/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`sla/${id}`, params)
        }
        return httpService.post(`sla`, params)
    }
}
