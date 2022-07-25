import {useState, useEffect} from 'react'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'

import Header from "./Header";
import Main from './Main'
import Footer from './Footer'
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login';
import Register from './Register'
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip'
import api from '../utils/Api'
import * as auth from '../utils/auth'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {

  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltip,setIsInfoTooltip] = useState(false)
  const [currentUser,setCurrentUser] = useState({name: '', about: '', link: ''})
  const [selectedCard,setSelectedCard] = useState(null);
  const [cards,setCards] = useState([])
  const [loggedIn,setLoggedIn] = useState(false)
  const [email,setEmail] = useState('')
  const [register,setRegister] = useState(false)
  const history = useHistory()

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleInfoTooltip = () => {
    setIsInfoTooltip(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleInfoRegister = () => {
    setRegister(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltip(false)
    setRegister(false)
    setSelectedCard(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.getProfile(token)
        .then((res) => {
          setCurrentUser(res)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

  const handleUpdateUser = ({name, about}) => {
    const token = localStorage.getItem('token');
    api.editProfile(name, about, token)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = ({ avatar }) => {
    const token = localStorage.getItem('token')
    api.updateAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.getInitialCards(token)
        .then((res) => {
          res.reverse()
          setCards(res)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id)
    const token = localStorage.getItem('token')
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id
          ? newCard
          : c));
      })
      .catch(err => console.log(err))
  }

  const handleCardDelete = (card) => {
    const token = localStorage.getItem('token')
    api.deleteCard(card._id, token)
      .then(res => {
        setCards((state) => state.filter((item) => item._id !== card._id && item));
      })
      .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    const token = localStorage.getItem('token')
    api.addCard(name, link, token)
      .then((newCard) => {
        setCards([
          newCard, ...cards
        ])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  const timeOut = () => {
    setTimeout(() => {
      closeAllPopups()
      history.push('/signin')
    }, 3000)
  }

  const handleRegister = ({email, password}) => {
    return auth.register(email, password)
      .then(() => {
        handleInfoRegister()
        timeOut()
      })
      .catch(err => console.log(err))
  }

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          tokenCheck();
        }
      })
      .catch((err) =>  handleInfoTooltip())
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            let email = {
              email: res.email
            }
            setLoggedIn(true);
            setEmail(email);
          }
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  const signOut = () => {
    setCurrentUser({name: '', about: '', link: ''})
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      
      <Header
        email={email}
        signOut={signOut} />
      
      <InfoTooltip
        register={register}
        loggedIn={loggedIn}
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}/>
      <Switch>
        
        <Route path='/signin'>
          <Login handleLogin={handleLogin}/>
        </Route>

        <Route exact path='/signup'>
          <Register
            onInfoTooltip={handleInfoTooltip}
            handleRegister={handleRegister}/>
        </Route>

        <ProtectedRoute exact path='/' loggedIn={loggedIn}>

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}/>

          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}/>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}/>

          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

          <Footer/>

        </ProtectedRoute>

        <Route exact path='/'>
          {loggedIn
            ? <Redirect to='/'/>
            : <Redirect to='/signin'/>}
        </Route>

      </Switch>

    </CurrentUserContext.Provider>
  );
}

export default App;