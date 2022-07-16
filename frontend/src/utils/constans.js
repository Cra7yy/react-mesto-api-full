const validationConfig = {
  popupSubmitAction: 'popup__submit_action',
  popupSubmit: '.popup__submit',
  popupInput: '.popup__input',
  popupInputErrorAction: 'popup__input-error_action',
  popupInputTypeError: 'popup__input_type_error'
}

const profileEditor = document.querySelector('.profile__editor')
const profileMesto = document.querySelector('.profile__mesto')
const popupInputValueName = document.querySelector('.popup__input_value_name')
const popupInputValueSign = document.querySelector('.popup__input_value_sign')
const profileImgShadow = document.querySelector('.profile__img-shadow')

export {
  validationConfig,
  profileEditor,
  profileMesto,
  popupInputValueName,
  popupInputValueSign,
  profileImgShadow
}

