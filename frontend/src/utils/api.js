class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    /* Обработка ответа */
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Возникла ошибка ${res.status}`);
        }
    }

    /* Получение информации о пользователе с сервера */
    getUserInfo(token) {
        return fetch(`https://${this._url}users/me`, {
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    /* Получение информации о карточках с сервера */
    getCardsInfo(token) {
        return fetch(`https://${this._url}cards`, {
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": 'application/json'
            }
        })
            .then(this._checkResponse)
    }

    /* Изменение информации о пользователе на сервере */
    changeUserInfo(data) {
        return fetch(`https://${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse);
    }

    /* Добавление новой карточки на сервер*/
    addCard(data) {
        return fetch(`https://${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse);
    }

    /* Удаление карточки с сервера */
    deleteCard(id) {
        return fetch(`https://${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    /* Меняем информацию об аватаре на сервере */
    changeAvatar(data) {
        return fetch(`https://${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkResponse);
    }

    /* Универсальный метод для постановки лайка */
    changeLikeCardStatus(id, like){
        return fetch(`https://${this._url}cards/${id}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }
}

export const api = new Api({
    url: 'api.cherbot1.students.nomoredomains.sbs/',
    headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": 'application/json'
    }
});

