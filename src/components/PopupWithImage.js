import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo'); //Фото в попапе просмотра карточки place
        this._popupDescription = this._popup.querySelector('.popup__description'); //Описание в попапе просмотра карточки place
        
    }

    open(imageName, photoLink) {
        this._popupPhoto.src = photoLink;
        // this._popupPhoto.alt = photoLink.replace(/.*/, `Photocard ${imageName}`);
        this._popupPhoto.alt = photoLink.replace(/^.*[\\\/]/, '');//Описание-альт для картинки
        this._popupDescription.textContent = imageName;
        super.open();
    }
}

export default PopupWithImage;