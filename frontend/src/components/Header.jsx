import { Link, useLocation, Route } from 'react-router-dom'

import logo from '../images/Logo.svg'

const Header = ({signOut, email}) => {

  const location = useLocation()

  const onClose = () => {
    if (location.pathname === '/') {
      signOut();
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo"/>
      <div className='header__block'>
        <p className='header__link'>{email.email}</p>
        <Route path='/signup'>
          <Link to='/signin' className=' header__link link' onClick={onClose}>Войти</Link>
        </Route>
        <Route path='/signin'>
          <Link to='/signup' className=' header__link link' onClick={onClose}>Регистрация</Link>
        </Route>
        <Route exact path='/'>
          <Link to='/signin' className=' header__link link' onClick={onClose}>Выход</Link>
        </Route>
      </div>
    </header>
  )
}

export default Header