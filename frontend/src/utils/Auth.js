import { BACKEND_BASE_URL } from './constants.js';

export function register({email, password}) {
  return fetch(`${BACKEND_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
}

export function authorize({email, password}) {
  return fetch(`${BACKEND_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
}

export function checkToken(token) {
  return fetch(`${BACKEND_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
}
