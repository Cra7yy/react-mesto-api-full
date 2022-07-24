import { useContext } from 'react'

import pen from '../images/pen.svg'
import cross from '../images/cross.svg'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext'

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) => {
  const context = useContext(CurrentUserContext)

  return (
    <main className="main" >
      <section className="profile" >
        <div className="profile__content" >
          <div className="profile__img-container" onClick={onEditAvatar} >
            <img src={context.avatar} alt="фото профиля" className="profile__img" />
            <span className="profile__img-shadow" ></span>
          </div>
          <div className="profile__text-content" >
            <div className="profile__element" >
              <h1 className="profile__title" > {context.name} </h1>
              <button type="button" className="profile__editor" onClick={onEditProfile} >
                <img src={pen} alt="ручка" className="profile__pen" />
              </button>
            </div>
            <p className="profile__subtitle">{context.about}</p>
          </div>
        </div>
        <button type="button"
          className="profile__mesto"
          onClick={onAddPlace} >
          <img src={cross} alt="крест" className="profile__cross" />
        </button>
      </section>
      <section className="grid-conteiner" >
        {cards.map((item) => (<Card
          key={item._id}
          card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />))}
      </section>
    </main>
  )
}

export default Main