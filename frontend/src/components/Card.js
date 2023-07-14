import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const likeCounter = card['likes'].length;

  const isOwn = card['owner']['_id'] === currentUser['_id'];
  const isLiked = card['likes'].some(item => item['_id'] === currentUser['_id']);
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={`Фото ${card.name}`} />
      <button className="card__open-image-button" type="button" onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            className={`card__like-button${isLiked ? ' card__like-button_active' : ''}`}
            type="button"
            onClick={handleLikeClick}
          />
          {likeCounter > 0 && <p className="card__like-counter">{likeCounter}</p>}
        </div>
        {isOwn && <button className="card__trash-button" type="button" onClick={handleDeleteClick} />}
      </div>
    </li>
  )
}

export default Card;
