import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace
}) {

    const [newCardName, setNewCardName] = React.useState('');
    const [newCardLink, setNewCardLink] = React.useState('');

    const [isTitleValid, setIsTitleValid] = React.useState(false);
    const [isLinkValid, setIsLinkValid] = React.useState(false);

    const [textTitleError, setTextTitleError] = React.useState('');
    const [textLinkError, setTextLinkError] = React.useState('');

    //Валидация всей формы на основе данных valid с инпутов
    const [isFormValid, setIsFormValid] = React.useState(false);

    function handleNameNewCard(e) {
        const input = e.target;
        setNewCardName(input.value);
        setIsTitleValid(input.validity.valid);
        setTextTitleError(input.validity.valid ? '' : input.validationMessage);
    }
    function handleLinkNewCard(e) {
        const input = e.target;
        setNewCardLink(input.value);
        setIsLinkValid(input.validity.valid);
        setTextLinkError(input.validity.valid ? '' : input.validationMessage);
    }

    function handleSubmit(e) {
        //Предотвращаем стандартное поведение браузера: переход по адресу формы
        e.preventDefault();

        onAddPlace({
            nameCard: newCardName,
            linkCard: newCardLink
        });
    }

    React.useEffect(() => {
        if (!isOpen) {
            setNewCardName('');
            setNewCardLink('');
            setTextTitleError('');
            setTextLinkError('');
            setIsFormValid(false);
        }
    }, [isOpen]);

    //Валидация всей формы на основе данных valid с инпутов
    React.useEffect(() => {
        (isTitleValid && isLinkValid) ? setIsFormValid(true) : setIsFormValid(false);
    }, [isTitleValid, isLinkValid]);
    
    return (
        <PopupWithForm
            name="adding"
            title="Новое место"
            functionPopup="add"
            textButton="Создать"
            flag={false}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
        >
            <fieldset className="popup__user-info">
                <input
                    id="title-input"
                    value={newCardName}
                    onChange={handleNameNewCard}
                    className="popup__text popup__text_purpose_title"
                    type="text"
                    name="title"
                    placeholder="Название"
                    required 
                    minLength="2"
                    maxLength="30"
                />
                <span className={`popup__text-error title-input-error ${!isTitleValid && 'popup__text-error_visible'}`}>{textTitleError}</span>
                <input
                    id="src-input"
                    value={newCardLink}
                    onChange={handleLinkNewCard}
                    className="popup__text popup__text_purpose_src"
                    type="url"
                    name="src"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className={`popup__text-error src-input-error ${!isLinkValid && 'popup__text-error_visible'}`}>{textLinkError}</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;