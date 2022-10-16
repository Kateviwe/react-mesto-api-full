import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {
    
    //Создадим реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению
    //Избыточно для инпута, но наглядно представлено использование
    const avatarRef = React.useRef();

    const [isAvatarValid, setIsAvatarValid] = React.useState(false);
    const [textAvatarError, setTextAvatarError] = React.useState('');

    //Валидация всей формы на основе данных valid с инпутов
    const [isFormValid, setIsFormValid] = React.useState(false);

    function handleAvatarChange(e) {
        const input = e.target;
        setIsAvatarValid(input.validity.valid);
        setTextAvatarError(input.validity.valid ? '' : input.validationMessage);
        if(input.validity.valid) {
            setIsFormValid(true);
        }
    }

    function clearInputValue() {
        //Сначала закроем все попапы, только после этого очистим инпут формы
        onClose();
        avatarRef.current.value = '';
    }
    
    function handleSubmit(e) {
        //Предотвращаем стандартное поведение браузера: переход по адресу формы
        e.preventDefault();

        // Передаём значение рефа во внешний обработчик
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });

        clearInputValue();
    }

    React.useEffect(() => {
        if (!isOpen) {
            setTextAvatarError('');
            setIsFormValid(false);
        }
    }, [isOpen]);

    //Валидация всей формы на основе данных valid с инпутов
    React.useEffect(() => {
        isAvatarValid ? setIsFormValid(true) : setIsFormValid(false);
    }, [isAvatarValid]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            functionPopup="change-avatar"
            textButton="Сохранить"
            flag={true}
            isOpen={isOpen}
            onClose={clearInputValue}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
        >
            <fieldset className="popup__user-info">
                <input
                    id="avatar-input"
                    ref={avatarRef}
                    className="popup__text popup__text_purpose_change-avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    required
                    onChange={handleAvatarChange}
                />
                <span className={`popup__text-error avatar-input-error ${!isAvatarValid && 'popup__text-error_visible'}`}>{textAvatarError}</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;



