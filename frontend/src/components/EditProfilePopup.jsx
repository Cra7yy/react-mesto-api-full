import { useState, useContext, useEffect } from 'react'

import CurrentUserContext from '../contexts/CurrentUserContext'
import PopupWithForm from "./PopupWithForm"

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser
}) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const context = useContext(CurrentUserContext)

  useEffect(() => {
    setName(context.name)
    setDescription(context.about)
  }, [context, isOpen])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      buttonText='Сохранить'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <input
        id="name-input"
        type="text"
        name="name"
        value={name || ''}
        className="popup__input popup__input_value_name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        onChange={handleNameChange} />
      <span className="name-input-error popup__input-error"></span>
      <input
        id="sign-input"
        type="text"
        name="sign"
        value={description}
        className="popup__input popup__input_value_sign"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        onChange={handleDescriptionChange} />
      <span className="sign-input-error popup__input-error"></span>

    </PopupWithForm>
  )
}

export default EditProfilePopup