import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import  Section  from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupConfirmation from "../scripts/components/PopupConfirmation.js";
import Api from "../scripts/components/Api.js";
import {settings, buttonOpenInfoProfile, formEditProfilePopup, inputName, inputDescription, newCardForm, cardButton, formAvatar, buttonAvatar } from "../scripts/utils/constants.js";

import './index.css';

const api = new Api({
  basePath: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: 'd0048b8d-b031-4f52-9b12-6a593e4f7ea8',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getInitialCards(), api.getCurrentUser()])
.then(([initialCards, userData]) => {
  userId = userData._id;
  cardsContainer.renderItems(initialCards);
  profileInfo.setUserInfo({name: userData.name, about: userData.about, avatar: userData.avatar});
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

let userId;

// создание карточки и ее функционала
const createCard = (data) => {
  const card = new Card(data, userId,'.template-card',
    {handleCardClick: (name, link) => {
        popupImage.open({name, link});
      },
    handleRemoveTrashButton: (cardId) => {
      popupConfirmation.open();
      popupConfirmation.changeHandleFormSubmit(() => {
        api.deleteCard(cardId)
        .then(() => {
          popupConfirmation.close();
          card.handleDeleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      })
    },
    handlePutLike: (cardId) => {
      api.putLike(cardId)
      .then((data) => {
        card.handleLikeCard(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
      .then((data) => {
        card.handleLikeCard(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }}
 );
const cardObject = card.getElement();
return cardObject;
}

// создаем экземпляр класса Section для отрисовки карточек
const cardsContainer = new Section({
  renderer: (card) => {
    cardsContainer.addItem(createCard(card))
  }}, '.photo-grid__list');


const profileInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profileAvatarSelector: '.profile__avatar'
});

// попап редактирования информации профиля
const popupInfo = new PopupWithForm('.popup_type_edit', handleInfoFormSubmit);
popupInfo.setEventListeners();

function handleInfoFormSubmit(dataProfile) {
  popupInfo.renderLoadingData(true);
  api.editProfileInfo(dataProfile)
  .then((dataProfile) => {
    profileInfo.setUserInfo(dataProfile)
    popupInfo.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupInfo.renderLoadingData(false);
  });
  }

// попап аватара
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
popupAvatar.setEventListeners();

function handleAvatarFormSubmit(data) {
popupAvatar.renderLoadingData(true);
api.editProfileAvatar(data)
.then((data) => {
  profileInfo.setUserInfo(data);
  popupAvatar.close();
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
})
.finally(() => {
  popupAvatar.renderLoadingData(false);
})
}

// слушатель кнопки редактирования профиля с подставлением значений оттуда в попап
buttonOpenInfoProfile.addEventListener('click', () => {
  popupInfo.open();
  const currentProfileInfo = profileInfo.getUserInfo();
  inputName.value = currentProfileInfo.name;
  inputDescription.value = currentProfileInfo.description;  
})

//попап создания новой карточки
const popupNewCard = new PopupWithForm('.popup_type_new-card', handleCardFormSubmit);
popupNewCard.setEventListeners();

function handleCardFormSubmit(dataCard) {
  popupNewCard.renderLoadingData(true);
  api.addNewCard(dataCard)
  .then(dataCard => {
    cardsContainer.addItem(createCard(dataCard));
    popupNewCard.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupNewCard.renderLoadingData(false);
  })
}

const popupConfirmation = new PopupConfirmation('.popup_type_confirm');
popupConfirmation.setEventListeners();

cardButton.addEventListener('click', () => {popupNewCard.open()});
buttonAvatar.addEventListener('click', () => {popupAvatar.open()});

const validatorCard = new FormValidator(settings, newCardForm);
const validatorProfile = new FormValidator(settings, formEditProfilePopup)
const validatorAvatar = new FormValidator(settings, formAvatar);
validatorCard.enableValidation();
validatorProfile.enableValidation();
validatorAvatar.enableValidation();