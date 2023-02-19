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
            this.close();
        });
    }
}

export default PopupWithSubmit;

// import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

// class PopupWithSubmit extends Popup {    
//     constructor(popupSelector, submitFormFunction) {
//         super(popupSelector);
//         this._form = this._popup.querySelector('form');
//         this._submitFormFunction = submitFormFunction;
//         this._inputsForm = [...this._form.querySelectorAll('.popup__input')];
//     }

//     _getInputValues() {
//         this._inputsFormWithValues = {};
//         this._inputsForm.forEach((input) => {
//             this._inputsFormWithValues[input.name] = input.value;
//         });
//         return this._inputsFormWithValues;
//     }

//     close() {
//         this._form.reset();
//         super.close();
//     }

//     setEventListeners() {
//         super.setEventListeners();
//         this._form.addEventListener('submit', (event) => {
//             event.preventDefault();
//             this._submitFormFunction(this._getInputValues());
//             this.close();
//         });
//     }
// }

// export default PopupWithSubmit;