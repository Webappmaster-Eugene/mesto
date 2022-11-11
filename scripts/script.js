let profileOpen = document.querySelector('.profile__changer');
let popupClose = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup');
let popupButton = document.querySelector('.popup__button');
let inputName = document.querySelector('.popup__input_type_name');
let inputInfo = document.querySelector('.popup__input_type_info');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let placeLikes = document.querySelectorAll('.place__like');

profileOpen.addEventListener('click', function(){
    popupForm.classList.toggle('popup_opened');
    inputName.value = profileName.textContent;
    inputInfo.value = profileStatus.textContent;
});

popupClose.addEventListener('click', function(){
    popupForm.classList.toggle('popup_opened');
});

popupButton.addEventListener('click', function(event){
    profileName.textContent = inputName.value;
    profileStatus.textContent = inputInfo.value;
    event.preventDefault();
    popupForm.classList.toggle('popup_opened');
});

for (let placeLike of placeLikes) {
    placeLike.addEventListener('click', function(){
        placeLike.classList.toggle('place__like_active');
    });
}