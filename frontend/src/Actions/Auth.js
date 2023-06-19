import fetch from 'isomorphic-fetch';
import { API } from '../config';
import _fetch from 'isomorphic-fetch';


export const register = (user) => {

    return _fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)

    }).then(response => {
        return response.json()

    }).catch(error => console.log(error))

}

export const login = (user) => {
    return _fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)

    }).then(response => {
        return response.json()

    }).catch(error => console.log(error))
}