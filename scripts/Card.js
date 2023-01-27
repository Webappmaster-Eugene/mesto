class Card {
    // Конструктор с селектором и объектом со свойствами карточки
    constructor(cardFeatures, selectorCard, functionOpenPlacePopUp) {
        this._name = cardFeatures.name;
        this._photoLink = cardFeatures.link;
        this._alt = cardFeatures.link.replace(/^.*[\\\/]/, '');
        this._selectorCard = selectorCard;
        this._functionOpenPlacePopUp = functionOpenPlacePopUp;
    }
    
    // 1.Тут происходит клонирование карточки с HTML-шаблона со всем контентом
    _createCardTemplate() {
        const cardPlace = document.querySelector(this._selectorCard).content.querySelector('.place').cloneNode(true);
        return cardPlace;
    }

    // 2.Тут уже создание карточки, то есть выгребаем всё из шаблона и устанавливаем слушатели событий
    _createCard() {
        this._cardPlace = this._createCardTemplate();
        this._setEventListeners();
        this._nameCard = this._cardPlace.querySelector('.place__name');
        this._nameCard.textContent = this._name;
        this._photoOfCard.alt = this._alt;
        this._photoOfCard.src = this._photoLink;


        return this._cardPlace;
    }

    // 2.1 Здесь навешивается функция для лайка карточки (снятие/установка)
    _makeLike() {
        this._makeLikeButton.classList.toggle('place__like_active');
    }

    // 2.2 Здесь навешивается функция для удаления карточки с экрана
    _removeCard() {
        this._cardPlace.remove();
    }

    // 2.3 Здесь навешиваются слушатели событий на изображение карточки, кнопку лайка, кнопку корзины (удаление)
    _setEventListeners() {
        //объявляем переменные для работы с ними в слушателях
        this._photoOfCard = this._cardPlace.querySelector('.place__photo');
        this._makeLikeButton = this._cardPlace.querySelector('.place__like');
        this._removeButton = this._cardPlace.querySelector('.place__delete');

        //делаем собственно сами 3 слушателя

        this._photoOfCard.addEventListener('click', () => {
            this._functionOpenPlacePopUp(this._name, this._photoLink)
        });
    
        this._removeButton.addEventListener('click', () => {
            this._removeCard();
        });

        this._makeLikeButton.addEventListener('click', () => {
            this._makeLike();
        });
    }
}

export default Card;