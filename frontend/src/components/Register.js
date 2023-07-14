import React from 'react';
import AuthorizationForm from './AuthorizationForm';

function Register({submitHandler}) {
  return (
    <AuthorizationForm
      name="register"
      title="Регистрация"
      button="Зарегистрироваться"
      isLoginSuggestion={true}
      submitHandler={submitHandler}
    />
  )
}

export default Register;
