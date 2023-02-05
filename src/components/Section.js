class Section {
    constructor ({initialCards, renderer}, containerSelector) {
        this._initialCards = initialCards;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems() {
        this._initialCards.forEach(itemCard => {
            this._renderer(itemCard);
        });
    }

    //2.1.2 Функция вставки новой карточки place в блок с публикациями данного профиля
    addItem(cardNewPlace) {
        document.querySelector(`${this._containerSelector}`).prepend(cardNewPlace);
    }
}

export default Section;