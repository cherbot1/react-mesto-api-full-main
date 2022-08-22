import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <section className={`popup popup-image ${card.link && 'popup_opened'}`}>
            <div className="popup-image__wrapper">
                <button
                    className="popup__close popup-image__close"
                    type="button"
                    aria-label="Закрыть"
                    title="Закрыть"
                    onClick={onClose}
                />
                <img
                    className="popup-image__image"
                    src={card.link}
                    alt={`${card.name}`}
                />
                <p className="popup-image__subtitle">{card.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;