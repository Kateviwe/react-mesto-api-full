import { Link, useLocation } from 'react-router-dom';

function Header({
    loggedIn,
    email,
    onSignOut
}) {

    const path = useLocation();
    const renderAuthLink = () => {
        if (path.pathname === '/sign-up') {
            return (
                <Link to='/sign-in' className="header__link">
                    Войти
                </Link>
            );
        }
        if (path.pathname === '/sign-in') {
            return (
                <Link to='/sign-up' className="header__link">
                    Регистрация
                </Link>
            );
        }
    };

    if(path.pathname !== '/' && path.pathname !== '/sign-up' && path.pathname !== '/sign-in') {
        return null;
    } else {
        return (
            <header className="header">
                <div className="header__logo"></div>
                <div className="header__container">
                    {loggedIn && (<h2 className="header__email">{email}</h2>)}
                    {loggedIn && (path.pathname === '/' &&
                        <Link
                            to='/sign-in'
                            className="header__link">
                            <button
                                type='button'
                                className="header__button"
                                onClick={onSignOut}
                            >
                                Выйти
                            </button>
                        </Link>
                    )}
                    {!loggedIn && renderAuthLink()}
                </div>
            </header>
        );
    }
}

export default Header;