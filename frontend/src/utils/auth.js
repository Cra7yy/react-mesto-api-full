// export const BASE_URL = "https://api.mesto.cra7y.nomoredomains.xyz"
export const BASE_URL = "http://localhost:3000"

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((data) => {
      throw new Error(data.message[0].messages[0].message);
    })
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(checkResponse)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(checkResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json', 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    })
    .then(checkResponse)
}
