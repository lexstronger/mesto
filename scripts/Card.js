import {imagePopup, picturePopup, titlePopup, openPopup} from './constants.js';
class Card {
  constructor(card, template, imagePopup) {
    this._template = template;
    this._name = card.name;
    this._link = card.link;
    this._imagePopup = imagePopup;
    this._openPopup = openPopup;
  }

  _getElementFromTemplate() {
    return document.querySelector(this._template).content.querySelector('.card__item').cloneNode(true);
  }

  _addEventListeners() {
    this._element.querySelector('.card__trash').addEventListener('click', () => {this._deleteCard()});
    this._element.querySelector('.card__like').addEventListener('click', () => {this._likeCard()});
    this._element.querySelector('.card__image').addEventListener('click', () => {this._openImage()});
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _openImage() {    
    titlePopup.textContent = this._name;  
    picturePopup.alt = this._name;
    picturePopup.src = this._link; 
    this._openPopup(imagePopup);
  }

  getElement() {
    this._element = this._getElementFromTemplate();
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._addEventListeners();
    return this._element;
  }
}

export default Card;