class Section {
    //1. Конструктор для создания секции с карточками по умолчанию
    constructor ({initialCards, renderer}, containerSelector) {
        this._initialCards = initialCards;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(`${containerSelector}`);
    }

    //1.1 Функция ТОЛЬКО для обработки начальных 6 карточек по умолчанию, в коллбэке функция, отрисовывающая эти карточки на экран
    renderItems() {
        this._initialCards.forEach(itemCard => {
            this._renderer(itemCard);
        });
    }

    //1.2 Функция вставки новой карточки place в блок с публикациями данного профиля
    addItem(cardNewPlace) {
        this._containerSelector.prepend(cardNewPlace);
    }
}

export default Section;