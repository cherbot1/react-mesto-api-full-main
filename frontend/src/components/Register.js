import React from 'react';
import EntryForm from "./EntryForm";


function Register({onSubmit}) {
    const [userData, setUserData] = React.useState({ password: '', email: ''});

    function handleChange(e) {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault()

        const { password, email } = userData;

        onSubmit({password, email});
    }

    return (
        <EntryForm
            name = 'register'
            title = 'Регистрация'
            buttonText = 'Зарегистрироваться'
            onSubmit={handleSubmit}
        >
            <input
                type="email"
                name='email'
                id="register-email-input"
                className="entry__input entry-register__input entry-register__input_email"
                placeholder="Email"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={userData.email}
                required
            />
            <span
                id="email-input-error"
                className="email-input-error entry__input-error entry__input-error_hidden"
            />
            <input
                type="password"
                name='password'
                id='password-input'
                className="entry__input entry-register__input entry-register__input_password"
                placeholder="Пароль"
                onChange={handleChange}
                value={userData.password}
                required
            />
            <span
                id='password-input-error'
                className="password-input-error entry__input-error entry__input-error_hidden"
            />
        </EntryForm>
    );
}

export default Register;