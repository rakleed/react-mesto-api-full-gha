import usePopupClose from '../hooks/usePopupClose';

function PopupWithForm({name, title, button, children, isOpen, onSubmit, onClose}) {
  usePopupClose(isOpen, onClose);

  return (
    <dialog className={`popup ${name}-popup${isOpen ? ' popup_opened' : ''}`}>
      <div className={`popup__container ${name}-popup__container`}>
        <h2 className={`popup__title ${name}-popup__title`}>{title}</h2>
        <form className={`popup__form ${name}-popup__form`} name={`${name}-form`} onSubmit={onSubmit}>
          {/* add noValidate for the form when restore custom validation */}
          {children}
          <button className="popup__submit-button" type="submit">{button}</button>
        </form>
        <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
    </dialog>
  )
}

export default PopupWithForm;
