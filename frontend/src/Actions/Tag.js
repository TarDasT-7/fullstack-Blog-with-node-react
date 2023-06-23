import { API } from '../config';
import _fetch from 'isomorphic-fetch';
import { HandleResponse } from './Auth';

export const index = () => {

    return _fetch(`${API}/tag`, {
        method: 'GET',

    }).then(response => {

        return response.json()

    }).catch(error => {});

}

export const store = (data, token) => {

    return _fetch(`${API}/tag`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)

    }).then(response => {
        HandleResponse(response)
        return response.json()

    }).catch(error => {
        console.log(error);
    });


}

export const find = (slug) => {

    return _fetch(`${API}/tag/${slug}`, {
        method: 'GET',

    }).then(response => {
        return response.json()

    }).catch(error => {});
}

export const update = (id, name, token) => {
    return _fetch(`${API}/tag/${id}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })

    }).then(response => {
        HandleResponse(response)
        return response.json()

    }).catch(error => {});
}

export const destroy = (slug, token) => {
    return _fetch(`${API}/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    }).then(response => {
        HandleResponse(response)
        return response.json()

    }).catch(error => {});
}