import React from 'react';
import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({});
  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  React.useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({ title: values.title, link: values.link })
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      button={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={closeAllPopups}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_title_title"
          type="text"
          name="title"
          id="add-popup__title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values.title ?? ''}
          onChange={handleChange}
        />
        {/* TODO: try to rename input name from  ̀title` to `name` */}
      </label>
      <span className="add-popup__title-error popup__input-error"></span>
      <label className="popup__label">
        <input
          className="popup__input popup__input_title_link"
          type="url"
          name="link"
          id="add-popup__link"
          placeholder="Ссылка на картинку"
          required
          value={values.link ?? ''}
          onChange={handleChange}
        />
      </label>
      <span className="add-popup__link-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
