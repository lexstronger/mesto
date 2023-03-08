import Card from "../scripts/components/Card";
import FormValidator from "../scripts/components/FormValidator.js";
import  Section  from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { initialCards, settings, buttonOpenInfoProfile, formEditProfilePopup, inputName, inputDescription, newCardForm, cardButton } from "../scripts/utils/constants.js";

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

const validatorCard = new FormValidator(settings, newCardForm);
const validatorProfile = new FormValidator(settings,formEditProfilePopup)
validatorCard.enableValidation();
validatorProfile.enableValidation();