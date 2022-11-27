const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

const profileOpen = document.querySelector('.profile__changer');
const postAdd = document.querySelector('.profile__add');

const popupChange = document.querySelector('.popup_type_change-profile');
const popupAdd = document.querySelector('.popup_type_add-publication');
const popupPlace = document.querySelector('.popup_type_place');

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const closeButtons = document.querySelectorAll('.popup__close');
const popupButtons = document.querySelectorAll('.popup__button');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputPhoto = document.querySelector('.popup__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const placeCardsParent = document.querySelector('.places__list');

function togglePopUp(nameOfPopUp){
    nameOfPopUp.classList.toggle('popup_opened');
    resetInputs(nameOfPopUp);
}

profileOpen.addEventListener('click', function(){
    togglePopUp(popupChange);
    inputName.value = profileName.textContent;
    inputInfo.value = profileStatus.textContent;
});

postAdd.addEventListener('click', function(){
    togglePopUp(popupAdd);
});

closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', function(){
        togglePopUp(closeButton.closest('.popup'));
    });
});

function checkForImage(url){
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    let result;
    if (url.match(regex)){
        result = {
            match: url.match(regex)
        }
    } else {
        result = false;
    }
    return result;
}

function handleProfileFormSubmit(profileForm){
    if (profileForm.closest('.popup').classList.contains('popup_type_change-profile') && inputName.value !== '' && inputInfo.value !== ''){
        profileName.textContent = inputName.value;
        profileStatus.textContent = inputInfo.value;
    }
}

function handleCardFormSubmit(cardForm){
    if (cardForm.closest('.popup').classList.contains('popup_type_add-publication') && inputPlace.value !== ''  && inputPhoto.value !== '' && checkForImage(inputPhoto.value)){
        insertPublication(inputPlace.value, inputPhoto.value);
    }
    else alert('Введите правильный url-адрес для фотографии и попробуйте ещё раз!');
}

function resetInputs(form){
    form.querySelectorAll('.popup__input').forEach(input => {
        input.value = '';
    });
}

function submitProfileForm(profileForm){
    profileForm.addEventListener('submit', function(event){
        event.preventDefault();
        handleProfileFormSubmit(profileForm);
        togglePopUp(profileForm.closest('.popup'));
    });
}

submitProfileForm(profileForm);

function submitCardForm(cardForm){
    cardForm.addEventListener('submit', function(event){
        event.preventDefault();
        handleCardFormSubmit(cardForm);
        resetInputs(cardForm);
        togglePopUp(cardForm.closest('.popup'));
    });
}

submitCardForm(cardForm);

//ПОЖАЛУЙСТА, ПОДСКАЖИТЕ МНЕ МОЮ ОШИБКУ! ОЧЕНЬ ВАМ БЛАГОДАРНА!
//Геннадий, подскажите пожалуйста, почему не работают данных два вызова стрелочных функций?
//Когда закомментирую function declaration-выражения, то почему-то срабатывает post отправка формы на сервер, как будто нет event.preventDefault(), а скорее мои стрелочные анонимные функции вообще не отрабатывают
//При том, что их аналоги - функции работают отлично, как видите.
//Либо я не понимаю особенности function expression в данном случае, либо что-то не так делаю..
//По моей логике - они должны вызываться автоматически, event.preventDefault() там есть...
// ПЕРВАЯ ФУНКЦИЯ
// const submitProfileForm = (profileForm) => {
//     profileForm.addEventListener('submit', function(event){
//         event.preventDefault();
//         handleProfileFormSubmit(profileForm);
//         togglePopUp(profileForm.closest('.popup'));
//     });
// };
// ВТОРАЯ ФУНКЦИЯ
// Вот вторая анонимная функция, которая тоже не работает
// const submitCardForm = () => {
//     cardForm.addEventListener('submit', function(event){
//         event.preventDefault();
//         handleCardFormSubmit(cardForm);
//         togglePopUp(cardForm.closest('.popup'));
//     });
// };

function makeLike(placeLike){
    placeLike.addEventListener('click', function(event){
        event.stopPropagation();
        placeLike.classList.toggle('place__like_active');
    });
}

function handleRemoveByClickBin(placeBin){
    placeBin.addEventListener('click', function(event){
        event.stopPropagation();
        const parent = placeBin.closest('.place');
        parent.remove();
    });
}

function viewPublication(publication){
    publication.addEventListener('click', function(event){
        event.preventDefault();
        togglePopUp(popupPlace);
        popupPlace.querySelector('.popup__photo').src = publication.querySelector('.place__photo').src;
        popupPlace.querySelector('.popup__description').textContent = publication.querySelector('.place__name').textContent;
    });
}

function createCard(name, photo){
    const clone = document.querySelector('#template-place').content.querySelector('.place').cloneNode(true);
    clone.querySelector('.place__name').textContent = name;
    clone.querySelector('.place__photo').src = photo;
    clone.querySelector('.place__photo').alt = photo.replace(/^.*[\\\/]/, '');
    makeLike(clone.querySelector('.place__like'));
    handleRemoveByClickBin(clone.querySelector('.place__delete'));
    viewPublication(clone);
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