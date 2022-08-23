import React from 'react';
import edit from "../images/edit.png";
import editButton from "../images/Edit_Button.svg";
import plusButton from "../images/plus_button.svg";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__profile-info">
                    <div
                        className="profile__avatar-container"
                        onClick={onEditAvatar}
                    >
                        <img
                            className="profile__avatar"
                            src={currentUser.avatar}
                            alt="Аватар"
                        />
                        <div className="profile__edit-background"/>
                        <img
                            className="profile__avatar-edit"
                            src={edit} alt="Изменить"
                            title="Изменить аватар"
                        />
                    </div>
                    <div className="profile__profile-info-text">
                        <div className="profile__name-with-edit-button">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать"
                                title="Редактировать"
                                onClick={onEditProfile}
                            >
                                <img
                                    src={editButton}
                                    className="profile__edit-button-image"
                                    alt="Редактировать"
                                />
                            </button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить фото"
                    title="Добавить фото"
                    onClick={onAddPlace}
                >
                    <img
                        className="profile__add-button-image"
                        src={plusButton}
                        alt="Добавить"
                    />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {Array.from(cards).map(function(card) {
                        return (<li key={card._id}>
                                    <Card
                                        cardInfo={card}
                                        cardLikes={card.likes}
                                        onCardClick={onCardClick}
                                        onCardLike={onCardLike}
                                        onCardDelete={onCardDelete}
                                    />
                                </li>
                            );
                        }
                    )}
                </ul>
            </section>
            <section className="popup popup-confirm">
                <form className="popup__form popup-confirm__form">
                    <button
                        className="popup__close popup-confirm__close"
                        type="button"
                        aria-label="Закрыть"
                        title="Закрыть"
                    />
                    <h2 className="popup-confirm__title">Вы уверены?</h2>
                    <button className="popup-confirm__button popup__save-button">Да</button>
                </form>
            </section>
        </main>
    );
}

export default Main;