let profileChanger = document.querySelector('.profile__changer');
let button = document.querySelector('.button');
let popupClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

let inputName = document.querySelector('.popup__input_type_name');
let inputInfo = document.querySelector('.popup__input_type_info');

profileChanger.addEventListener('click', function(){
    popup.classList.toggle('popup_display-none');
});

popupClose.addEventListener('click', function(){
    popup.classList.toggle('popup_display-none');
});

button.addEventListener('click', function(){
    popup.classList.toggle('popup_display-none');
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputInfo.value;
});

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

inputName.value = profileName.textContent;
inputInfo.value = profileStatus.textContent;

let placeLikes = document.querySelectorAll('.place__like');

for (let placeLike of placeLikes) {
    placeLike.addEventListener('click', function(){
        placeLike.classList.toggle('place__like_active');
    });
}

