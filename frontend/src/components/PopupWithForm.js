import React from 'react';

function PopupWithForm({name, onSubmit, onClose, isOpen, title, children}) {
    return (
        <section className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup-${name}__container`}>
                <button
                    className={`popup__close popup-${name}__close`}
                    type="button"
                    aria-label="Закрыть"
                    title="Закрыть"
                    onClick={onClose}
                />
                <form
                    name={`${name}_form`}
                    className={`popup__form popup-${name}__form`}
                    onSubmit={onSubmit}
                >
                    <h2 className={`popup__title popup-${name}__title`}>{title}</h2>
                    {children}
                    <button
                        type="submit"
                        aria-label='Сохранить'
                        className="popup__save-button popup-edit__save-button"
                    >Сохранить</button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;