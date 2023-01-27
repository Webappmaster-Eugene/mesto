import initialCards from './initialCards.js'; //Объект с карточками по умолчанию
import settings from './settings.js'; //Объект с настройками для валидации
import Card from './Card.js'; //Класс карточки place с фотографиями
import FormValidator from './FormValidator.js'; //Класс для валидации попапов (по инпутам и вводу) - карточки и профиля

const profileOpen = document.querySelector('.profile__changer'); //Иконка для изменения профиля
const postAdd = document.querySelector('.profile__new-post-add'); //Иконка плюса для добавления новой карточки публикации

const popups = document.querySelectorAll('.popup'); //Все попапы
const popupChange = document.querySelector('.popup_type_change-profile'); //Конкретно попап изменения профиля
const popupAdd = document.querySelector('.popup_type_add-publication'); //Конкретно попап добавления новой карточки публикации
const popupPlace = document.querySelector('.popup_type_place'); //Конкретно попап просмотра места (просто фото карточки с текстом)

const profileForm = document.forms["profile-form"]; //Форма изменения профиля
const cardForm = document.forms["card-form"]; //Форма добавления карточки

const closeButtons = document.querySelectorAll('.popup__close'); //Все крестики для закрытия попапов
const inputName = document.querySelector('.popup__input_type_name'); //Инпут с именем в попапе изменения профиля
const inputInfo = document.querySelector('.popup__input_type_info'); //Инпут с информацией (статусом) в попапе изменения профиля

const popupPhoto = popupPlace.querySelector('.popup__photo'); //Фото в попапе просмотра карточки place
const popupDescription = popupPlace.querySelector('.popup__description'); //Описание в попапе просмотра карточки place

const inputPlace = document.querySelector('.popup__input_type_place'); //Инпут с описанием в попапе добавления карточки place
const inputPhoto = document.querySelector('.popup__input_type_photo'); //Инпут с ссылкой на фото в попапе добавления карточки place

const profileName = document.querySelector('.profile__name'); //Поле в документе с именем профиля
const profileStatus = document.querySelector('.profile__status'); //Поле в документе со статусом (описанием) профиля

const placeCardsParent = document.querySelector('.places__list'); //Блок в документе с карточками places

//1. Валидация инпутов в попапах с изменением содержимого
const profileFormValidation = new FormValidator(settings, profileForm);
const addCardFormValidation = new FormValidator(settings, cardForm);
profileFormValidation._enableValidation();
addCardFormValidation._enableValidation();

//2. Функции для работы с карточками place, генерации контента в блок places

//Функция создания новой карточки place
function createCard(cardFeaturesObject) {
    const card = new Card(cardFeaturesObject, '#template-place', viewPublication);
    const cardNewPlace = card._createCard();
    return cardNewPlace;
}

//Функция вставки новой карточки place в блок с публикациями данного профиля
function insertPublication(cardNewPlace) {
    placeCardsParent.prepend(cardNewPlace);
}

//Функция генерации карточек place по умолчанию из объекта
function makeInitialCards(initialCards) {
    initialCards.forEach(itemCard => {
        let cardFeaturesObject = {
            name: itemCard.name,
            link: itemCard.link,
        };
        insertPublication(createCard(cardFeaturesObject));
    });
}

//Сгенерировать карточки по умолчанию в HTML-документ
makeInitialCards(initialCards);

//Пограничные функции - нет категории для разнесения 

//Функция удаления ошибок ПОАОАЛЛЕОЕПЬПЕТТПП
function deleteInputErrors(form) {
const openDeafultFormValidation = new FormValidator(settings, form);

const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
inputList.forEach(errorInputMessage => {
    openDeafultFormValidation._hideInputError(errorInputMessage);
    });
}

//2.1 Вспомогательные функции для настройки взаимодействия с карточкой, установки слушателей, 

//Функция открытия попапа универсальная (активирует также слушатель на клавишу escape)
function openPopUp(nameOfPopUp) {
    nameOfPopUp.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopUp);
}

//Функция закрытия попапа универсальная (дизактивирует также слушатель на клавишу escape)
function closePopUp(nameOfPopUp) {
    if(nameOfPopUp.classList.contains('popup_opened')){
        nameOfPopUp.classList.remove('popup_opened');
        nameOfPopUp.removeEventListener('keydown', escapePopUp);
    } 
}

//Функция закрытия попапа по нажатию на Esc на клаве
function escapePopUp(e) {
    if (e.key === 'Escape') {
        closePopUp(document.querySelector('.popup_opened'));
    }
}

//Функция закрытия попапа, если клик мышкой произошел вне области попапа
popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target == popup) {
            closePopUp(popup);
        }
    }); 
});

//Функция для закрытия попапа при нажатии на крестик в попапе
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        closePopUp(popup);
    });
});

//Функция стирания инпутов в форме изменения в попапе
function resetPopUpForm(form) {
    form.reset();
}

//Функция для слушателя события клика на изменение профиля
profileOpen.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputInfo.value = profileStatus.textContent;
    deleteInputErrors(profileForm);
    openPopUp(popupChange);
});

//Обработчик отправки формы при нажатии на кнопку на изменение профиля
const handleProfileFormSubmit = () => {
    if (inputName.value !== '' && inputInfo.value !== '') {
        profileName.textContent = inputName.value;
        profileStatus.textContent = inputInfo.value;
    }
}

//Функция для слушателя события отправки формы изменения профиля
function listenEventsProfileForm(profileForm) {
    profileForm.addEventListener('submit', (event) => submitProfileForm(event));
}

//Функция отправки формы изменения профиля
function submitProfileForm(event) {
    const popup = profileForm.closest('.popup')
    event.preventDefault();
    handleProfileFormSubmit(profileForm);
    closePopUp(popup);
}

//Функция для слушателя события клика на добавление новой карточки place
postAdd.addEventListener('click', () => {
    resetPopUpForm(cardForm);
    deleteInputErrors(cardForm);
    addCardFormValidation._changeButtonStyle();
    // toggleButtonState(Array.from(cardForm.querySelectorAll(settings.inputSelector)), cardForm.querySelector(settings.submitButtonSelector), settings.inactiveButtonClass);
    openPopUp(popupAdd);
});

//Обработчик отправки формы при нажатии на кнопку на изменение карточки place
function handleCardFormSubmit(){
    if (inputPlace.value !== ''  && inputPhoto.value !== '') {
        insertPublication(inputPlace.value, inputPhoto.value);
    }
}

//Функция для слушателя события отправки формы добавления новой карточки place
function listenEventsCardForm(cardForm) {
    cardForm.addEventListener('submit', (event) => submitCardForm(event));
}

//Функция отправки формы добавления новой карточки place
function submitCardForm(event) {
    const popup = cardForm.closest('.popup')
    event.preventDefault();
    handleCardFormSubmit(cardForm);
    event.target.reset();
    closePopUp(popup);
}

//Функция для просмотра карточки place - открытие попапа
function viewPublication(name, photoLink) {
    popupPhoto.src = photoLink;
    popupPhoto.alt = photoLink.replace(/^.*[\\\/]/, '');
    popupDescription.textContent = name;
    openPopUp(popupPlace);
}

//Включить слушатели события на формы в попапах
listenEventsProfileForm(profileForm);
listenEventsCardForm(cardForm);