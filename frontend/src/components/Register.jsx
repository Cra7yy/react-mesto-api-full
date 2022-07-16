import { useState} from 'react'
import { Link } from 'react-router-dom'

const Register = ({ onInfoTooltip, handleRegister }) => {

  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  })

  const hamdleChange = (event) => {
    const { name, value } = event.target

    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }))
  } 

  const handleSubmit = (event) => {
    event.preventDefault()
    let { email, password } = formParams
    handleRegister({ email, password })
    onInfoTooltip()
  }

  return (
    <div className="log-in">
      <h2 className="log-in__title">Регистрация</h2>
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
        <button type="submit" className="log-in__button">Зарегистрироваться</button>
      </form>
      <p className="log-in__text">Уже зарегистрированы?<Link to="/signin" className="log-in__text link"> Войти</Link></p>
    </div>
  )
}

export default Register