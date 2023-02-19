class UserInfo {
    constructor({htmlElementWithName, htmlElementWithInfo, htmlElementWithAvatar}) {
        this._name = htmlElementWithName;
        this._info = htmlElementWithInfo;
        this._avatar = htmlElementWithAvatar;
    }
    
    getUserInfo() {
        return {nameAuthor: this._name.textContent, infoAuthor: this._info.textContent, avatarAuthor: this._avatar.src};
    }

    setUserInfo({nameAuthor, infoAuthor}) {
        this._name.textContent = nameAuthor;
        this._info.textContent = infoAuthor;
    }

    setUserAvatar(avatarAuthor) {
        this._avatar.src = avatarAuthor;
    }
}

export { UserInfo };