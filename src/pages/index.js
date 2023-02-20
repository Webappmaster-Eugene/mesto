//Самый основной файл .js - в него приходят все классы, начинается сборка Webpack, здесь открывается приложение
//Основной файл .css, в который записывают файлы с классами стилей
import './index.css';

import settings from '../utils/settings.js'; //Объект с настройками для валидации

import { profileOpen, avatarChanger, postAdd, profileForm, cardForm, avatarForm, inputName, inputInfo, profileName, profileStatus, profileAvatar} 
from '../utils/consts.js'; //Переменные для работы в index.js 

import { apiUrlOptions } from '../utils/apiData.js'; //Настройки для работы с API

import Card from '../components/Card.js'; //Класс карточки place с фотографиями
import FormValidator from '../components/FormValidator.js'; //Класс для валидации попапов (по инпутам и вводу) - карточки и профиля
import Section from '../components/Section.js'; //Класс для создания секции с начальными карточками (секция с контентом places)
import PopupWithImage from '../components/PopupWithImage.js'; //Класс для работы с попапом изображения
import PopupWithForm from '../components/PopupWithForm.js'; //Класс для работы с 2-мя попапами с формами для отправки внутри
import PopupWithSubmit from '../components/PopupWithSubmit'; //Класс для работы с универсальным попапом подтверждения действия (в нашем случае пока - удаления карточики)
import { UserInfo } from '../components/UserInfo.js'; //Класс для работы с данными профиля пользователя
import { Api } from '../components/Api.js'; //Класс для работы с данными профиля пользователя

let currentUserId;
//Обращение к API для операций
const apiCall = new Api(apiUrlOptions);

//Создание объекта Section для создание секции с изображениями по умолчанию и генерации places
const section = new Section({renderer: renderCard}, '.places__list');

// //Класс для работы попапа с изменением профиля пользователя
const userInfo = new UserInfo({htmlElementWithName: profileName, htmlElementWithInfo: profileStatus, htmlElementWithAvatar: profileAvatar});

// Установка имени, статуса и аватарки профиля изначально при загрузке страницы
// Генерация карточек с помощью Api
// Делаем это через Promise.all, чтобы дождаться всез запросов с API 

Promise.all([apiCall.getInfoProfile(), apiCall.getInitialCards()])
    // тут деструктурируется ответ от сервера, чтобы было понятнее, что пришло
    .then(([userData, cards]) => {
        userInfo.setUserInfo({nameAuthor: userData.name, infoAuthor: userData.about});
        userInfo.setUserAvatar(userData.avatar);
        currentUserId = userData._id;

        section.renderItems(cards);
    })
    .catch(err => {
        console.log(`Ошибка при получении данных о пользователе или генерации карточек по умолчанию: ${err}`);
    });

//1. Валидация инпутов в попапах с изменением содержимого

//1.1 Валидация формы с добавлением карточки place
const addCardFormValidator = new FormValidator(settings, cardForm);
addCardFormValidator.enableValidation();

//1.2 Валидация формы с изменением профиля пользователя
const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

//1.3 Валидация формы с изменением аватарки пользователя
const changeAvatarValidator = new FormValidator(settings, avatarForm);
changeAvatarValidator.enableValidation();

//Функция удаления ошибок при открытии/закрытии попапа 
function deleteInputErrors(formValidator) {
    formValidator.hideInputErrorsWhenOpens();
}
//предыдущая функция важная и никуда не относится, её сложно классифицировать

//2. Создание основной секции с карточками places и функции для его работы

//2.1 Функция создания html-представления карточки place для работы класса Section
function createCard(cardFeaturesObject) {
    const card = new Card(cardFeaturesObject, '#template-place', 
    {
    currentUserId: currentUserId,
    makeLikeToCard: ((cardId) => {
        apiCall.makeLikeToCard(cardId)
            .then((res) => {
                card.toggleLikeButtonFront(res);
            })
            .catch((error) => {console.log(`Ошибка при установке лайка : ${error}`)})
    }), 
    deleteLikeFromCard: ((cardId) => {
        apiCall.deleteLikeFromCard(cardId)
            .then((res) => {
                card.toggleLikeButtonFront(res);
        })
        .catch((error) => {console.log(`Ошибка при удалениии лайка из карточки : ${error}`)})
    }), 
    deleteCard: ((cardId) => {
        deleteCardPopup.open();
        deleteCardPopup.chooseCallbackHandler(() => {
        deleteCardPopup.loadingData('Сохраняется');
        apiCall.deleteCard(cardId)
            .then(() => {
                card.removeCardFromDOM(cardId);
                deleteCardPopup.close();
            })
            .catch((error) => {console.log(`Ошибка при удалении карточки по API: ${error}`)})
            .finally(() => {
                setTimeout(() => {
                    deleteCardPopup.loadingData('Да');
                }, 0);
            })
        });
    }), 
    functionOpenPlacePopUp: handleCardClick
    });

    const cardNewPlace = card.createCard();
    return cardNewPlace;
}

//2.2 Функция для внедрения карточки (отображения, вставки в DOM) в Section
function renderCard(cardData) {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
}

//3. Блок работы с попапами - просмотра карточки place (3.1), изменения профиля пользователя (3.2), добавления карточки place (3.2), изменения аватарки пользователя (3.4)
const deleteCardPopup = new PopupWithSubmit('.popup_type_sure');
deleteCardPopup.setEventListeners();

//3.1 Создание объекта для просмотра карточки place
const popupWithImage = new PopupWithImage('.popup_type_place');
popupWithImage.setEventListeners();

//Функция-обработчик открытия попапа с изображением карточки place
function handleCardClick(imageName, photoLink) {
    popupWithImage.open(imageName, photoLink);
}

//3.2 Попап работы с изменением профиля пользователя
const changeProfileInfoPopup = new PopupWithForm('.popup_type_change-profile', 
    (objectInputsWithValues) => {
        changeProfileInfoPopup.loadingData('Сохранение...');
        apiCall.changeInfoProfile(objectInputsWithValues)
        .then((response) => {
            userInfo.setUserInfo({nameAuthor: response.name, infoAuthor: response.about});
            changeProfileInfoPopup.close();
        })
        .catch((reject) => {console.log(`Ошибка при изменении данных профиля: ${reject}`)})
        .finally(() => {
            setTimeout(() => {
                changeProfileInfoPopup.loadingData('Создать');
            }, 0);
        })
    });
    changeProfileInfoPopup.setEventListeners();

//3.3 Попап для добавления новой карточки place
const addPublicationWithPopup = new PopupWithForm('.popup_type_add-publication', 
    (objectInputsWithValues) => {
        addPublicationWithPopup.loadingData('Загрузка...');
        apiCall.addNewCard(objectInputsWithValues)
        .then((response) => {
            const cardElement = createCard(response);
            section.addItemToTop(cardElement);
            addPublicationWithPopup.close();
        })
        .catch((reject) => {console.log(`Ошибка при загрузке данных новой карточки на сервер: ${reject}`)})
        .finally(() => {
            setTimeout(() => {
                addPublicationWithPopup.loadingData('Создать');
            }, 0);
        })
    });
    addPublicationWithPopup.setEventListeners();

//3.4 Попап для изменения аватарки пользователя
const changeAvatarWithPopup = new PopupWithForm('.popup_type_change-avatar', 
    (objectInputsWithValues) => {
        changeAvatarWithPopup.loadingData('Сохранение');
        apiCall.changeAvatarProfile(objectInputsWithValues)
            .then((response) => {
                userInfo.setUserAvatar(response.avatar);
                changeAvatarWithPopup.close();
            })
            .catch((reject) => {console.log(`Ошибка при изменении аватарки в профиле: ${reject}`)})
            .finally(() => {
                setTimeout(() => {
                    changeAvatarWithPopup.loadingData('Сохранить');
                }, 0);
        })
});
    changeAvatarWithPopup.setEventListeners();

//Функция для слушателя события клика на изменение профиля
profileOpen.addEventListener('click', () => {
    const userInfoObject = userInfo.getUserInfo();

    inputName.value = userInfoObject.nameAuthor;
    inputInfo.value = userInfoObject.infoAuthor;
    deleteInputErrors(profileFormValidator);
    changeProfileInfoPopup.open();
});

//Функция для слушателя события клика на добавление новой карточки place
postAdd.addEventListener('click', () => {
    deleteInputErrors(addCardFormValidator);
    addCardFormValidator.changeButtonStyle();
    addPublicationWithPopup.open();
});

//Функция для слушателя события клика на добавление новой карточки place
avatarChanger.addEventListener('click', () => {
    deleteInputErrors(changeAvatarValidator);
    changeAvatarValidator.changeButtonStyle();
    changeAvatarWithPopup.open();
});