import React from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  React.useEffect(() => {
    avatarRef.current['value'] = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current['value']
    });
  }

  return (
    <PopupWithForm
      name='update'
      title='Обновить аватар'
      button={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={closeAllPopups}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_title_link"
          type="url"
          name="link"
          id="update-popup__link"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
      </label>
      <span className="update-popup__link-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
