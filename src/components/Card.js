class Card {
    // Конструктор с селектором и объектом со свойствами карточки
    constructor(cardFeatures, selectorCard, {currentUserId, makeLikeToCard, deleteLikeFromCard, deleteCard, functionOpenPlacePopUp}) {
        this._currentUserId = currentUserId;
        this._makeLikeToCard = makeLikeToCard;
        this._deleteLikeFromCard = deleteLikeFromCard;
        this._deleteCard = deleteCard;
        this._functionOpenPlacePopUp = functionOpenPlacePopUp;

        this._id = cardFeatures._id;
        this._cardOwner = cardFeatures.owner;
        this._createdDate = cardFeatures.createdAt;
        this._name = cardFeatures.name;
        this._photoLink = (/jpeg|webp|jpg|png$/.test(cardFeatures.link) && cardFeatures.link != undefined)  ? cardFeatures.link : 'https://oir.mobi/uploads/posts/2019-12/1576383100_7-8.jpg';
        this._alt = cardFeatures.link.replace(/.*/, `Photocard ${this._name}`);
        this._likes = cardFeatures.likes;

        this._selectorCard = selectorCard;
    }
    
    // 1.Тут происходит клонирование карточки с HTML-шаблона со всем контентом
    _createCardTemplate() {
        const cardPlace = document.querySelector(this._selectorCard).content.querySelector('.place').cloneNode(true);
        return cardPlace;
    }

    // 2.Тут уже создание карточки, то есть выгребаем всё из шаблона и устанавливаем слушатели событий
    createCard() {
        this._cardPlace = this._createCardTemplate();
        this._setEventListeners();
        this._defaultLikeProcess();
        this._nameCard = this._cardPlace.querySelector('.place__name');
        this._place = this._cardPlace.querySelector('.place__name');
        this._nameCard.textContent = this._name;
        this._photoOfCard.alt = this._alt;
        this._photoOfCard.src = this._photoLink;

        return this._cardPlace;
    }

    // 2.1 Проверка - стоит ли лайк на карточке
    _isCardLikedByCurrentUser() {
        return this._likes.some((elem) => {
            return elem._id === this._currentUserId;
        });
    }

    // 2.2 Здесь навешивается функция для лайка карточки (снятие/установка)
    toggleLikeButtonFront(responseFromServer) {
        this._likes = responseFromServer.likes;
        this._countLikes.textContent = this._likes.length;
        this._makeLikeButton.classList.toggle('place__like_active');
    }

    // 2.3 Функция для простановки лайков на карточки, прогруженные с сервера
    _defaultLikeProcess() {
        if (this._isCardLikedByCurrentUser()) {
            this._makeLikeButton.classList.add('place__like_active');
        }
        else {
            this._makeLikeButton.classList.remove('place__like_active');
        }
        this._countLikes.textContent = this._likes.length;
    }

    // 2.4 Функция для удаления карточки из HTML DOM
    removeCardFromDOM() {
        this._cardPlace.remove();
    }

    // 2.5 Функция для проверки - нужно ли показывать иконку корзины на карточке
    _removeButtonBasket() {
        if (this._currentUserId !== this._cardOwner._id) {
            this._removeButton.remove();
        }
    }

    // 2.6 Здесь навешиваются слушатели событий на изображение карточки, кнопку лайка, кнопку корзины (удаление)
    _setEventListeners() {
        //объявляем переменные для работы с ними в слушателях
        this._photoOfCard = this._cardPlace.querySelector('.place__photo');
        this._removeButton = this._cardPlace.querySelector('.place__delete');

        this._makeLikeButton = this._cardPlace.querySelector('.place__like');
        this._countLikes = this._cardPlace.querySelector('.place__like-count');

        //делаем собственно сами 3 слушателя
        this._photoOfCard.addEventListener('click', () => {
            this._functionOpenPlacePopUp(this._name, this._photoLink)
        });

        this._removeButton.addEventListener('click', () => {
            this._deleteCard(this._id);
        });

        this._makeLikeButton.addEventListener('click', () => {
            
            if (this._isCardLikedByCurrentUser()) {
                this._deleteLikeFromCard(this._id);
            }
            else {
                this._makeLikeToCard(this._id);
            }
        });

        //Проверяем, нужно ли на картине оставлять иконку корзины
        this._removeButtonBasket();
    }
}

export default Card;