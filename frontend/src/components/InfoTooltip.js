import React from 'react';
import okImage from "../images/ok.png";
import notOkImage from "../images/not-ok.png";

export default function InfoTooltip({isOpen, onClose, register, okText, notOkText}) {
    return (
        <section className={`popup popup-info ${isOpen && 'popup_opened'}`}>
            <div className="popup-info__container">
                <button
                    className="popup__close popup-info__close"
                    type="button"
                    aria-label="Закрыть"
                    title="Закрыть"
                    onClick={onClose}
                />
                <img
                    className='popup-info__icon'
                    src={register ? okImage : notOkImage}
                    alt={register ? 'Успех' : 'Неудача'}
                />
                <p className='popup-info__text'>
                    {register
                        ? okText
                        : notOkText
                    }
                </p>
            </div>
        </section>
    )
}