let infoButton = document.querySelector('.profile__button');
let infoPopup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__cross');
let saveButton = document.querySelector('.popup__button');
let formPopup = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = formPopup.querySelector('.popup__input_type-name');
let inputDescription = formPopup.querySelector('.popup__input_type-description')

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
}

function clickInfoButton() {
  infoPopup.classList.add('popup_opened');
};

function clickCloseButton() {
  infoPopup.classList.remove('popup_opened');
};

infoButton.addEventListener('click', clickInfoButton);
closeButton.addEventListener('click', clickCloseButton);
formPopup.addEventListener('submit', handleFormSubmit);
saveButton.addEventListener('click', clickCloseButton);