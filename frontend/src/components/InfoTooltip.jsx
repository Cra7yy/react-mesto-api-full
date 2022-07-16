import good from '../images/true.svg'
import notGood from '../images/default.svg'

const InfoTooltip = ({ isOpen, onClose, register }) => {

  const text = register ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
  const img = register ? good : notGood

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__registration">
        <button type="button" className="popup__cross" onClick={onClose}></button>
        <img src={img} alt='картинка' className="popup__img"/>
        <p className="popup__text">{text}</p>
      </div>
    </div>
  )
}

export default InfoTooltip