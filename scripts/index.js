import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";

const infoOpenButton = document.querySelector('.profile__button');
const infoPopup = document.querySelector('.popup_type_edit');
const buttonClosePopupProfile = infoPopup.querySelector('.popup__cross');
const formEditProfilePopup = infoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = formEditProfilePopup.querySelector('.popup__input_type_name');
const inputDescription = formEditProfilePopup.querySelector('.popup__input_type_description');
// переменные для попапа создания новой карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = cardPopup.querySelector('.popup__form');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const cardButton = document.querySelector('.profile__add-button');
const buttonClosePopupNewCard = cardPopup.querySelector('.popup__cross');
// переменные для попапа с фотографией
const imagePopup = document.querySelector('.popup_type_image');
const picturePopup = document.querySelector('.popup__image');
const titlePopup = document.querySelector('.popup__title');
const buttonClosePopupImage = imagePopup.querySelector('.popup__cross');

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', escapePress);
  document.addEventListener('click', closePopupClickOnOverlay);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', escapePress);
  document.removeEventListener('click', closePopupClickOnOverlay);
}

// Создание карточки
const cardsContainer = document.querySelector('.photo-grid__list');

function createCard (title, image) {
  const card = new Card({name: title, link: image},'.template-card');
  const cardElement = card.getElement();
  return cardElement;
}

// добавление карточки
const addCard = (title, image) => {
  const card = createCard(title, image);
  cardsContainer.prepend(card);
}

// Отрисовка начальных карточек
const renderCards = (Array) => {
  Array.forEach((item) => {
    addCard(item.name, item.link);
  })
}

renderCards(initialCards);

// Cоздание карточки из формы
function submitNewCardForm(event) {
  event.preventDefault();
  addCard(inputTitle.value, inputLink.value);
  closeAddCardButton();
}

function clickInfoButton() {
  openPopup(infoPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

function closeAddCardButton() { 
  newCardForm.reset(); 
  closePopup(cardPopup); 
} 

// Подставление значений из профиля в попап
function handleFormEditProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;  
  closePopup(infoPopup);
};

// функция для закрытия попапа по esc
function escapePress(event) {
  event.preventDefault();
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
// функция для закрытия попапа через клик по оверлею
function closePopupClickOnOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
}}

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

infoOpenButton.addEventListener('click', clickInfoButton);
buttonClosePopupProfile.addEventListener('click', () => {closePopup(infoPopup)});
formEditProfilePopup.addEventListener('submit', handleFormEditProfileSubmit);
cardButton.addEventListener('click', () => {openPopup(cardPopup)});
buttonClosePopupNewCard.addEventListener('click', closeAddCardButton);
newCardForm.addEventListener('submit', submitNewCardForm);
buttonClosePopupImage.addEventListener('click', () => {closePopup(imagePopup)});