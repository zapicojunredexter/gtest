import { API_URL } from '../constants/api';

export default class RequestService {
    static get = (path) => {
        return fetch(`${API_URL}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    static post = (path, body = {}) => {
        return fetch(`${API_URL}/${path}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    static put = (path, body = {}) => {
        return fetch(`${API_URL}/${path}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}