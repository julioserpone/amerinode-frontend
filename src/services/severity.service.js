import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('severities', params)
    },
    get (id) {
        return httpService.get(`severities/${id}`)
    },
    edit (id) {
        return httpService.get(`severities/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`severities/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`severities/${id}`, params)
        }
        return httpService.post(`severities`, params)
    }
}
