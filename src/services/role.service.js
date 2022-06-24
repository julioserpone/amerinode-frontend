import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('roles', params)
    },
    get (id) {
        return httpService.get(`roles/${id}`)
    },
    edit (id) {
        return httpService.get(`roles/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`roles/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`roles/${id}`, params)
        }
        return httpService.post(`roles`, params)
    }
}