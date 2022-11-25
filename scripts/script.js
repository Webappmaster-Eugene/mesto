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

const popupForms = document.querySelectorAll('.popup');
const popupChange = document.querySelector('.popup_type_change-profile');
const popupAdd = document.querySelector('.popup_type_add-publication');
const popupPlace = document.querySelector('.popup_type_place');

const popupCloses = document.querySelectorAll('.popup__close');
const popupButtons = document.querySelectorAll('.popup__button');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputPhoto = document.querySelector('.popup__input_type_photo');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const placeCards = document.querySelectorAll('.place');
const placeLikes = document.querySelectorAll('.place__like');
const placeBins = document.querySelectorAll('.place__delete');
const placeCardsParent = document.querySelector('.places__list');

function openPopUp(nameOfPopUp){
    nameOfPopUp.classList.toggle('popup_opened');
}

profileOpen.addEventListener('click', function(){
    openPopUp(popupChange);
    inputName.value = profileName.textContent;
    inputInfo.value = profileStatus.textContent;
});

postAdd.addEventListener('click', function(){
    openPopUp(popupAdd);
});

popupCloses.forEach(popupClose => {
    popupClose.addEventListener('click', function(){
        openPopUp(popupClose.closest('.popup'));
    });
});

popupButtons.forEach(popupButton => {
    popupButton.addEventListener('click', function(event){
        event.preventDefault();
        if ((inputName.value !== '' && inputInfo.value !== '' && popupButton.closest('.popup').classList.contains('popup_type_change-profile')) 
        || (inputPlace.value !== ''  && inputPhoto.value !== '' && popupButton.closest('.popup').classList.contains('popup_type_add-publication'))){
            popupButton.closest('.popup').classList.toggle('popup_opened');
            if (popupButton.closest('.popup').classList.contains('popup_type_change-profile')){
                profileName.textContent = inputName.value;
                profileStatus.textContent = inputInfo.value;
            }
            if (popupButton.closest('.popup').classList.contains('popup_type_add-publication')){
                createPublication(inputPlace.value, inputPhoto.value);
            }
        }
    });
});

function makeLike(placeLike){
    placeLike.addEventListener('click', function(event){
        event.stopPropagation();
        placeLike.classList.toggle('place__like_active');
    });
}

function deleteBin (placeBin){
    placeBin.addEventListener('click', function(event){
        event.stopPropagation();
        let parent = placeBin.closest('.place');
        parent.remove();
    });
}

function viewPublication(publication){
    publication.addEventListener('click', function(event){
        event.preventDefault();
        openPopUp(popupPlace);
        popupPlace.childNodes[1].childNodes[1].src = `${publication.childNodes[1].src}`;
        popupPlace.childNodes[1].childNodes[3].textContent = `${publication.childNodes[5].childNodes[1].textContent}`;
    });
}

function createPublication(name, photo){
    document.querySelector('#template-place').content.querySelector('.place__name').textContent = name;
    document.querySelector('#template-place').content.querySelector('.place__photo').src = photo;
    let clone = document.querySelector('#template-place').content.querySelector('.place').cloneNode(true);
    makeLike(clone.querySelector('.place__like'));
    deleteBin(clone.querySelector('.place__delete'));
    viewPublication(clone);
    placeCardsParent.insertBefore(clone,placeCardsParent.children[0]);
}

let begin = initialCards.forEach(item => {   
    createPublication(item.name, item.link);
});
