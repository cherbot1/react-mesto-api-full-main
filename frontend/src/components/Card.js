import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({cardInfo, cardLikes, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = cardInfo.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );
    const isLiked = cardLikes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    function handleClick() {
        onCardClick(cardInfo);
    }

    function handleLikeClick () {
        onCardLike(cardInfo);
    }

    function handleDeleteClick() {
        onCardDelete(cardInfo._id)
    }

    return (
        <div className="element">
            <button
                type="button"
                className={cardDeleteButtonClassName}
                aria-label="Удалить"
                title="Удалить"
                onClick={handleDeleteClick}
            />
            <figure className="element__figure">
                <div className="element__image-wrapper">
                    <img
                        className="element__image"
                        src={cardInfo.link}
                        alt={cardInfo.name}
                        onClick={handleClick}
                    />
                </div>
                <figcaption className="element__figcaption">
                    <h2 className="element__figcaption-text">{cardInfo.name}</h2>
                    <div className="element__like-section">
                        <button
                            type="button"
                            className={cardLikeButtonClassName}
                            aria-label="Нравится"
                            title="Нравится"
                            onClick={handleLikeClick}
                        />
                        <p className="element__like-counter">{cardInfo.likes.length}</p>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default Card;