import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import  Section  from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import { initialCards } from "./constants.js";

import '../pages/index.css';

const buttonOpenInfoProfile = document.querySelector('.profile__button');
const infoPopup = document.querySelector('.popup_type_edit');
const formEditProfilePopup = infoPopup.querySelector('.popup__form');
const inputName = formEditProfilePopup.querySelector('.popup__input_type_name');
const inputDescription = formEditProfilePopup.querySelector('.popup__input_type_description');
// переменные для попапа создания новой карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = cardPopup.querySelector('.popup__form');
const cardButton = document.querySelector('.profile__add-button');

// функция связывания класса Card для открытия попапа с картинкой 
const handleCardClick = (name, link) => {
  popupImage.open({name, link});
}

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

function createCard (title, image) {
  const card = new Card({name: title, link: image}, handleCardClick, '.template-card');
  const cardElement = card.getElement();
  return cardElement;
}

// создаем экземпляр класса Section для отрисовки начальных карточек
const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsContainer.addItem(createCard(item.name, item.link))
  }}, '.photo-grid__list');

  cardsContainer.renderItems();

const profileInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description'
});

const popupInfo = new PopupWithForm('.popup_type_edit', handleInfoFormSubmit);
popupInfo.setEventListeners();
// функция для изменения информации профиля
function handleInfoFormSubmit(data) {
  profileInfo.setUserInfo({name: data.name, description: data.description});
  popupInfo.close();
}

// слушатель кнопки редактирования профиля с подставлением значений оттуда в попап
buttonOpenInfoProfile.addEventListener('click', () => {
  popupInfo.open();
  const currentProfileInfo = profileInfo.getUserInfo();
  inputName.value = currentProfileInfo.name;
  inputDescription.value = currentProfileInfo.description;  
})

const popupNewCard = new PopupWithForm('.popup_type_new-card', handleCardFormSubmit);
popupNewCard.setEventListeners();
// функция создания карточки через попап
function handleCardFormSubmit(item) {
  const newCard = createCard(item.title, item.link);
  cardsContainer.addItem(newCard);
}

cardButton.addEventListener('click', () => {popupNewCard.open()})

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const validatorCard = new FormValidator(settings, newCardForm);
const validatorProfile = new FormValidator(settings,formEditProfilePopup)
validatorCard.enableValidation();
validatorProfile.enableValidation();