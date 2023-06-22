import { API } from '../config';
import _fetch from 'isomorphic-fetch';

export const index = () => {

    return _fetch(`${API}/category`, {
        method: 'GET',

    }).then(response => {
        return response.json()

    }).catch(error => (error.json()))

}

export const store = (data, token) => {

    return _fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)

    }).then(response => {
        return response.json()

    }).catch(error => (error.json()))

}

export const find = (slug) => {
    
    return _fetch(`${API}/category/${slug}`, {
        method: 'GET',

    }).then(response => {
        return response.json()

    }).catch(error => (error.json()))
}

export const update = (id, name, token) => {
    return _fetch(`${API}/category/${id}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name})

    }).then(response => {
        return response.json()

    }).catch(error => (error.json()));
}

export const destroy = (slug, token) => {
    return _fetch(`${API}/category/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    }).then(response => {
        return response.json()

    }).catch(error => (error.json()));
}