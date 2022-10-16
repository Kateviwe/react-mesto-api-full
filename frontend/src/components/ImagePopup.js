function ImagePopup({
    card,
    onClose
}) {
    return (
        <div className={`popup viewing-popup ${card ? 'popup_opened' : ''}`}>
            <div className="popup__bag">
                <button className="popup__exit popup__exit_purpose_view" type="button" onClick={onClose}></button>
                <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
                <h2 className="popup__title">{card ? card.name : ''}</h2>
                {/* Поставили доп. условие (card !== null && ...), чтобы он не пытался считать значение свойства у null (будет ошибка тогда)
                Но в случае с null подставится значение false вместо, например, {card !== null && card.name}
                Чтобы такого не было, лучше подставлять пустую строку, например, ${card ? card.name : ''}, еще card !== null заменили на card*/}
            </div>
            <div className="popup__overlay popup__overlay_purpose_view"></div> 
        </div>
    );
}

export default ImagePopup;