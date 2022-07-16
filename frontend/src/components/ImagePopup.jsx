const ImagePopup = ({ card, onClose }) => {

  const dataCard = ({ ...card })

  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ''}`}>
      <div className="popup-image">
        <button type="button" className="popup__cross popup-image__cross" onClick={onClose} ></button>
        <img className="popup-image__src" src={dataCard.link} alt={dataCard.name} />
        <h2 className="popup-image__name">{dataCard.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup