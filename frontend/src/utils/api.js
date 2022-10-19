//Класс, который отвечает за создание запросов на сервер и принятие ответов от сервера
class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
    }

    getInfoFromServer() {
        return fetch(`${this._url}/users/me`, {
            // Включает отправку авторизационных данных в fetch (использование куки)
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse); //Передаем только ссылку на метод,
        //так как метод сам вызовется, ведь в then надо передавать именно функцию, а не ее вызов
    }

    getCardsFromServer() {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }
    
    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            //В теле будут указаны новые данные пользователя
            body: JSON.stringify({
                name: data.name,
                about: data.characteristic
            })
        }).then(this._checkResponse);
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            //В теле будут указаны новые параметры создаваемой карточки
            body: JSON.stringify({
                name: data.nameCard,
                link: data.linkCard
            })
        }).then(this._checkResponse);
    }

    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }

    putLikeCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }

    deleteLikeCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponse);
    }

    changeUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            //В теле будет указана ссылка на новый аватар пользователя
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponse);
    }
}

//Создание экземпляра класса Api
export const api = new Api({
    url: 'https://api.mesto.Kateviwe.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
    }
});