import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import useForm from '../hooks/useForm';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});
  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({ name: values.name, about: values.about })
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      button={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={closeAllPopups}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_title_name"
          type="text"
          name="name"
          id="edit-popup__name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={values.name ?? ''}
          onChange={handleChange}
        />
      </label>
      <span className="edit-popup__name-error popup__input-error"></span>
      <label className="popup__label">
        <input
          className="popup__input popup__input_title_about"
          type="text"
          name="about"
          id="edit-popup__about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={values.about ?? ''}
          onChange={handleChange}
        />
      </label>
      <span className="edit-popup__about-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
