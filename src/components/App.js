import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/api"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import unionСross from "../images/unionСross.svg"
import unionСheckmark from "../images/unionСheckmark.svg"
import ProtectedRoute from "./ProtectedRoute ";
import * as auth from "../utils/auth"

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isInfoTooltipСheckmark, setIsInfoTooltipСheckmark] = React.useState(false);
  const [isInfoTooltipCross, setIsInfoTooltipCross] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [card, setCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      const promises = [api.getInitialCards(), api.getUserInformation()];

      Promise.all(promises)
        .then(([cardsData, userData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.chekToken(jwt)
        .then((dataUser) => {
          if (dataUser) {
            setLoggedIn(true);
            setUserEmail(dataUser.data.email);
            navigate("/", { replace: true });
          }
        })
    }
  }, [navigate])

  function handleAddPlaceSubmit(card) {

    setIsLoading(true);

    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //постановка и снятие лайка 
  function handleCardLike(card) {
    // проверяем есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(currentUser) {

    setIsLoading(true);

    api.setUserInfo(currentUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(currentUser) {

    setIsLoading(true);

    api.setUserAvatar(currentUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleConfirmationClick(card) {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setCard(card);
  }

  //удаление карточки
  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipСheckmark(false);
    setIsInfoTooltipCross(false);
    setSelectedCard({});
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleInfoTooltipСheckmark() {
    setIsInfoTooltipСheckmark(true);
  }
  function handleInfoTooltipCross() {
    setIsInfoTooltipCross(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="wrapper">

          <Routes>
            <Route path="/" element={
              <>
                <Header userEmail={userEmail} textLink="Выйти" route="/sign-in" />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleEditAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleConfirmationClick}
                  onCardLike={handleCardLike}
                />
              </>
            }
            />
            <Route path="/sign-up" element={
              <>
                <Header userEmail="" textLink="Войти" route="/sign-in" />
                <Register handleInfoTooltipСheckmark={handleInfoTooltipСheckmark} handleInfoTooltipCross={handleInfoTooltipCross} />
              </>
            } />
            <Route path="/sign-in" element={
              <>
                <Header userEmail="" textLink="Регистрация" route="/sign-up" />
                <Login handleLogin={handleLogin} handleInfoTooltipCross={handleInfoTooltipCross} />
              </>
            } />
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonName={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonName={isLoading ? "Создание..." : "Созать"}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={card}
        />
        <InfoTooltip isOpen={isInfoTooltipСheckmark} onClose={closeAllPopups} link={unionСheckmark} title="Вы успешно зарегистрировались!" />
        <InfoTooltip isOpen={isInfoTooltipCross} onClose={closeAllPopups} link={unionСross} title="Что-то пошло не так!Попробуйте ещё раз." />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;