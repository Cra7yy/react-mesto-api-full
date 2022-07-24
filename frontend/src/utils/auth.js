export const BASE_URL = "http://localhost:3000"

const checkResponse = (res) => {
  console.log('function 3 приходяшие данные из бека component auth', res)
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
  console.log('function 2 component auth', email, password)
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
  console.log('function 6 getContent component auth upload user data')
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
