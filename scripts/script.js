// let profileOpen = document.querySelector('.profile__changer');
// let popupClose = document.querySelector('.popup__close');
// let popupForm = document.querySelector('.popup');
// let popupButton = document.querySelector('.popup__button');
// let inputName = document.querySelector('.popup__input_type_name');
// let inputInfo = document.querySelector('.popup__input_type_info');

// let profileName = document.querySelector('.profile__name');
// let profileStatus = document.querySelector('.profile__status');

// let placeLikes = document.querySelectorAll('.place__like');

// profileOpen.addEventListener('click', function(){
//     popupForm.classList.toggle('popup_opened');
//     inputName.value = profileName.textContent;
//     inputInfo.value = profileStatus.textContent;
// });

// popupClose.addEventListener('click', function(){
//     popupForm.classList.toggle('popup_opened');
// });

// popupButton.addEventListener('click', function(event){
//     profileName.textContent = inputName.value;
//     profileStatus.textContent = inputInfo.value;
//     event.preventDefault();
//     popupForm.classList.toggle('popup_opened');
// });

// for (let placeLike of placeLikes) {
//     placeLike.addEventListener('click', function(){
//         placeLike.classList.toggle('place__like_active');
//     });
// }

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

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const placeLikes = document.querySelectorAll('.place__like');

const placeBins = document.querySelectorAll('.place__delete');

const placeCards = document.querySelectorAll('.place');

function openPopUp(nameOfPopUp){
    nameOfPopUp.classList.toggle('popup_opened');

}

profileOpen.addEventListener('click', function(){
    // popupChange.classList.toggle('popup_opened');
    openPopUp(popupChange);
    inputName.value = profileName.textContent;
    inputInfo.value = profileStatus.textContent;
});

postAdd.addEventListener('click', function(){
    // popupAdd.classList.toggle('popup_opened');
    openPopUp(popupAdd);
});



// popupForms.forEach(popupForm => {
//     popupForm.addEventListener('click', function(){
//         popupForm.classList.toggle('popup_opened');
//         });
// });


popupCloses.forEach(popupClose => {

    popupClose.addEventListener('click', function(){
        console.log('Третье');
        // popupClose.closest('.popup').classList.toggle('popup_opened');
        openPopUp(popupClose.closest('.popup'));
    });
});



popupButtons.forEach(popupButton => {
    
popupButton.addEventListener('click', function(event){
    console.log('Четвертое');
    event.preventDefault();
    popupButton.closest('.popup').classList.toggle('popup_opened');
    if (popupButton.closest('.popup').classList.contains('popup__change-profile')){
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputInfo.value;
    }
});
});

for (let placeLike of placeLikes) {
    
    placeLike.addEventListener('click', function(event){
        console.log('Пятое');
        event.stopPropagation();
        placeLike.classList.toggle('place__like_active');
    });
}



for (let placeBin of placeBins) {
    
    placeBin.addEventListener('click', function(event){
        console.log('Шестое');
        event.stopPropagation();
        let parent = placeBin.closest('.place');
        parent.remove();
    });
}


placeCards.forEach(placeCard => {
    
    placeCard.addEventListener('click', function(event){
        console.log('Седьмое');
        event.preventDefault();
        openPopUp(popupPlace);
        // console.log(popupPlace.childNodes[1].childNodes[1]);
        // console.log(placeCard.childNodes[1]);
        // console.log(placeCard.childNodes[5].childNodes[1]);
        // console.log(popupPlace.childNodes[1].childNodes);
        popupPlace.childNodes[1].childNodes[1].src = `${placeCard.childNodes[1].src}`;
        popupPlace.childNodes[1].childNodes[3].textContent = `${placeCard.childNodes[5].childNodes[1].textContent}`;
    });
    });

