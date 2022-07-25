import { useContext } from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext"

const Card = ({
  card,
  onCardClick,
  onCardLike,
  onCardDelete
}) => {

  const context = useContext(CurrentUserContext)
  const isOwn = card.owner === context._id
  const isLiked = card.likes.some(i => i === context._id)

  return (
    <div key={card._id} className="grid-element">
      <button
        type="button"
        className={`grid-element__remove ${isOwn ? 'grid-element__remove-visible' : ''}`}
        onClick={() => onCardDelete(card)}></button>
      <img src={card.link} alt={card.name} className="grid-element__img" onClick={() => onCardClick(card)} />
      <div className="grid-element__sign">
        <h2 className="grid-element__title">{card.name}</h2>
        <div className="grid-element__likes">
          <button
            type="button"
            className={`grid-element__like ${isLiked ? 'grid-element__like_action' : ''}`}
            onClick={() => onCardLike(card)}></button>
          <span className="grid-element__span-like">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card