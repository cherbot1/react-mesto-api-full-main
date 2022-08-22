import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });

        /* Очищение инпутов после сабмита */
        nameRef.current.value = '';
        linkRef.current.value = '';
    }

    return (
        <PopupWithForm
            name = 'add'
            title = 'Новое место'
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
        >
            <input
                type="text"
                id="place-name-input"
                className="popup__input popup-add__input popup-add__input_name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                ref={nameRef}
                required
            />
            <span
                id="place-name-input-error"
                className="place-name-input-error popup__input-error popup__input-error_hidden"
            />
            <input
                type="url"
                id='url-input'
                className="popup__input popup-add__input popup-add__input_link"
                placeholder="Ссылка на картинку"
                ref={linkRef}
                required
            />
            <span
                id='url-input-error'
                className="url-input-error popup__input-error popup__input-error_hidden"
            />
        </PopupWithForm>
    );
}

export default AddPlacePopup;