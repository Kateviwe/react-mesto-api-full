import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Register({
    onRegister,
    rejectRegisteredIn,
    handleRegisterFormClick,
    setIsRegisteringNow
}) {

    //Добавим управляемые компоненты (элементы формы), связав их со стейт-переменными email и password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);

    const [textEmailError, setTextEmailError] = React.useState('');
    const [textPasswordError, setTextPasswordError] = React.useState('');

    //Валидация всей формы на основе данных valid с инпутов
    const [isFormValid, setIsFormValid] = React.useState(false);
    const history = useHistory();

    // Обработчики изменения инпутов обновляют стейты
    function handleEmailChange(e) {
        const input = e.target;
        setEmail(input.value);
        setIsEmailValid(input.validity.valid);
        setTextEmailError(input.validity.valid ? '' : input.validationMessage);
    }
    function handlePasswordChange(e) {
        const input = e.target;
        setPassword(input.value);
        setIsPasswordValid(input.validity.valid);
        setTextPasswordError(input.validity.valid ? '' : input.validationMessage);
    }

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        auth.register(email, password)
        .then((res) => {
            setIsRegisteringNow(true);
            if(res) {
                onRegister();
                setIsRegisteringNow(false);
                handleRegisterFormClick();
                history.push('/sign-in');
            }
            else {
                rejectRegisteredIn();
            }
        })
        .catch((err) => {
            setIsRegisteringNow(false);
            rejectRegisteredIn();
            handleRegisterFormClick();
            console.log(err);
        });
    }

    //Валидация всей формы на основе данных valid с инпутов
    React.useEffect(() => {
        (isEmailValid && isPasswordValid && email !== '' && password !== '') ? setIsFormValid(true) : setIsFormValid(false);
    }, [isEmailValid, isPasswordValid, email, password]);

    React.useEffect(() => {
        setIsFormValid(false);
    }, []);

    return (
        <form className="form" onSubmit={handleRegisterFormSubmit}>
            <h2 className="form__header">Регистрация</h2>
            <fieldset className="form__container">
                <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <span className={`form__span ${!isEmailValid && 'form__span_visible'}`}>{textEmailError}</span>
                <input
                    className="form__input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength="3"
                />
                <span className={`form__span ${!isPasswordValid && 'form__span_visible'}`}>{textPasswordError}</span>
            </fieldset>
            <button className={`form__button ${!isFormValid && 'form__button_disabled'}`} disabled={!isFormValid} type="submit">Зарегистрироваться</button>
            <h3 className="form__text">Уже зарегистрированы?
                <Link to="/sign-in" className="form__link"> Войти</Link>
            </h3>
        </form>
    );
}

export default Register;