import { useState } from 'react'

const Login = ({ handleLogin }) => {

  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  })

  const hamdleChange = (event) => {
    const { name, value } = event.target

    setFormParams((data) => ({
      ...data,
      [name]: value
    }))
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParams.email || !formParams.password){
      return;
    }
    handleLogin({ email: formParams.email, password: formParams.password })
  }

  return (
    <div className="log-in">
      <h2 className="log-in__title">Вход</h2>
      <form className="log-in__form" onSubmit={handleSubmit}>
        <input
          name='email'
          type="email"
          className="log-in__input log-in__email"
          placeholder="Email"
          required
          minLength="5"
          maxLength="40"
          onChange={hamdleChange}
          />
        <input
          name='password'
          type="password"
          className="log-in__input log-in__pasword"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="30"
          onChange={hamdleChange}
          />
        <button type="submit" className="log-in__button">Войти</button>
      </form>
    </div>
  )
}

export default Login