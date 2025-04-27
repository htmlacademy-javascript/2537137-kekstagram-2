const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsItem = bigPicture.querySelector('.social__comment');
const caption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const isEscKey = (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', isEscKey);
}

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentNode = commentsItem.cloneNode(true);

    commentNode.querySelector('.social__picture').src = comment.avatar;
    commentNode.querySelector('.social__picture').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentNode);
  });

  commentsList.append(commentsFragment);
};

const renderBigPicture = (currentPhoto) => {
  bigPictureImg.src = currentPhoto.url;
  bigPicture.classList.remove('hidden');
  likesCount.textContent = currentPhoto.likes;
  caption.textContent = currentPhoto.description;

  commentsList.innerHTML = '';
  renderComments(currentPhoto.comments);

  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', isEscKey);
};

const initPreview = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();

    const currentPicture = evt.target.closest('.picture');

    if(!currentPicture) {
      return;
    }

    const currentPhoto = photos.find((photo) => photo.id === Number(currentPicture.dataset.pictureId));

    if (currentPhoto) {
      renderBigPicture(currentPhoto);
    }
  });
};

export { initPreview };
