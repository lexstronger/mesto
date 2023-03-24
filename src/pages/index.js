import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import  Section  from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { initialCards, settings, buttonOpenInfoProfile, formEditProfilePopup, inputName, inputDescription, newCardForm, cardButton } from "../scripts/utils/constants.js";
import Api from "../scripts/components/Api.js";

import './index.css';

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
  renderer: (item) => {
    cardsContainer.addItem(createCard(item.name, item.link))
  }}, '.photo-grid__list');


const profileInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profileAvatarSelector: '.profile__avatar'
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

const validatorCard = new FormValidator(settings, newCardForm);
const validatorProfile = new FormValidator(settings,formEditProfilePopup)
validatorCard.enableValidation();
validatorProfile.enableValidation();

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-61',
  'ac5a8fa3-72da-4dfb-8b23-f9b7c9cea421',
);

let userId;

// api.getInitialCards()
// .then((initialCards) => {
// cardsContainer.renderItems(initialCards);
// })
// .catch((err) => {
//   console.log(`Ошибка: ${err}`);
// });

// api.getCurrentUser()
// .then((userData) => {
// profileInfo.setUserInfo({name: userData.name, description: userData.description, avatar: userData.avatar});
// userId = userData._id;
// })
// .catch((err) => {
//   console.log(`Ошибка: ${err}`);
// });
Promise.all([api.getInitialCards(), api.getCurrentUser()])
.then(([initialCards, userData]) => {
  cardsContainer.renderItems(initialCards);
  profileInfo.setUserInfo({name: userData.name, description: userData.description, avatar: userData.avatar});
  userId = userData._id;
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});