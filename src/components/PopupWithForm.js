import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._form = this._popup.querySelector('form');
        this._submitFormFunction = submitFormFunction;
        this._inputsForm = [...this._form.querySelectorAll('.popup__input')];
    }

    _getInputValues() {
        this._inputsFormWithValues = {};
        this._inputsForm.forEach((input) => {
            this._inputsFormWithValues[input.name] = input.value;
        });
        return this._inputsFormWithValues;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormFunction(this._getInputValues());
            this.close();
        });
    }
}

export default PopupWithForm;