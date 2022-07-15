import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('project-types', params)
    },
    get (id) {
        return httpService.get(`project-types/${id}`)
    },
    edit (id) {
        return httpService.get(`project-types/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`project-types/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`project-types/${id}`, params)
        }
        return httpService.post(`project-types`, params)
    }
}
