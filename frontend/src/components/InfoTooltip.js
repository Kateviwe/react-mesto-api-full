import iconRegisteredOk from '../images/popup-image-tooltip-ok.svg';
import iconRegisteredError from '../images/popup-image-tooltip-error.svg';

function InfoTooltip({
  isOpen,
  onClose,
  registeredIn,
  isRegisteringNow
}) {

  const textRegisteredOk = 'Вы успешно зарегистрировались!';
  const textRegisteredError = 'Что-то пошло не так! Попробуйте ещё раз.';

  return (

    <div className={`popup ${(isOpen && !isRegisteringNow) && 'popup_opened'}`}>
        <div className="popup__container">
            <button className="popup__exit" type="button" onClick={onClose}></button>
            {registeredIn
              ? (<img className="popup__image-tooltip" src={iconRegisteredOk} alt={textRegisteredOk} />)
              : (<img className="popup__image-tooltip" src={iconRegisteredError} alt={textRegisteredError} />)
            }
            {registeredIn
              ? (<h2 className="popup__text-tooltip">{textRegisteredOk}</h2>)
              : (<h2 className="popup__text-tooltip">{textRegisteredError}</h2>)
            }
        </div>
    </div>
  )
}

export default InfoTooltip;