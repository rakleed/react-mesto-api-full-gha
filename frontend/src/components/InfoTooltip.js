import React from 'react';
import successIcon from '../images/success-icon.svg';
import failedIcon from '../images/failed-icon.svg';
import usePopupClose from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  usePopupClose(isOpen, onClose);

  return (
    <dialog className={`popup tooltip-popup${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container tooltip-popup__container">
        <img
          className="tooltip-popup__status-icon"
          src={isSuccess ? successIcon : failedIcon}
          alt={isSuccess ? "Иконка успешной регистрации" : "Иконка неудачной регистрации"}
        />
        <h2 className="popup__title tooltip-popup__title">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
    </dialog>
  )
}

export default InfoTooltip;
