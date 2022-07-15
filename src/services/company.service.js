import httpService from './http.service.js'

export default {
    list (params) {
        return httpService.get('companies', params)
    },
    get (id) {
        return httpService.get(`companies/${id}`)
    },
    byCountry (idCountry) {
        return httpService.get(`companies/byCountry/${idCountry}`)
    },
    edit (id) {
        return httpService.get(`companies/${id}/edit`)
    },
    delete (id) {
        return httpService.delete(`companies/${id}`)
    },
    save (id, params) {
        if(id) {
            return  httpService.put(`companies/${id}`, params)
        }
        return httpService.post(`companies`, params)
    }
}
