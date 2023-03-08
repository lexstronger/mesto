class Card {
  constructor(card, handleCardClick, template) {
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._template = template;
  }
  

  _getElementFromTemplate() {
    return document.querySelector(this._template).content.querySelector('.card__item').cloneNode(true);
  }

  getElement() {
    this._element = this._getElementFromTemplate();    
    this._likeButton = this._element.querySelector('.card__like');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._addEventListeners();
    return this._element;
  }

  _addEventListeners() {
    this._element.querySelector('.card__trash').addEventListener('click', () => {this._deleteCard()});
    this._likeButton.addEventListener('click', () => {this._likeCard()});
    this._cardImage.addEventListener('click', () => {this._openImage()});
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _openImage() {
    this._handleCardClick(this._name, this._link);
  }
}

export default Card;