import React from 'react';

//Импорт "заготовки" карточки
import Card from './Card';

//Импорт объекта контекста
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete
}) {

    //Подпишемся на контекст CurrentUserContext
    const currentUserInfoContext = React.useContext(CurrentUserContext);

    //Вынесли маппинг из JSX разметки в сам компонент для повышения читабельности кода
    const cardsElements = cards.map(card => 
        <li key={card._id}>
            <Card
                card={card}
                cards={cards}
                nameCard={card.name}
                likesCard={card.likes}
                linkCard={card.link}
                key={card._id}
                onSelectedCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
            />
        </li>
    );
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper">
                    <img className="profile__avatar" src={currentUserInfoContext.avatar} alt="Аватар профиля пользователя." />
                    <button className="profile__icon-edit" type="button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__local-info">
                        <h1 className="profile__name">{currentUserInfoContext.name}</h1>
                        <button className="profile__button profile__button_purpose_edit" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__characteristic">{currentUserInfoContext.about}</p>
                </div>
                <button className="profile__button profile__button_purpose_add" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="photogrid">
                <ul className="photogrid__container">
                    {cardsElements}
                </ul>
            </section>
        </main>
    );
}

export default Main;