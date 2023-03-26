class UserInfo {
  constructor({profileNameSelector, profileDescriptionSelector, profileAvatarSelector}){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector)
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
    this._profileAvatar.src = avatar
  }

  getUserId() {
    return this._id;
  }
}

export default UserInfo;