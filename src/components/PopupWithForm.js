import Popup from './Popup.js'; //Класс для открытия и закрытия любых попапов универсальный

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
        super(popupSelector);
        this._form = this._popup.querySelector('form');
        this._submitFormFunction = submitFormFunction;
        this._button = this._form.querySelector('.popup__button');
        this._inputsForm = [...this._form.querySelectorAll('.popup__input')];
    }

    loadingData(buttonText) {
        this._button.textContent = buttonText;
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
//     Если будет интересно, можно сделать так, чтобы внутрь обработчика сабмита уходила цепочка промиса (then, finally), чтобы можно было универсально закрывать попапы в then, и возвращать текст кнопки сабмита в finally:
//     setEventListeners() {
//       super.setEventListeners();
      
//       this._form.addEventListener('submit', () => {
//         // перед запросом сохраняем изначальный текст кнопки
//         const initialText = this._submitButton.textContent;
//         // меняем его, чтобы показать пользователю ожидание
//         this._submitButton.textContent = 'Сохранение...';
//         this._submitForm(this._getInputValues())
//           .then(() => this.close()) // закрывается попап в `then`
//           .finally(() => {
//             this._submitButton.textContent = initialText;
//           }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
//       });
//     }
  
   
//   Тогда не нужно будет дублировать код во всех обработчиках сабмита в index.js.  
//   Обратите внимание, что нужно будет прописать return перед вызовом метода api  в index.js, чтобы функция сабмита возвращала промис и цепочка внутри PopupWithForm работала
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormFunction(this._getInputValues());
            // this.close();
        });
    }
}

export default PopupWithForm;