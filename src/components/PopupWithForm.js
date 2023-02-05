import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._form = this._popup.querySelector('form');
        this._submitFormFunction = submitFormFunction;
        this._getInputValues();
    }

    _getInputValues() {
        this._inputFormValues = this._form.querySelectorAll('input');
    }

    _resetForm() {
        this._form.reset();
    }

    close() {
        this._resetForm();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => this._submitFormFunction(event));
        super.setEventListeners();
    }
}

export default PopupWithForm;