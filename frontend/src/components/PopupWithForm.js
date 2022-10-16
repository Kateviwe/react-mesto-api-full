//Компонент для объединения общей разметки у попапов
function PopupWithForm({
    name,
    title,
    functionPopup,
    textButton,
    flag,
    isOpen,
    onClose,
    onSubmit,
    isFormValid,
    children
}) {
    
    return (
        <div className={`popup ${name}-popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className={`popup__exit popup__exit_purpose_${functionPopup}`} type="button" onClick={onClose}></button>
                {/* name в форме: в работе mesto (js) и в данной работе (react) не совпадают (поменяла) */}
                <form className={`popup__inner popup__inner_purpose_${functionPopup}`} name={name} onSubmit={onSubmit} noValidate>
                    <h2 className={`popup__heading ${flag ? `popup__heading_purpose_${functionPopup}` : ''}`}>{title}</h2>
                    {children}
                    <button className={`popup__button popup__button_purpose_${functionPopup} ${!isFormValid && 'popup__button_disabled'}`} disabled={!isFormValid} type="submit">{textButton}</button>
                </form>
                <div className={`popup__overlay popup__overlay_purpose_${functionPopup}`}></div> 
            </div>
        </div>
    );
}

export default PopupWithForm;