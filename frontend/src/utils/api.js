//Класс, который отвечает за создание запросов на сервер и принятие ответов от сервера
class Api {
    constructor(config) {
        this._url = config.url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
    }

    getInfoFromServer() {
        return fetch(`https://${this._url}/users/me`, {
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a'
            }
        }).then(this._checkResponse); //Передаем только ссылку на метод,
        //так как метод сам вызовется, ведь в then надо передавать именно функцию, а не ее вызов
    }

    getCardsFromServer() {
        return fetch(`https://mesto.${this._url}/cards`, {
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a'
            }
        }).then(this._checkResponse);
    }
    
    changeUserInfo(data) {
        return fetch(`https://${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a',
                'Content-Type': 'application/json'
            },
            //В теле будут указаны новые данные пользователя
            body: JSON.stringify({
                name: data.name,
                about: data.characteristic
            })
        }).then(this._checkResponse);
    }

    addNewCard(data) {
        return fetch(`https://mesto.${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a',
                'Content-Type': 'application/json'
            },
            //В теле будут указаны новые параметры создаваемой карточки
            body: JSON.stringify({
                name: data.nameCard,
                link: data.linkCard
            })
        }).then(this._checkResponse);
    }

    deleteCard(idCard) {
        return fetch(`https://mesto.${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    putLikeCard(idCard) {
        return fetch(`https://mesto.${this._url}/cards/${idCard}/likes`, {
            method: 'PUT',
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    deleteLikeCard(idCard) {
        return fetch(`https://mesto.${this._url}/cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    changeUserAvatar(data) {
        return fetch(`https://${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: '55b0d581-ee83-4eea-b2f9-f147c6af6c4a',
                'Content-Type': 'application/json'
            },
            //В теле будет указана ссылка на новый аватар пользователя
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkResponse);
    }
}

//Создание экземпляра класса Api
export const api = new Api({
    url: 'nomoreparties.co/v1/cohort-40'
});