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

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => this._getResponseData(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => this._getResponseData(res))
  }

  editProfile({
    name,
    about
  }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getResponseData(res))
  }

  addCard({
    name,
    link
  }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => this._getResponseData(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes  `, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => this._getResponseData(res))
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes  `, {
        method: "PUT",
        headers: this._headers,
      })
      .then(res => this._getResponseData(res))
  }

  updateAvatar({
    avatar
  }) {
    console.log(avatar)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId)
    } else {
      return this.deleteLike(cardId)
    }
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
})

export default api