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

    // 2.1 Здесь навешивается функция для лайка карточки (снятие/установка)
    _isCardLikedByCurrentUser() {
        return this._likes.some((elem) => {
            return elem._id === this._currentUserId;
        });
    }

    _defaultLikeProcess() {
        if (this._isCardLikedByCurrentUser()) {
            this._makeLikeButton.classList.add('place__like_active');
        }
        else {
            this._makeLikeButton.classList.remove('place__like_active');
        }
        this._countLikes.textContent = this._likes.length;
    }

    toggleLikeButtonFront(responseFromServer) {
        this._likes = responseFromServer.likes;
        this._countLikes.textContent = this._likes.length;
        this._makeLikeButton.classList.toggle('place__like_active');
    }

    // 2.2 Здесь навешивается функция для удаления карточки с экрана
    removeCard() {
        this._cardPlace.remove();
    }

    // 2.3 Здесь навешивается функция для лайка карточки (снятие/установка)
    _removeButtonBasket() {
        if (this._currentUserId !== this._cardOwner._id) {
            this._removeButton.remove();
        }
    }

    // 2.4 Здесь навешиваются слушатели событий на изображение карточки, кнопку лайка, кнопку корзины (удаление)
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
            this.removeCard();
        });
        this._makeLikeButton.addEventListener('click', () => {
            
            if (this._isCardLikedByCurrentUser()) {
                this._deleteLikeFromCard(this._id);
            }
            else {
                this._makeLikeToCard(this._id);
            }
        });
        this._removeButtonBasket();
    }
    // this._likeButton.addEventListener('click', () => {
    //     if (this._likeButton.classList.contains('element__like_active')) {
    //       this._deleteLike(this._cardId);
    //     } else { this._putLike(this._cardId); }
    //   });

    // _cardLiked() {
    //     if (!this._likes) { return }
    //     if (this._likes.some((value) => {
    //       return this._userId === value._id
    //     })) {
    //       this._likeButton.classList.add('element__like_active');
    //     } else { this._likeButton.classList.remove('element__like_active'); }
    //   }
    //   putLikeElement(value) {
    //     this._likesSum.textContent = value.likes.length
    //     this._likeButton.classList.toggle('element__like_active')
    //   }
}

export default Card;


// class Card {
//     // Конструктор с селектором и объектом со свойствами карточки
//     constructor(cardFeatures, selectorCard, functionOpenPlacePopUp) {
//         this._name = cardFeatures.name;
//         this._photoLink = cardFeatures.link;
//         this._alt = cardFeatures.link.replace(/^.*[\\\/]/, '');
//         this._selectorCard = selectorCard;
//         this._functionOpenPlacePopUp = functionOpenPlacePopUp;
//     }
    
//     // 1.Тут происходит клонирование карточки с HTML-шаблона со всем контентом
//     _createCardTemplate() {
//         const cardPlace = document.querySelector(this._selectorCard).content.querySelector('.place').cloneNode(true);
//         return cardPlace;
//     }

//     // 2.Тут уже создание карточки, то есть выгребаем всё из шаблона и устанавливаем слушатели событий
//     createCard() {
//         this._cardPlace = this._createCardTemplate();
//         this._setEventListeners();
//         this._nameCard = this._cardPlace.querySelector('.place__name');
//         this._nameCard.textContent = this._name;
//         this._photoOfCard.alt = this._alt;
//         this._photoOfCard.src = this._photoLink;


//         return this._cardPlace;
//     }

//     // 2.1 Здесь навешивается функция для лайка карточки (снятие/установка)
//     _makeLike() {
//         this._makeLikeButton.classList.toggle('place__like_active');
//     }

//     // 2.2 Здесь навешивается функция для удаления карточки с экрана
//     _removeCard() {
//         this._cardPlace.remove();
//     }

//     // 2.3 Здесь навешиваются слушатели событий на изображение карточки, кнопку лайка, кнопку корзины (удаление)
//     _setEventListeners() {
//         //объявляем переменные для работы с ними в слушателях
//         this._photoOfCard = this._cardPlace.querySelector('.place__photo');
//         this._makeLikeButton = this._cardPlace.querySelector('.place__like');
//         this._removeButton = this._cardPlace.querySelector('.place__delete');

//         //делаем собственно сами 3 слушателя
//         this._photoOfCard.addEventListener('click', () => {
//             this._functionOpenPlacePopUp(this._name, this._photoLink)
//         });
//         this._removeButton.addEventListener('click', () => {
//             this._removeCard();
//         });
//         this._makeLikeButton.addEventListener('click', () => {
//             this._makeLike();
//         });
//     }
// }

// export default Card;