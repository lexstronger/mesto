import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const infoOpenButton = document.querySelector('.profile__button');
const infoPopup = document.querySelector('.popup_type_edit');
const closeInfoPopupButton = infoPopup.querySelector('.popup__cross');
const formEditProfilePopup = infoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = formEditProfilePopup.querySelector('.popup__input_type_name');
const inputDescription = formEditProfilePopup.querySelector('.popup__input_type_description');
const popup = document.querySelector('.popup');
// переменные для попапа создания новой карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = cardPopup.querySelector('.popup__form');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const cardButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__cross');
// переменные для попапа с фотографией
const imagePopup = document.querySelector('.popup_type_image');
const picturePopup = document.querySelector('.popup__image');
const titlePopup = document.querySelector('.popup__title');
const imageCloseButton = imagePopup.querySelector('.popup__cross');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  CloseAddCardButton();
}

function clickInfoButton() {
  openPopup(infoPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

function CloseAddCardButton() { 
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
closeInfoPopupButton.addEventListener('click', () => {closePopup(infoPopup)});
formEditProfilePopup.addEventListener('submit', handleFormEditProfileSubmit);
cardButton.addEventListener('click', () => {openPopup(cardPopup)});
cardCloseButton.addEventListener('click', CloseAddCardButton);
newCardForm.addEventListener('submit', submitNewCardForm);
imageCloseButton.addEventListener('click', () => {closePopup(imagePopup)});

export {imagePopup, titlePopup, picturePopup, openPopup};