const infoButton = document.querySelector('.profile__button');
const infoPopup = document.querySelector('.popup_type_edit');
const closeButton = document.querySelector('.popup__cross');
const saveButton = document.querySelector('.popup__button');
const formPopup = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = formPopup.querySelector('.popup__input_type_name');
const inputDescription = formPopup.querySelector('.popup__input_type_description');
// переменные для попапа создания новой карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = cardPopup.querySelector('.popup__form');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const cardButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__cross');
// переменные для попапа с фотографией
const openImagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = openImagePopup.querySelector('.popup__cross');

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

// Создание карточек

const cardsContainer = document.querySelector('.photo-grid__list');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.card__item');

function createCard ({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardText = card.querySelector('.card__name');
  cardText.textContent = name;
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;  

  // Удаление карточки
  const deleteButton = card.querySelector('.card__trash');
  function deleteCard(item) {
    item.target.closest('.card__item').remove();
  }
  deleteButton.addEventListener('click', deleteCard);

  // Лайк карточки
  const likeButton = card.querySelector('.card__like');
  function likeCard(item) {
    item.target.classList.toggle('card__like_active');
  }
  likeButton.addEventListener('click', likeCard);

  // Открытие фотографии карточки
  const imagePopup = document.querySelector('.popup__image');
  const titlePopup = document.querySelector('.popup__title');
  function openImage () {
    titlePopup.textContent = name;  
    imagePopup.alt = name;
    imagePopup.src = link; 
    clickImageCard();         
  }  
  cardImage.addEventListener('click', openImage);
  imageCloseButton.addEventListener('click', clickCloseImageButton);

  return card;
}
// Отрисовка карточек
function renderCards() {
  initialCards.forEach(item => {
    const cardHtml = createCard(item);
    cardsContainer.append(cardHtml);
  });
}

renderCards();

function clickInfoButton() {
  infoPopup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

function clickCloseButton() {
  infoPopup.classList.remove('popup_opened');
};

function clickAddCardButton() {
  cardPopup.classList.add('popup_opened');
};

function clickCloseCardButton() {
  newCardForm.reset();
  cardPopup.classList.remove('popup_opened');
}

function clickImageCard() {
  openImagePopup.classList.add('popup_opened');
}

function clickCloseImageButton() {
  openImagePopup.classList.remove('popup_opened');
}

// Подставление значений из профиля в попап
function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;  
  clickCloseButton();
};

// Cоздание карточки из формы
function submitNewCardForm(event) {
  event.preventDefault();
  const newCard = createCard({
    name: inputTitle.value,
    link: inputLink.value
  })
  cardsContainer.prepend(newCard);  
  clickCloseCardButton();  
}

infoButton.addEventListener('click', clickInfoButton);
closeButton.addEventListener('click', clickCloseButton);
formPopup.addEventListener('submit', handleFormSubmit);
cardButton.addEventListener('click', clickAddCardButton);
cardCloseButton.addEventListener('click', clickCloseCardButton);
newCardForm.addEventListener('submit', submitNewCardForm);