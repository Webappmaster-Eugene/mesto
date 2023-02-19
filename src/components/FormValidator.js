class FormValidator {
    //Конструктор, принимающий объект с селекторами и саму форму для валидации
    constructor(settings, form) {
        this._form = form;

        this._inputsForm = Array.from(this._form.querySelectorAll(settings.inputSelector));
        this._errorInputStyle = settings.inputErrorClass;
        this._errorInputActiveStyle = settings.errorClass;

        this._submitButton = this._form.querySelector(settings.submitButtonSelector);
        this._disabledButtonStyle = settings.inactiveButtonClass;
    }

    //1. Функция, отвечающая за состояние кнопки отправки формы (активная/неактивная) в зависимости от валидации инпутов
    changeButtonStyle() {
        this._hasInvalidInput(this._inputsForm) 
            ? (this._submitButton.classList.add(this._disabledButtonStyle),
            this._submitButton.disabled = true)
            : (this._submitButton.classList.remove(this._disabledButtonStyle),
            this._submitButton.disabled = false)
        }

    //1.1. Функция, проверяющая состояние инпутов в форме
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    //2. Функция, которая отображает или скрывает ошибку в инпуте в зависимости от валидации
    _toggleShowErrorMessage(input) {
        const errorInputMessage = this._form.querySelector(`.${input.id}-error`);

        input.validity.valid 
        ? this._hideInputError(errorInputMessage)
        : (this._showInputError(errorInputMessage),
        errorInputMessage.textContent = input.validationMessage);
    }

    //2.1 Функция для показа ошибки
    _showInputError(errorInputMessage) {
        errorInputMessage.classList.add(this._errorInputStyle);
        errorInputMessage.classList.add(this._errorInputActiveStyle);
    }

    //2.2 Функция для скрытия ошибки (если ошибки нет и инпут валидирует или если открываем попап с формой заново)
    _hideInputError(errorInputMessage) {
        errorInputMessage.textContent = '';
        errorInputMessage.classList.remove(this._errorInputStyle);
    }

    //2.3 Функция для удаления отображения всех ошибок (в цикле) в инпутах форм 
    //(если ошибки нет и инпут валидирует или если открываем попап с формой заново)
    hideInputErrorsWhenOpens() {
        const spanInputErrorsList = Array.from(this._form.querySelectorAll(`.${this._errorInputActiveStyle}`));
        spanInputErrorsList.forEach(errorInputMessage => {
        errorInputMessage.textContent = '';
        errorInputMessage.classList.remove(this._errorInputActiveStyle);
        });
    }

    //3 Включить валидацию формы
    enableValidation() {
        this._inputsForm.map((input) => {
            this._setEventListeners(input);
        });
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }

    //3.1 Функция навешивания слушателей
    _setEventListeners(input) {
        input.addEventListener('input', () => {
            this._toggleShowErrorMessage(input);
            this.changeButtonStyle();
        });
    }
}

export default FormValidator;