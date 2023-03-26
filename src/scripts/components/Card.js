class Card {
  constructor(data, userId, template, {handleCardClick, handleRemoveTrashButton, handlePutLike, handleRemoveLike}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardIdOwner = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleRemoveTrashButton = handleRemoveTrashButton;
    this._handlePutLike = handlePutLike;
    this._handleRemoveLike = handleRemoveLike;
  }
  

  _getElementFromTemplate() {
    return document.querySelector(this._template).content.querySelector('.card__item').cloneNode(true);
  }

  getElement() {
    this._element = this._getElementFromTemplate();    
    this._likeButton = this._element.querySelector('.card__like');
    this._cardImage = this._element.querySelector('.card__image');
    this._deleteButton = this._element.querySelector('.card__trash');
    this._quantityLikes = this._element.querySelector('.card__quantity-likes');
    this._quantityLikes.textContent = this._likes.length;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._isOwnCard();
    this._isLiked();
    this._addEventListeners();
    return this._element;
  }

  _addEventListeners() {
    this._deleteButton.addEventListener('click', () => {this._handleRemoveTrashButton(this._cardId)});
    this._likeButton.addEventListener('click', () => {this._definesLikes()});
    this._cardImage.addEventListener('click', () => {this._openImage()});
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleLikeCard(data) {
    this._likeButton.classList.toggle('card__like_active');
    this._likes = data.likes;
    this._quantityLikes.textContent = this._likes.length;
  }

  _openImage() {
    this._handleCardClick(this._name, this._link);
  }

  _definesLikes() {
    if(this._likeButton.classList.contains('card__like_active')) {
      this._handleRemoveLike(this._cardId);
    } else {
      this._handlePutLike(this._cardId);
    }
  }

  _isOwnCard() {
    if(this._userId !== this._cardIdOwner) {
      this._deleteButton.remove()
    }
  }

  _isLiked() {
    if(this._likes.some((like) => like._id === this._userId)) {
      this._likeButton.classList.add('card__like_active');
    } else {
      this._likeButton.classList.remove('card__like_active');
    }
  }
}

export default Card;