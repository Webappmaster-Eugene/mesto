import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

class PopupWithSubmit extends Popup { 
    
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
    }

    chooseCallbackHandler(callbackHandler) {
        this._callbackHandler = callbackHandler;
    }

    loadingData(buttonText) {
        this._button.textContent = buttonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', (event) => {
            event.preventDefault();
            this._callbackHandler();
            // this.close();
        });
    }
}

export default PopupWithSubmit;