class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(`${popupSelector}`);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._closeClickEsc = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeClickEsc);
    }

    close() {
        document.removeEventListener('keydown', this._closeClickEsc);
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target === this._popup) this.close();
        });
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
    }
}

export default Popup;