import React from 'react';

import PopupWithForm from './PopupWithForm';

//Импорт объекта контекста
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser
}) {

    //Подпишемся на контекст CurrentUserContext
    const currentUserInfoContext = React.useContext(CurrentUserContext);
    
    //Добавим управляемые компоненты (элементы формы), связав их со стейт-переменными name и description
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [isNameValid, setIsNameValid] = React.useState(true);
    const [isAboutValid, setIsAboutValid] = React.useState(true);

    const [textNameError, setTextNameError] = React.useState('');
    const [textAboutError, setTextAboutError] = React.useState('');

    //Валидация всей формы на основе данных valid с инпутов
    const [isFormValid, setIsFormValid] = React.useState(true);

    // Обработчики изменения инпутов обновляют стейты
    function handleNameChange(e) {
        const input = e.target;
        setName(input.value);
        setIsNameValid(input.validity.valid);
        setTextNameError(input.validity.valid ? '' : input.validationMessage);
    }
    function handleDescriptionChange(e) {
        const input = e.target;
        setDescription(input.value);
        setIsAboutValid(input.validity.valid);
        setTextAboutError(input.validity.valid ? '' : input.validationMessage);
    }

    //Что будет происходить при отправке формы PopupWithForm
    function handleSubmit(e) {
        //Предотвращаем стандартное поведение браузера: переход по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            characteristic: description
        });
    }

    //Создадим эффект, который будет обновлять переменные состояния name и description при изменении контекста
    React.useEffect(() => {
        if (isOpen) {
            setName(currentUserInfoContext.name);
            setDescription(currentUserInfoContext.about);
        }
    }, [currentUserInfoContext, isOpen]); //[] - массив с переменными, изменение хотя бы 1 из которых должно провоцировать выполнение хука (зависимости)

    React.useEffect(() => {
        if (!isOpen) {
            setTextNameError('');
            setTextAboutError('');
            setIsFormValid(true);
        }
    }, [isOpen]);

    //Валидация всей формы на основе данных valid с инпутов
    React.useEffect(() => {
        (isNameValid && isAboutValid) ? setIsFormValid(true) : setIsFormValid(false);
    }, [isNameValid, isAboutValid]);

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            functionPopup="edit"
            textButton="Сохранить"
            flag={false}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
        >
            <fieldset className="popup__user-info">
                <input
                    id="name-input"
                    value={name}
                    onChange={handleNameChange}
                    className="popup__text popup__text_purpose_name"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                />
                <span className={`popup__text-error name-input-error ${!isNameValid && 'popup__text-error_visible'}`}>{textNameError}</span>
                <input
                    id="characteristic-input"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="popup__text popup__text_purpose_characteristic"
                    type="text"
                    name="characteristic"
                    placeholder="Характеристика"
                    required
                    minLength="2"
                    maxLength="200"
                />
                <span className={`popup__text-error characteristic-input-error ${!isAboutValid && 'popup__text-error_visible'}`}>{textAboutError}</span>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;