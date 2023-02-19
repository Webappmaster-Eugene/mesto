//Самый основной файл .js - в него приходят все классы, начинается сборка Webpack, здесь открывается приложение
//Основной файл .css, в который записывают файлы с классами стилей
import './index.css';

import initialCards from '../utils/initialCards.js'; //Объект с карточками по умолчанию
import settings from '../utils/settings.js'; //Объект с настройками для валидации

import { profileOpen, avatarChanger, postAdd, profileForm, cardForm, avatarForm, inputName, inputInfo, profileName, profileStatus, profileAvatar} 
from '../utils/consts.js'; //Переменные для работы в index.js 

import { apiUrlOptions } from '../utils/apiData.js'; //Переменные для работы в index.js 

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
let initCards = apiCall.getInitialCards();

// apiCall.addNewCard({name: "Лучше гор-Толя", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"});
// console.log(apiCall.getInitialCards());
// apiCall.getInfoProfile();
// apiCall.changeInfoProfile({name: "James", about: "Bonder"});




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

//2.1 Функция создания html-представления карточки place для работы класса Section !!!!!САМАЯ ВАЖНАЯ ФУНКЦИЯ
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
        console.log(cardId);
        apiCall.deleteCard(cardId)
            .then(() => {
                console.log(card);
                card.removeCardFromDOM(cardId);
            })
            .catch((error) => {console.log(`Ошибка при удалении карточки по API: ${error}`)})
    }), 
    functionOpenPlacePopUp: handleCardClick});
    const cardNewPlace = card.createCard();
    return cardNewPlace;
}

//2.2 Функция для внедрения карточки (отображения, вставки в HTML-разметку) в Section
function renderCard(cardData) {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
}

//2.3 ИТОГ - создание объекта Section для создание секции с изображениями по умолчанию и генерации places

//Старый статический способ из готового объекта c places
// const section = new Section({initialCards: initialCards, renderer: renderCard}, '.places__list');
// section.renderItems();

// Новый способ генерации с помощью Api

const section = new Section({renderer: renderCard}, '.places__list');

initCards.then(res => {
    section.renderItems(res);
})



//Блок работы с попапами - просмотра карточки place (3.1), добавления карточки place (3.2) и изменения профиля пользователя (3.3)

//3.1 Создание объекта для просмотра карточки place
const popupWithImage = new PopupWithImage('.popup_type_place');
popupWithImage.setEventListeners();

function handleCardClick(imageName, photoLink) {
    popupWithImage.open(imageName, photoLink);
}


const changeProfileInfoPopup = new PopupWithForm('.popup_type_change-profile', 
    (objectInputsWithValues) => {
        changeProfileInfoPopup.loadingData('Сохранение...');
        apiCall.changeInfoProfile(objectInputsWithValues)
        .then((response) => {
            userInfo.setUserInfo({nameAuthor: response.name, infoAuthor: response.about});
        })
        .catch((reject) => {console.log(`Ошибка при изменении данных профиля: ${reject}`)})
        .finally(() => {
            setTimeout(() => {
                changeProfileInfoPopup.loadingData('Создать');
                changeProfileInfoPopup.close();
            }, 0);
        })
    });
changeProfileInfoPopup.setEventListeners();


const userInfo = new UserInfo({htmlElementWithName: profileName, htmlElementWithInfo: profileStatus, htmlElementWithAvatar: profileAvatar});

apiCall.getInfoProfile()
    .then (res => {
        userInfo.setUserInfo({nameAuthor: res.name, infoAuthor: res.about});
        userInfo.setUserAvatar(res.avatar);
        currentUserId = res._id;
    })
    .catch((err) => {
        console.log(`Ошибка получения данных о пользователе - getInfoProfile завершен неудачно: ${err}`);
});

//Функция отправки формы изменения изменения профиля


//!!!!!Функция для слушателя события клика на изменение профиля
profileOpen.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().nameAuthor;
    inputInfo.value = userInfo.getUserInfo().infoAuthor;
    deleteInputErrors(profileFormValidator);
    changeProfileInfoPopup.open();
});


const addPublicationWithPopup = new PopupWithForm('.popup_type_add-publication', 
    (objectInputsWithValues) => {
        addPublicationWithPopup.loadingData('Загрузка...');
        apiCall.addNewCard(objectInputsWithValues)
        .then((response) => {
            let cardElement = createCard(response);
            section.addItemToTop(cardElement);
        })
        .catch((reject) => {console.log(`Ошибка при загрузке данных новой карточки на сервер: ${reject}`)})
        .finally(() => {
            setTimeout(() => {
                addPublicationWithPopup.loadingData('Создать');
                addPublicationWithPopup.close();
            }, 0);
        })
    });
addPublicationWithPopup.setEventListeners();

//Функция отправки формы добавления новой карточки place
//Обработчик отправки формы при нажатии на кнопку на добавление карточки place

function submitCardForm(objectInputsWithValues) {
    renderCard(objectInputsWithValues);
}

//Функция для слушателя события клика на добавление новой карточки place
postAdd.addEventListener('click', () => {
    deleteInputErrors(addCardFormValidator);
    addCardFormValidator.changeButtonStyle();
    addPublicationWithPopup.open();
});


const changeAvatarWithPopup = new PopupWithForm('.popup_type_change_avatar', 
    (objectInputsWithValues) => {
        changeProfileInfoPopup.loadingData('Сохранение');
        apiCall.changeAvatarProfile(objectInputsWithValues)
            .then((response) => {
                userInfo.setUserAvatar(response.avatar);
            })
            .catch((reject) => {console.log(`Ошибка при изменении аватарки в профиле: ${reject}`)})
            .finally(() => {
                setTimeout(() => {
                    changeProfileInfoPopup.loadingData('Сохранить');
                    changeProfileInfoPopup.close();
                }, 0);
        })
});
    const changeAvatarValidator = new FormValidator(settings, avatarForm);
    changeAvatarValidator.enableValidation();

    changeAvatarWithPopup.setEventListeners();


avatarChanger.addEventListener('click', () => {
    deleteInputErrors(changeAvatarValidator);
    addCardFormValidator.changeButtonStyle();
    changeAvatarWithPopup.open();
});