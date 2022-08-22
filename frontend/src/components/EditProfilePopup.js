import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onUpdateUser, onClose}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        currentUser?.name && setName(currentUser.name);
        currentUser?.about && setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name = 'edit'
            title = 'Редактировать профиль'
            onSubmit = {handleSubmit}
            isOpen = {isOpen}
            onClose = {onClose}
        >
            <input
                type="text"
                id="name-input"
                className="popup__input popup-edit__input popup__input_name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
                required
            />
            <span
                id="name-input-error"
                className="name-input-error popup__input-error popup__input-error_hidden"
            />
            <input
                type="text"
                id="about-input"
                className="popup__input popup-edit__input popup__input_subtitle"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                onChange={handleDescriptionChange}
                value={description}
                required
            />
            <span
                id="about-input-error"
                className="about-input-error popup__input-error popup__input-error_hidden"
            />
        </PopupWithForm>
    );
}

export default EditProfilePopup;