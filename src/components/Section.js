class Section {
    //1. Конструктор для создания секции с карточками по умолчанию
    constructor ({renderer}, containerSelector) {
        // this._initialCards = initialCards;
        // console.log(this._initialCards);
        this._renderer = renderer;
        this._containerSelector = document.querySelector(`${containerSelector}`);
    }

    //1.1 Функция ТОЛЬКО для обработки начальных 6 карточек по умолчанию, в коллбэке функция, отрисовывающая эти карточки на экран
    
    // renderItems() {
    //     this._initialCards.forEach(itemCard => {
    //         console.log(itemCard);
    //         this._renderer(itemCard);
    //     });
    // }

    //1.1 Для обработки карточек с сервера (начальных, которые идут по умолчанию по API)
    renderItems(initialCards) {
        console.log('Начало рендеринга карточек с сервера по умолчанию');
        initialCards.forEach(itemCard => {
            this._renderer(itemCard);
        });
    }

    //1.2 Функция вставки новой карточки (созданной) place в блок с публикациями данного профиля (не для начальных карточек с сервера)
    addItem(cardNewPlace) {
        this._containerSelector.append(cardNewPlace);
    }

    //1.3 Функция вставки новой карточки (созданной) place в блок с публикациями данного профиля при создании в попапе
    addItemToTop(cardNewPlace) {
        this._containerSelector.prepend(cardNewPlace);
    }
}

export default Section;



// class Section {
//     //1. Конструктор для создания секции с карточками по умолчанию
//     constructor ({initialCards, renderer}, containerSelector) {
//         this._initialCards = initialCards;
//         console.log(this._initialCards);
//         this._renderer = renderer;
//         this._containerSelector = document.querySelector(`${containerSelector}`);
//     }

//     //1.1 Функция ТОЛЬКО для обработки начальных 6 карточек по умолчанию, в коллбэке функция, отрисовывающая эти карточки на экран
    
//     // renderItems() {
//     //     this._initialCards.forEach(itemCard => {
//     //         console.log(itemCard);
//     //         this._renderer(itemCard);
//     //     });
//     // }

//     //Для обработки карточек с сервера
//     renderItems() {
//         console.log('Начало рендеринга карточек с сервера по умолчанию');
//         console.log(this._initialCards);
//         this._initialCards.forEach(itemCard => {
//             console.log(itemCard['_id']);
//             this._renderer(itemCard);
//         });
//     }

//     //1.2 Функция вставки новой карточки place в блок с публикациями данного профиля (не для начальных карточек с сервера)
//     addItem(cardNewPlace) {
//         this._containerSelector.prepend(cardNewPlace);
//     }
// }

// export default Section;