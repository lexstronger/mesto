class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }
// показать класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
// скрыть класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }
// проверка на валидность инпутов
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
// переключение кнопки на активную или неактивную
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  } else {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  } 
  }
// обработчики форм
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
// сброс активной кнопки
  _disabledButton () {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  };
// проверка на наличие невалидного инпута
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  };
// перебор форм из массива
  enableValidation() {
    this._formList = Array.from(document.querySelectorAll(this._settings.formSelector));
    this._formList.forEach((formElement) => {
      formElement.addEventListener('submit', () => {
        this._disabledButton();
      });    
      this._setEventListeners();    
    });
  };
}

export default FormValidator;