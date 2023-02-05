import './index.css';

import initialCards from '../utils/initialCards.js'; //Объект с карточками по умолчанию
import settings from '../utils/settings.js'; //Объект с настройками для валидации
import { profileOpen, postAdd, profileForm, cardForm, inputName, inputInfo, inputPlace, inputPhoto, profileName, profileStatus } from '../utils/consts.js'; //Переменные для работы в index.js 

import Card from '../components/Card.js'; //Класс карточки place с фотографиями
import FormValidator from '../components/FormValidator.js'; //Класс для валидации попапов (по инпутам и вводу) - карточки и профиля
import Section from '../components/Section.js'; //Класс для создания секции с начальными карточками (секция с контентом places)
import PopupWithImage from '../components/PopupWithImage.js'; //Класс для работы с попапом изображения
import PopupWithForm from '../components/PopupWithForm.js'; //Класс для работы с 2-мя попапами с формами для отправки внутри
import { UserInfo } from '../components/UserInfo'; //Класс для работы с данными профиля пользователя

//1. Валидация инпутов в попапах с изменением содержимого

const addCardFormValidator = new FormValidator(settings, cardForm);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

//Для работы класса Section
function createCard(cardFeaturesObject) {
    const card = new Card(cardFeaturesObject, '#template-place', handleCardClick);
    const cardNewPlace = card.createCard();
    return cardNewPlace;
}

function renderCard(cardData) {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
}

function handleCardClick(name, photoLink) {
    const popupWithImage = new PopupWithImage('.popup_type_place', name, photoLink);
    popupWithImage.setEventListeners();
    popupWithImage.open();
}

const section = new Section({initialCards: initialCards, renderer: renderCard}, '.places__list');
section.renderItems();

//Функция удаления ошибок при открытии/закрытии попапа 
function deleteInputErrors(formValidator) {
    formValidator.hideInputErrorsWhenOpens();
}
//предыдущая функция важная и никуда не относится, её сложно классифицировать

//Функция отправки формы изменения изменения профиля
function submitProfileForm(event) {
    event.preventDefault();
    handleProfileFormSubmit();
    popupProfile.close();
}

const userInfo = new UserInfo({htmlElementWithName: profileName, htmlElementWithInfo: profileStatus});
//Обработчик отправки формы при нажатии на кнопку на изменение профиля
const handleProfileFormSubmit = () => {
    userInfo.setUserInfo({nameAuthor: inputName, infoAuthor: inputInfo});
};

//Функция для слушателя события клика на изменение профиля
profileOpen.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().nameAuthor;
    inputInfo.value = userInfo.getUserInfo().infoAuthor;
    deleteInputErrors(profileFormValidator);
    popupProfile.open();
});
const popupProfile = new PopupWithForm('.popup_type_change-profile', submitProfileForm);

//Функция отправки формы добавления новой карточки place
function submitCardForm(event) {
    event.preventDefault();
    handleCardFormSubmit();
    publication.close();
}

//Обработчик отправки формы при нажатии на кнопку на добавление карточки place
function handleCardFormSubmit() {
    const cardFeaturesObject = {
        link: inputPhoto.value,
        name: inputPlace.value
    };
    renderCard(cardFeaturesObject);
}

//Функция для слушателя события клика на добавление новой карточки place
postAdd.addEventListener('click', () => {
    deleteInputErrors(addCardFormValidator);
    addCardFormValidator.changeButtonStyle();
    publication.open();
});

const publication = new PopupWithForm('.popup_type_add-publication', submitCardForm);