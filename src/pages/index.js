//Самый основной файл .js - в него приходят все классы, начинается сборка Webpack, здесь открывается приложение
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

//1.1 Валидация формы с добавлением карточки place
const addCardFormValidator = new FormValidator(settings, cardForm);
addCardFormValidator.enableValidation();

//1.2 Валидация формы с изменением профиля пользователя
const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

//Функция удаления ошибок при открытии/закрытии попапа 
function deleteInputErrors(formValidator) {
    formValidator.hideInputErrorsWhenOpens();
}//предыдущая функция важная и никуда не относится, её сложно классифицировать


//2. Создание основной секции с карточками places и функции для его работы

//2.1 Функция создания html-представления карточки place для работы класса Section
function createCard(cardFeaturesObject) {
    const card = new Card(cardFeaturesObject, '#template-place', handleCardClick);
    const cardNewPlace = card.createCard();
    return cardNewPlace;
}

//2.2 Функция для внедрения карточки (отображения, вставки в HTML-разметку) в Section
function renderCard(cardData) {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
}

//2.3 ИТОГ - создание объекта Section для создание секции с изображениями по умолчанию и генерации places
const section = new Section({initialCards: initialCards, renderer: renderCard}, '.places__list');
section.renderItems();


//Блок работы с попапами - просмотра карточки place (3.1), добавления карточки place (3.2) и изменения профиля пользователя (3.3)

//3.1 Создание объекта для просмотра карточки place
const popupWithImage = new PopupWithImage('.popup_type_place');

function handleCardClick(imageName, photoLink) {
    popupWithImage.open(imageName, photoLink);
    popupWithImage.setEventListeners();
}

const popupProfile = new PopupWithForm('.popup_type_change-profile', submitProfileForm);
popupProfile.setEventListeners();

const userInfo = new UserInfo({htmlElementWithName: profileName, htmlElementWithInfo: profileStatus});

//Функция отправки формы изменения изменения профиля
function submitProfileForm(objectInputsWithValues) {
    userInfo.setUserInfo({nameAuthor: objectInputsWithValues["userName"], infoAuthor: objectInputsWithValues["userStatus"]});
}



//!!!!!Функция для слушателя события клика на изменение профиля
profileOpen.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().nameAuthor;
    inputInfo.value = userInfo.getUserInfo().infoAuthor;
    deleteInputErrors(profileFormValidator);
    popupProfile.open();
});


const publication = new PopupWithForm('.popup_type_add-publication', submitCardForm);
publication.setEventListeners();
//Функция отправки формы добавления новой карточки place
//Обработчик отправки формы при нажатии на кнопку на добавление карточки place

function submitCardForm(objectInputsWithValues) {
    renderCard(objectInputsWithValues);
}

//Функция для слушателя события клика на добавление новой карточки place
postAdd.addEventListener('click', () => {
    deleteInputErrors(addCardFormValidator);
    addCardFormValidator.changeButtonStyle();
    publication.open();
});

