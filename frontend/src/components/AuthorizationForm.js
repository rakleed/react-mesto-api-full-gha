import React from 'react';
import { Link } from 'react-router-dom';
import useForm from "../hooks/useForm";

function AuthorizationForm({ name, title, button, isLoginSuggestion, submitHandler }) {
  const { values, handleChange } = useForm({email: '', password: ''});

  function handleSubmit(event) {
    event.preventDefault();
    submitHandler(values);
  }

  return (
    <main className="authorization-form">
      <h2 className="authorization-form__title">{title}</h2>
      <form className="authorization-form__form" name={`${name}-form`} onSubmit={handleSubmit}>
        <label className="authorization-form__label">
          <input
            className="authorization-form__input authorization-form__input_title_email"
            type="email"
            name="email"
            id="authorization-form__email"
            placeholder="Email"
            autoComplete="email"
            minLength="6"
            maxLength="50"
            required
            value={values.email ?? ''}
            onChange={handleChange}
          />
          {/* TODO: try to rename input name from  ̀title` to `name` */}
        </label>
        <span className="authorization-form__input-error authorization-form__email-error"></span>
        <label className="authorization-form__label">
          <input
            className="authorization-form__input authorization-form__input_title_password"
            type="password"
            name="password"
            id="authorization-form__password"
            placeholder="Пароль"
            autoComplete="current-password"
            required
            value={values.password ?? ''}
            onChange={handleChange}
          />
        </label>
        <span className="authorization-form__input-error authorization-form__password-error"></span>
        <button className="authorization-form__submit-button" type="submit">{button}</button>
      </form>
      {isLoginSuggestion && <p className="authorization-form__login-suggestion">Уже зарегистрированы? <Link
          to="/sign-in" className="authorization-form__login-link">Войти</Link></p>}
    </main>
  )
}

export default AuthorizationForm;
