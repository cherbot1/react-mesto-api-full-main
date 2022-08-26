import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/api";
import {authorize, getContent, register} from '../utils/mestoAuth'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [registered, setRegistered] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setIsLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('blob@blob.com');
    const history = useHistory();

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt){
            getContent(jwt).then((user) => {
                if (user) {
                    setIsLoggedIn(true);
                    setUserEmail(user.data.email);
                    history.push('/');
                }
            })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    React.useEffect(() => {
        if (loggedIn) {
            api.getUserInfo().then((user) => {
                setCurrentUser(user.data);
            })
                .catch((err) => {
                    console.log(err);
                });

            api.getCardsInfo().then((cardInfo) => {
                setCards(cardInfo.data.reverse());
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    /* Обработка входа */
    function handleLogin({password, email}) {
        authorize(password, email).then((data) => {
            if (data) {
                localStorage.setItem("jwt", data.token);
                console.log(localStorage.getItem('jwt'));
                setIsLoggedIn(true);
                setUserEmail(email);
                history.push('/');
            }
        })
            .catch((err) => {
                setIsLoggedIn(false);
                setRegistered(false);
                setIsInfoTooltipOpen(true);
                console.log(err);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) =>
                        c._id === card._id ? newCard.data : c));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleCardDelete(id){
        api.deleteCard(id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
    }

    function handleUpdateUser(newData) {
        api.changeUserInfo(newData).then((user) => {
            setCurrentUser(user.data);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(newData) {
        api.changeAvatar(newData).then((avatar) => {
            setCurrentUser(avatar.data);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data).then((newCard) => {
            setCards([newCard.data, ...cards]);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    /* Обработка регистрации */
    function handleRegister({password, email}) {
        register(password, email).then((res) => {
            if (res) {
                setRegistered(true);
                history.push('/sign-in');
            }
        })
            .catch((err) => {
                setRegistered(false);
                console.log(err);
            })
            .finally(() => {
            setIsInfoTooltipOpen(true);
        })
    }

    /* Обработка выхода */
    function handleSignOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('/sign-in');
    }



    return (
       <CurrentUserContext.Provider value={currentUser}>
           <div className="App">
               <Header
                   email={userEmail}
                   onSignOut={handleSignOut}
               />

               <Switch>
                   <ProtectedRoute
                       exact path = '/'
                       component={Main}
                       loggedIn={loggedIn}
                       onEditAvatar = {handleEditAvatarClick}
                       onEditProfile = {handleEditProfileClick}
                       onAddPlace = {handleAddPlaceClick}
                       onCardClick = {handleCardClick}
                       cards = {cards}
                       onCardLike = {handleCardLike}
                       onCardDelete = {handleCardDelete}
                   />

                   <Route path='/sign-up'>
                       <Register
                           onSubmit={handleRegister}
                       />
                   </Route>

                   <Route path='/sign-in'>
                       <Login
                           onSubmit={handleLogin}
                       />
                   </Route>

                   <Route>
                       {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                   </Route>
               </Switch>

               <Footer />

               <EditProfilePopup
                   isOpen = {isEditProfilePopupOpen}
                   onClose = {closeAllPopups}
                   onUpdateUser = {handleUpdateUser}
               />

               <AddPlacePopup
                   isOpen = {isAddPlacePopupOpen}
                   onClose = {closeAllPopups}
                   onAddPlace = {handleAddPlaceSubmit}
               />

               <EditAvatarPopup
                   isOpen = {isEditAvatarPopupOpen}
                   onClose = {closeAllPopups}
                   onUpdateAvatar = {handleUpdateAvatar}
               />

               <ImagePopup
                   card = {selectedCard}
                   onClose = {closeAllPopups}
               />

               <InfoTooltip
                   isOpen = {isInfoTooltipOpen}
                   onClose = {closeAllPopups}
                   register = {registered}
                   okText={'Вы успешно зарегистрировались!'}
                   notOkText={'Что-то пошло не так! Попробуйте ещё раз.'}
               />
           </div>
       </CurrentUserContext.Provider>
  );
}

export default App;
