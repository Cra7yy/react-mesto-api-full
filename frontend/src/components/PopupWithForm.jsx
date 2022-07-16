const PopupWithForm = ({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit
}) => {

  return (

    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__cross" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form name={name}
          action="#"
          method="post"
          encType="multipart/form-data"
          className="popup__form popup__form_type_profile"
          noValidate
          onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm