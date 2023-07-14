import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>

      <section className="profile">
        <div className="profile__wrapper-avatar">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
          <button className="profile__button-update-avatar" type="button" onClick={onEditAvatar} />
          <div className="profile__wrapper-about">
            <div className="profile__wrapper-button">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>

      <section className="cards">
        <ul className="cards__list">
          {
            cards.map(card => {
              return (
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  key={card['_id']}
                />
              )
            })
          }
        </ul>
      </section>

    </main>
  )
}

export default Main;
