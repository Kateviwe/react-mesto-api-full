import React from 'react';

//Импорт объекта контекста
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
    card,
    cards,
    nameCard,
    likesCard,
    linkCard,
    onSelectedCardClick,
    onCardLike,
    onCardDelete
}) {

    //Подпишемся на контекст CurrentUserContext
    const currentUserInfoContext = React.useContext(CurrentUserContext);
    
    //При клике на карточку она должна открыться на "весь" экран (нам надо знать, какую карточку открывать)
    function handleClick() {
        onSelectedCardClick(card);
    }
    //Обработчик клика по лайку
    function handleLikeClick() {
        onCardLike(card);
    }
    //Обработчик клика по урне карточки для ее удаления
    function handleDeleteClick() {
        onCardDelete(card);
    }

    //Определим, является ли текущий пользователь владельцем карточки
    const isOwn = card.owner._id === currentUserInfoContext._id;
    //Проверим, стоит ли лайк на карточке от текущего пользователя (исходное состояние)
    const isLiked = card.likes.some(elementLikesArrayCard => elementLikesArrayCard._id === currentUserInfoContext._id);
    //Создадим переменные, которые будут отвечать за класс у урны и лайка карточки соответственно
    const cardDeleteButtonClassName = `photogrid__urn ${isOwn ? 'photogrid__urn_visible' : 'photogrid__urn_hidden'}`;
    const cardLikeButtonClassName = `photogrid__like ${isLiked && 'photogrid__like_active'}`;
    
    return (
        <div className="photogrid__item">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <img className="photogrid__image" src={linkCard} alt={nameCard} onClick={handleClick} />
            <div className="photogrid__sign">
                <h2 className="photogrid__heading">{nameCard}</h2>
                <div className="photogrid__like-section">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <h3 className="photogrid__like-number">{likesCard.length}</h3>
                </div>
            </div>
        </div>
    );
}

export default Card;