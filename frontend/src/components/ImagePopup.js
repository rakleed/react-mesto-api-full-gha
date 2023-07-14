import usePopupClose from '../hooks/usePopupClose';

function ImagePopup({ card, onClose }) {
  usePopupClose(card, onClose);

  return (
    <dialog className={`popup view-image-popup${card ? ' popup_opened' : ''}`}>
      <div className="popup__container view-image-popup__container">
        <img className="view-image-popup__picture" src={card ? card.link : ''} alt="Фото места" />
        <p className="view-image-popup__caption">{card ? card.name : ''}</p>
        <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
    </dialog>
  )
}

export default ImagePopup;
