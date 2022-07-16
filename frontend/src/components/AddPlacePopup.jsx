import { useState, useEffect } from 'react'

import PopupWithForm from './PopupWithForm'

const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlace
}) => {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onAddPlace({ name, link })
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm
      title='Новое место'
      name='mesto'
      buttonText='Сохранить'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <input
        id="title-input"
        type="text"
        name="title"
        value={name}
        className="popup__input popup__input_value_mesto"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleNameChange} />
      <span className="title-input-error popup__input-error"></span>
      <input
        id="src-input"
        type="url"
        name="src"
        value={link}
        className="popup__input popup__input_value_src"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange} />
      <span className="src-input-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup