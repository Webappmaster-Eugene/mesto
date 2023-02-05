import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

class PopupWithImage extends Popup {
    constructor(popupSelector, name, photoLink) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo'); //Фото в попапе просмотра карточки place
        this._popupDescription = this._popup.querySelector('.popup__description'); //Описание в попапе просмотра карточки place
        this._alt = this._popupPhoto.alt;
        this._photoLink = photoLink;
        this._name = name;
    }

    open() {
        this._popupPhoto.src = this._photoLink;
        this._alt = this._photoLink.replace(/^.*[\\\/]/, '');
        this._popupDescription.textContent = this._name;
        super.open();
    }
}

export default PopupWithImage;