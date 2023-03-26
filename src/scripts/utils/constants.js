const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const buttonOpenInfoProfile = document.querySelector('.profile__button');
const infoPopup = document.querySelector('.popup_type_edit');
const formEditProfilePopup = infoPopup.querySelector('.popup__form');
const inputName = formEditProfilePopup.querySelector('.popup__input_type_name');
const inputDescription = formEditProfilePopup.querySelector('.popup__input_type_description');
// переменные для попапа создания новой карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = cardPopup.querySelector('.popup__form');
const cardButton = document.querySelector('.profile__add-button');
// переменные для попапа аватара
const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatar = avatarPopup.querySelector('.popup__form');
const buttonAvatar = document.querySelector('.profile__avatar-btn')

export {settings, buttonOpenInfoProfile, formEditProfilePopup, inputName, inputDescription, newCardForm, cardButton, formAvatar, buttonAvatar}