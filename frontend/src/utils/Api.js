class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(res.status)
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(res => this._getResponseData(res))
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(res => this._getResponseData(res))
  }

  editProfile(
    name,
    about,
    token
  ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getResponseData(res))
  }

  addCard(
    name,
    link,
    token
  ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._getResponseData(res))
  }

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => this._getResponseData(res))
  }

  deleteLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes  `, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
        },
      })
      .then(res => this._getResponseData(res))
  }

  addLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes  `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
        },
      })
      .then(res => this._getResponseData(res))
  }

  updateAvatar(
    avatar,
    token
  ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this.addLike(cardId, token)
    } else {
      return this.deleteLike(cardId, token)
    }
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
})

export default api