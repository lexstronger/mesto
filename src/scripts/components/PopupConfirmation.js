import Popup from "./Popup.js";
class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formConfirm = this._popup.querySelector('.popup__form');
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
}

export default PopupConfirmation;