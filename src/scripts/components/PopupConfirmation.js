import Popup from "./Popup.js";
class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formConfirm = this._popup.querySelector('.popup__form');
    this._buttonConfirm = this._popup.querySelector('popup__button')
  }

  changeHandleFormSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formConfirm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonConfirm.textContent = 'Удаление...';
    } else {
      this._buttonConfirm.textContent = 'Да';
    }
  }
}

export default PopupConfirmation;