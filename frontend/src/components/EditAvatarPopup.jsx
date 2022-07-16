import { useRef, useEffect } from 'react'

import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar
}) => {

  const avatarLink = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    onUpdateAvatar({
      avatar: avatarLink.current.value
    })
  }

  useEffect(() => {
    avatarLink.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      buttonText='Сохранить'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <input
        id="avatar-input"
        type="url"
        name="avatar"
        className="popup__input popup__input_value_avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarLink} />
      <span className="avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup