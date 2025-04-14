const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editFormElement.querySelector("#profile-name-input");
const descriptionInput = editFormElement.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#new-post-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const linkInput = addCardFormElement.querySelector("card-image-input");
const captionInput = addCardFormElement.querySelector("card-caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(".modal__close-button");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewNameElement = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    const deletePicture = cardDeleteButton.closest(".card");
    deletePicture.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewNameElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

addCardButton.addEventListener("click", function () {
  openModal(addCardModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

addCardCloseButton.addEventListener("click", function () {
  closeModal(addCardModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

editFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: captionInput.value,
    link: linkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(addCardModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
