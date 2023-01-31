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

const popupscloseButtons = document.querySelectorAll('.popup__close'); //Все крестики для закрытия попапов
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


const addCardFormValidator = new FormValidator(settings, cardForm);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

//2. Функции для работы с карточками place, генерации контента в блок places, вспомогательные функции

//2.1 Основные функции для карточек

//2.1.1 Функция создания новой карточки place
function createCard(cardFeaturesObject) {
    const card = new Card(cardFeaturesObject, '#template-place', viewPublication);
    const cardNewPlace = card.createCard();
    
    return cardNewPlace;
}

//2.1.2 Функция вставки новой карточки place в блок с публикациями данного профиля
function insertPublication(cardNewPlace) {
    placeCardsParent.prepend(cardNewPlace);
}

//2.1.3 Функция генерации карточек place по умолчанию из объекта
function makeInitialCards(initialCards) {
    initialCards.forEach(itemCard => {
        const cardFeaturesObject = {
            link: itemCard.link,
            name: itemCard.name
        };
        insertPublication(createCard(cardFeaturesObject));
    });
}

//Сгенерировать карточки по умолчанию в HTML-документ
makeInitialCards(initialCards);

//Пограничные функции - они между классом и хардкодом зависли..

//Функция удаления ошибок при открытии/закрытии попапа 
function deleteInputErrors(FormValidator) {
    FormValidator.hideInputErrorsWhenOpens();
}
//2.2 Вспомогательные функции для настройки взаимодействия с карточкой, установки слушателей

//Функция открытия попапа универсальная (активирует также слушатель на клавишу escape)
function openPopUp(nameOfPopUp) {
    nameOfPopUp.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopUp);
}

//Функция закрытия попапа универсальная (дизактивирует также слушатель на клавишу escape)
function closePopUp(nameOfPopUp) {
    if(nameOfPopUp.classList.contains('popup_opened')){
        nameOfPopUp.removeEventListener('keydown', escapePopUp);
        nameOfPopUp.classList.remove('popup_opened');
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
    popup.addEventListener('mousedown', (event) => {
        if (event.target == popup) closePopUp(popup);
    }); 
});

//Функция для закрытия попапа при нажатии на крестик в попапе
popupscloseButtons.forEach(closeButton => {
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
    deleteInputErrors(profileFormValidator);
    openPopUp(popupChange);
});
//Обработчик отправки формы при нажатии на кнопку на изменение профиля
const handleProfileFormSubmit = () => {
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputInfo.value;
}

//Функция для слушателя события отправки формы изменения профиля
function listenEventsProfileForm(profileForm) {
    profileForm.addEventListener('submit', (event) => submitProfileForm(event));
}
//Включить слушатель события на форму изменения профиля
listenEventsProfileForm(profileForm);

//Функция отправки формы изменения изменения профиля
function submitProfileForm(event) {
    event.preventDefault();
    handleProfileFormSubmit(profileForm);
    closePopUp(popupChange);
}

//Функция для слушателя события клика на добавление новой карточки place
postAdd.addEventListener('click', () => {
    deleteInputErrors(addCardFormValidator);
    resetPopUpForm(cardForm);
    addCardFormValidator.changeButtonStyle();
    openPopUp(popupAdd);
});
//Обработчик отправки формы при нажатии на кнопку на добавление карточки place
function handleCardFormSubmit() {
    const cardFeaturesObject = {
        link: inputPhoto.value,
        name: inputPlace.value
    };
    insertPublication(createCard(cardFeaturesObject));
}

//Функция для слушателя события отправки формы добавления новой карточки place
function listenEventsCardForm(cardForm) {
    cardForm.addEventListener('submit', (event) => submitCardForm(event));
}
//Включить слушатель события на форму добавления новой карточки place
listenEventsCardForm(cardForm);

//Функция отправки формы добавления новой карточки place
function submitCardForm(event) {
    event.preventDefault();
    handleCardFormSubmit();
    event.target.reset();
    closePopUp(popupAdd);
}

//Функция для просмотра карточки place - открытие попапа
function viewPublication(name, photoLink) {
    popupPhoto.src = photoLink;
    popupPhoto.alt = photoLink.replace(/^.*[\\\/]/, '');
    popupDescription.textContent = name;
    openPopUp(popupPlace);
}