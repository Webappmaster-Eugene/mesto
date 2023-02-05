class UserInfo {
    constructor({htmlElementWithName, htmlElementWithInfo}) {
        this._name = htmlElementWithName;
        this._info = htmlElementWithInfo;
    }
    
    getUserInfo() {
        return {nameAuthor: this._name.textContent, infoAuthor: this._info.textContent};
    }

    setUserInfo({nameAuthor, infoAuthor}) {
        this._name.textContent = nameAuthor.value;
        this._info.textContent = infoAuthor.value;
    }
}

export { UserInfo };