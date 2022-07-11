import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('projects', params)
    },
    get (id) {
        return httpService.get(`projects/${id}`)
    },
    edit (id) {
        return httpService.get(`projects/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`projects/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`projects/${id}`, params)
        }
        return httpService.post(`projects`, params)
    }
}
