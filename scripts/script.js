import initialCards from './initialCards.js';

const profileOpen = document.querySelector('.profile__changer');
const postAdd = document.querySelector('.profile__add');

const popups = document.querySelectorAll('.popup');
const popupChange = document.querySelector('.popup_type_change-profile');
const popupAdd = document.querySelector('.popup_type_add-publication');
const popupPlace = document.querySelector('.popup_type_place');

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const closeButtons = document.querySelectorAll('.popup__close');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');
const popupPhoto = popupPlace.querySelector('.popup__photo');
const popupDescription = popupPlace.querySelector('.popup__description');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputPhoto = document.querySelector('.popup__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const placeCardsParent = document.querySelector('.places__list');

function escapePopUp(e) {
    if (e.key === 'Escape') {
        closePopUp(document.querySelector('.popup_opened'));
    }
}

function openPopUp(nameOfPopUp){
    nameOfPopUp.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopUp);
}

function closePopUp(nameOfPopUp){
    nameOfPopUp.classList.remove('popup_opened');
    nameOfPopUp.removeEventListener('keydown', escapePopUp);
    const form = nameOfPopUp.querySelector('.popup__inputs');
    if (form) {
        resetPopUpForm(form);
    }
}

function resetPopUpForm(form) {
    form.reset();
}

popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target == popup) {
            closePopUp(popup);
        }
    }); 
});

profileOpen.addEventListener('click', () => {
    openPopUp(popupChange);
    inputName.value = profileName.textContent;
    inputInfo.value = profileStatus.textContent;
});

postAdd.addEventListener('click', () => {
    openPopUp(popupAdd);
});

closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        closePopUp(popup);
    });
});

const handleProfileFormSubmit = (profileForm) => {
    if (inputName.value !== '' && inputInfo.value !== ''){
        profileName.textContent = inputName.value;
        profileStatus.textContent = inputInfo.value;
    }
}

function handleCardFormSubmit(cardForm){
    if (inputPlace.value !== ''  && inputPhoto.value !== '' && checkForImage(inputPhoto.value)){
        insertPublication(inputPlace.value, inputPhoto.value);
    }
}

function listenEventsProfileForm(profileForm){
    profileForm.addEventListener('submit', (event) => submitProfileForm(event, profileForm));
}

function submitProfileForm(event, profileForm) {
    const popup = profileForm.closest('.popup')
    event.preventDefault();
    handleProfileFormSubmit(profileForm);
    closePopUp(popup);
}

function listenEventsCardForm(cardForm){
    cardForm.addEventListener('submit', (event) => submitCardForm(event, cardForm));
}

function submitCardForm(event, cardForm) {
    const popup = cardForm.closest('.popup')
    event.preventDefault();
    handleCardFormSubmit(cardForm);
    event.target.reset();
    closePopUp(popup);
}

listenEventsProfileForm(profileForm);
listenEventsCardForm(cardForm);

const makeLike = (event, like) => {
    event.stopPropagation();
    like.classList.toggle('place__like_active');
};

function handleRemoveByClickBin(event, deleteButton) {
    const parent = deleteButton.closest('.place');
    event.stopPropagation();
    parent.remove();
}

function viewPublication(publication, name, photo){
    publication.addEventListener('click', function(event){
        event.preventDefault();
        popupPhoto.src = photo;
        popupPhoto.alt = photo.replace(/^.*[\\\/]/, '');
        popupDescription.textContent = name;
        openPopUp(popupPlace);
    });
}

function createCard(name, photo){
    const clone = document.querySelector('#template-place').content.querySelector('.place').cloneNode(true);
    const clonePhoto = clone.querySelector('.place__photo');
    const like = clone.querySelector('.place__like');
    const deleteButton = clone.querySelector('.place__delete');
    clone.querySelector('.place__name').textContent = name;
    clonePhoto.src = photo;
    clonePhoto.alt = photo.replace(/^.*[\\\/]/, '');
    like.addEventListener('click', (event) => makeLike(event, like));
    deleteButton.addEventListener('click', (event) => handleRemoveByClickBin(event, deleteButton));
    viewPublication(clone, name, photo);
    return clone;
}

function insertPublication(name, photo){
    const card = createCard(name, photo);
    placeCardsParent.prepend(card);
}

function makeInitialCards(initialCards){
    initialCards.forEach(item => {   
        insertPublication(item.name, item.link);
    });
}

makeInitialCards(initialCards);