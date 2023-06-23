import { API } from '../config';
import _fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import process from 'process'
import { useNavigate } from 'react-router-dom';


export const HandleResponse = (response) => {
    
    
    if (response.status === 401) {
        return signOut(() => {
            alert('you need to login again')
            window.location.reload();
        })
    } else {
        return;
    }
}

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

export const signOut = (next) => {

    removeCookie('token');
    removeLocalStorage('user');
    const test = next();
    console.log(test);

    return _fetch(`${API}/signout`, {
        method: 'GET'
    }).then(response => {
        const history = useNavigate();
        history('/login');
    }).catch(error => {
        console.log(error);
    })

}

export const setCookie = (key, value) => {

    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const getCookie = (key) => {

    if (process.browser) {
        return cookie.get(key);
    }
}

export const removeCookie = (key) => {

    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}

export const authenticate = (data, next) => {
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next();
}

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token')
        if (cookieChecked && cookieChecked !== 'undefined') {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}