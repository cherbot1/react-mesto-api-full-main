import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });

        /* Очищение инпута после сабмита */
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            name = 'change-avatar'
            title = 'Обновить аватар'
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
        >
            <input
                type="url"
                id='avatar-url-input'
                className="popup__input popup-change-avatar__input popup-change-avatar__input_link"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                required
            />
            <span
                id='avatar-url-input-error'
                className="url-input-error popup__input-error popup-change-avatar__input-error popup__input-error_hidden"
            />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;