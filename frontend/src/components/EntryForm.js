import React from 'react';
import {Link, Route} from "react-router-dom";

function EntryForm({name, title, onSubmit, children, buttonText}) {

    return (
        <section className={'entry'}>
            <div className={'entry__main-content'}>
                <h2 className={'entry__title'}>{title}</h2>
                <form
                    name={`${name}_form`}
                    className={`entry__form entry-${name}__form`}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        type="submit"
                        aria-label={`${buttonText}`}
                        className={`entry__save-button entry-${name}__save-button`}
                    >{buttonText}</button>
                </form>
                <Route path="/sign-up">
                    <Link
                        to='/sign-in'
                        className={`entry__link`}
                        >
                        Уже зарегистрированы? Войти
                    </Link>
                </Route>
            </div>
        </section>
    );
}

export default EntryForm;