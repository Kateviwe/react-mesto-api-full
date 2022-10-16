import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';

//Импортируем HOC
import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

//Блоки(части) страницы
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

//Работа с попапами
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

//Импорт экземпляра класса Api (работа с сервером)
import { api } from '../utils/api';

//Импорт объекта контекста
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//Основной компонент
function App() {
    //Хуки, отвечающие за видимость 4 попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
    
    //Стейт-переменная, отвечающая за просматриваемую карточку
    const [selectedCard, setSelectedCard] = React.useState(null);
    //В случае с объектами null в качестве начального состояния допускается, а selectedCard у нас - объект
    //Тогда состояние открытого imagePopup можно вычислять как selectedCard !== null

    //Создадим глобальный стейт currentUser с помощью React Context, который встроен в библиотеку React.js
    //Создадим стейт-переменную, отвечающую за данные текущего пользователя
    const [currentUser, setCurrentUser] = React.useState({});
    //Создадим стейт-переменную, отвечающую за авторизацию текущего пользователя
    const [loggedIn, setLoggedIn] = React.useState(false);
    //Создадим стейт-переменную, отвечающую за успешную/неуспешную регистрацию текущего пользователя
    const [registeredIn, setRegisteredIn] = React.useState(false);
    //Создадим стейт-переменную, отвечающую меняет ли свое состояние registeredIn в данный момент
    const [isRegisteringNow, setIsRegisteringNow] = React.useState(false);
    //Создадим стейт-переменную, отвечающую за загрузку данных на попапе прежде, чем он откроется
    const [currentEmail, setCurrentEmail] = React.useState('');
    const history = useHistory();


    //Создадим эффект при монтировании: переопределение стейт-переменной currentUser
    React.useEffect(() => {
        api.getInfoFromServer()
            .then((userInfoObject) => {
                setCurrentUser(userInfoObject);
            })
            .catch((err) => console.log(err))
    }, []); //[] - массив с переменными, изменение хотя бы 1 из которых должно провоцировать выполнение хука (зависимости)
            //У нас массив пустой, следовательно, такой эффект будет вызван всего один раз (монтирование)

    //Переменная состояния (стейта)
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getCardsFromServer()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch((err) => console.log(err))
    }, []); //[] - массив с переменными, изменение хотя бы 1 из которых должно провоцировать выполнение хука (зависимости)
            //У нас массив пустой, следовательно, такой эффект будет вызван всего один раз (монтирование)
    
    function handleCardLike(card) {
        //Проверим, есть ли уже лайк на данной карточке
        const isLiked = card.likes.some(elementLikesArrayCard => elementLikesArrayCard._id === currentUser._id);
        //Создаем запрос в API и получаем обновлённые данные карточки
        if (isLiked) {
            api.deleteLikeCard(card._id)
                .then((newCard) => {
                    setCards(initialArr => {
                        return initialArr.map(itemCard => (itemCard._id === card._id ? newCard : itemCard));
                    });
                })
                .catch((err) => console.log(err)); 
        } else {
            api.putLikeCard(card._id)
                .then((newCard) => {
                    setCards(initialArr => {
                        return initialArr.map(itemCard => (itemCard._id === card._id ? newCard : itemCard));
                    });
                })
                .catch((err) => console.log(err)); 
        };
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(initialArr => {
                    return initialArr.filter(itemCard => (itemCard._id !== card._id));
                });
            })
            .catch((err) => console.log(err)); 
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleFormClick() {
        setIsTooltipPopupOpen(true);  
    }
    
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsTooltipPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.changeUserAvatar(data)
            .then((newData) => {
                setCurrentUser(newData);
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(cardObject) {
        api.addNewCard(cardObject)
            .then((newCardObject) => {
                setCards([newCardObject, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function checkToken() {
        //Проверка наличия у пользователя токена
        if(localStorage.getItem('token')) {
            const jwt = localStorage.getItem('token');
            auth.getContentFromToken(jwt)
            .then((res) => {
                if(res) {
                    setLoggedIn(true);
                    setCurrentEmail(res.data.email);
                    history.push('/');
                }
            })
            .catch((err) => console.log(err));
        }
    }

    React.useEffect(() => {
        checkToken();
    }, []);

    function getRegisteredIn() {
        setRegisteredIn(true);
    }

    function rejectRegisteredIn() {
        setRegisteredIn(false);
    }

    function handleLoggedIn() {
        setLoggedIn(true);
        checkToken();
    }

    function handleLoggedOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Header
                        loggedIn = {loggedIn}
                        email={currentEmail}
                        onSignOut = {handleLoggedOut}
                    />
                    <Switch>
                        <Route path="/sign-in">
                            <Login
                                onLogin = {handleLoggedIn}
                                handleAuthFormClick={handleFormClick}
                                rejectRegisteredIn={rejectRegisteredIn}
                            />
                        </Route>
                        <Route path="/sign-up">
                            <Register
                                onRegister={getRegisteredIn}
                                rejectRegisteredIn={rejectRegisteredIn}
                                handleRegisterFormClick={handleFormClick}
                                setIsRegisteringNow={setIsRegisteringNow}
                            />
                        </Route>
                        <ProtectedRoute exact path="/"
                            component={Main}
                            loggedIn = {loggedIn}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                        <Route path="*">
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                    </Switch>
                    <Footer />
                    <InfoTooltip
                        isOpen={isTooltipPopupOpen}
                        onClose={closeAllPopups}
                        registeredIn={registeredIn}
                        isRegisteringNow={isRegisteringNow}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    <PopupWithForm 
                        name="delete-confirmation"
                        title="Вы уверены?"
                        functionPopup="confirm"
                        textButton="Да"
                        flag={true}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                </div>    
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
