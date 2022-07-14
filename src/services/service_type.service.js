import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('service-types', params)
    },
    get (id) {
        return httpService.get(`service-types/${id}`)
    },
    edit (id) {
        return httpService.get(`service-types/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`service-types/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`service-types/${id}`, params)
        }
        return httpService.post(`service-types`, params)
    }
}
