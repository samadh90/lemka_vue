import Client from '../services/clients/axios.client';

const ressource = "rayons";

export default {
    GetAll() {
        return Client.get(`${ressource}/`);
    },

    GetById(id) {
        return Client.get(`${ressource}/${id}/`);
    },

    Insert(payload) {
        return Client.post(`${ressource}/`, payload);
    },

    Update(id, payload) {
        return Client.put(`${ressource}/${id}/`, payload);
    },

    Delete(id) {
        return Client.delete(`${ressource}/${id}/`);
    }
}
