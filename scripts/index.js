const infoOpenButton = document.querySelector('.profile__button');
const infoPopup = document.querySelector('.popup_type_edit');
const closeInfoPopupButton = infoPopup.querySelector('.popup__cross');
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
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

// Создание карточек
const cardsContainer = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.card__item');

function createCard ({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector('.card__name');
  cardText.textContent = name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link; 
  cardImage.alt = name; 

  // Удаление карточки
  const deleteButton = card.querySelector('.card__trash');
  function deleteCard(event) {
    event.target.closest('.card__item').remove();
  }
  deleteButton.addEventListener('click', deleteCard);

  // Лайк карточки
  const likeButton = card.querySelector('.card__like');
  function likeCard(event) {
    event.target.classList.toggle('card__like_active');
  }
  likeButton.addEventListener('click', likeCard);

  // Открытие фотографии карточки  
  function openImage () {
    titlePopup.textContent = name;  
    picturePopup.alt = name;
    picturePopup.src = link; 
    openPopup(imagePopup);         
  }  
  cardImage.addEventListener('click', openImage);  

  return card;
}

// Отрисовка карточек
function renderInitialCards() {
  initialCards.forEach(item => {
    const cardHtml = createCard(item);
    cardsContainer.append(cardHtml);
  });
}

renderInitialCards();

function clickInfoButton() {
  openPopup(infoPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

// Подставление значений из профиля в попап
function handleFormEditProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;  
  closePopup(infoPopup);
};

// Cоздание карточки из формы
function submitNewCardForm(event) {
  event.preventDefault();
  const newCard = createCard({
    name: inputTitle.value,
    link: inputLink.value
  })
  cardsContainer.prepend(newCard);  
  closePopup(cardPopup); 
}

infoOpenButton.addEventListener('click', clickInfoButton);
closeInfoPopupButton.addEventListener('click', () => {closePopup(infoPopup)});
formEditProfilePopup.addEventListener('submit', handleFormEditProfileSubmit);
cardButton.addEventListener('click', () => {openPopup(cardPopup)});
cardCloseButton.addEventListener('click', () => {closePopup(cardPopup)});
newCardForm.addEventListener('submit', submitNewCardForm);
imageCloseButton.addEventListener('click', () => {closePopup(imagePopup)});