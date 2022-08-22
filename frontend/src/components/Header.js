import React from 'react';
import logo from "../images/logo.svg";
import {Link, Route, Switch} from "react-router-dom";

function Header ({email, onSignOut}) {
    return (
        <header className="header">
            <img className="header__logo"
                 src={logo}
                 alt="Логотип"
            />
            <Switch>
                <Route exact path="/">
                    <div className="header__container">
                        <p className="header__email">{email}</p>
                        <button className="header__exit-button" onClick={onSignOut}>
                            Выйти
                        </button>
                    </div>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;