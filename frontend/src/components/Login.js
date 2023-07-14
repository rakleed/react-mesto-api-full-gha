import React from 'react';
import AuthorizationForm from './AuthorizationForm';

function Login({submitHandler}) {
  return (
    <AuthorizationForm
      name="login"
      title="Вход"
      button="Войти"
      isLoginSuggestion={false}
      submitHandler={submitHandler}
    />
  )
}

export default Login;
