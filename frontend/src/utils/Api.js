import { BACKEND_BASE_URL } from './constants.js';

class Api {
  constructor() {
    this._baseUrl = BACKEND_BASE_URL;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getRequest(urlPath) {
    return fetch(`${this._baseUrl}${urlPath}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._checkResponse);
  }

  _setRequest(urlPath, requestMethod) {
    return fetch(`${this._baseUrl}${urlPath}`, {
      method: requestMethod,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  _setRequestWithBody(urlPath, requestMethod, requestBody) {
    return fetch(`${this._baseUrl}${urlPath}`, {
      method: requestMethod,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(this._checkResponse);
  }

  getCardList() {
    return this._getRequest('/cards');
  }

  getUserInfo() {
    return this._getRequest('/users/me');
  }

  setUserAvatar(newProfileAvatar) {
    return this._setRequestWithBody('/users/me/avatar', 'PATCH', {
      avatar: newProfileAvatar.avatar
    });
  }

  setUserInfo(newProfileData) {
    return this._setRequestWithBody('/users/me', 'PATCH', {
      name: newProfileData.name,
      about: newProfileData.about
    });
  }

  sendNewCard(newCardData) {
    return this._setRequestWithBody('/cards', 'POST', {
      name: newCardData.title,
      link: newCardData.link
    });
  }

  removeCard(cardId) {
    return this._setRequest(`/cards/${cardId}`, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    return (isLiked
      ? this._setRequest(`/cards/${cardId}/likes`, 'DELETE')
      : this._setRequest(`/cards/${cardId}/likes`, 'PUT')
    )
  }
}

const api = new Api();

export default api;
