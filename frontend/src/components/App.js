import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import * as Auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Auth.checkToken(token).then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
        .then(res => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", {replace: true})
        })
        .catch(() => {
          setIsLoggedIn(false);
          navigate("/sign-in", {replace: true});
        })
    }
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card['likes'].some(item => item['_id'] === currentUser['_id']);

    api.changeLikeCardStatus(card['_id'], isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c['_id'] === card['_id'] ? newCard : c));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api.removeCard(card['_id'])
      .then(() =>
        setCards((state) => state.filter((c) => c['_id'] === card['_id'] ? '' : c)))
      .catch(console.error);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleAvatarFormSubmit(inputValues) {
    function makeRequest() {
      return api.setUserAvatar(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleProfileFormSubmit(inputValues) {
    function makeRequest() {
      return api.setUserInfo(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceFormSubmit(inputValues) {
    function makeRequest() {
      return api.sendNewCard(inputValues).then(res => setCards([res, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  function handleRegister(values) {
    Auth.register(values)
      .then((res) => {
        if (res.ok) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          setTimeout(() => navigate('/sign-in', {replace: true}), 2000);
        }
        else if (res.status === 400) {
          setIsSuccess(false);
          console.log('400: некорректно заполнено одно из полей');
          setIsInfoTooltipPopupOpen(true);
        }
      })
      .catch(console.error);
  }

  function handleLogin(values) {
    Auth.authorize(values)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then(data => {
        if (data['token']) {
          localStorage.setItem('token', data['token']);
          setEmail(values.email);
          setIsLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setEmail('');
    setIsLoggedIn(false);
  }

  return (
    <AppContext.Provider value={{isLoading, closeAllPopups}}>
      <CurrentUserContext.Provider value={currentUser}>

        <Header onSignOut={handleSignOut} email={email} />

        <Routes>
          <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/sign-up" element={
            <>
              <Register submitHandler={handleRegister} />
              <InfoTooltip isOpen={isInfoTooltipPopupOpen} isSuccess={isSuccess} onClose={closeAllPopups} />
            </>
          } />
          <Route path="/sign-in" element={<Login submitHandler={handleLogin} />} />

          <Route path="/" element={<ProtectedRoute
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={isLoggedIn}
          />} />


          {/*<Route path="/" element={*/}
          {/*  <>*/}
          {/*    <Main*/}
          {/*      onEditAvatar={handleEditAvatarClick}*/}
          {/*      onEditProfile={handleEditProfileClick}*/}
          {/*      onAddPlace={handleAddPlaceClick}*/}
          {/*      onCardClick={handleCardClick}*/}
          {/*      onCardLike={handleCardLike}*/}
          {/*      onCardDelete={handleCardDelete}*/}
          {/*      cards={cards}*/}
          {/*    />*/}

          {/*    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleAvatarFormSubmit} />*/}

          {/*    <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleProfileFormSubmit} />*/}

          {/*    <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceFormSubmit} />*/}

          {/*    <ImagePopup card={selectedCard} onClose={closeAllPopups} />*/}
          {/*  </>*/}
          {/*} />*/}
        </Routes>

        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleAvatarFormSubmit} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleProfileFormSubmit} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceFormSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
