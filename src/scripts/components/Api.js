class Api {
  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: this._token,
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders(),
    })
      .then(this._getJson);
  }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._getHeaders(),
    })
      .then(this._getJson);
  }

  editProfileInfo(data) {
    return fetch(`${this._basePath}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
    .then(this._getJson);
  }

  addNewCard(data) {
    return fetch(`${this._basePath}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._getJson);
  }

  editProfileAvatar(data) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._getJson);
  }

  deleteCard(id) {
    return fetch(`${this._basePath}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._getJson);
  }

  putLike(id) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
      .then(this._getJson);
  }

  deleteLike(id) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._getJson);
  }
}

export default Api;