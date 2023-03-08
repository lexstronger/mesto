class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonClose = this._popup.querySelector('.popup__cross');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  };

  _handleEscClose(event) {
    event.preventDefault();
    if (event.key === 'Escape') {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if(event.target.classList.contains('popup')) {
      this.close();
    }});
    this._buttonClose.addEventListener('click', () => {this.close()});
  }
}

export default Popup;