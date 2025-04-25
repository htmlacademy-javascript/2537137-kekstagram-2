import { makePhotos } from './create-array-photos.js';
const photos = makePhotos();

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsItem = bigPicture.querySelector('.social__comment');
const caption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const toCloseWithButton = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const toCloseWithKey = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', toCloseWithButton);
  document.removeEventListener('keydown', toCloseWithKey);
}

const renderBigPicture = (photoId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(photoId));
  const commentsFragment = document.createDocumentFragment();

  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsList.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const newCommentsList = commentsItem.cloneNode(true);

    newCommentsList.querySelector('.social__picture').src = comment.avatar;
    newCommentsList.querySelector('.social__picture').alt = comment.name;
    newCommentsList.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(newCommentsList);
  });

  commentsList.append(commentsFragment);
  caption.textContent = currentPhoto.description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', toCloseWithButton);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', toCloseWithKey);
};

const initPreview = () => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      renderBigPicture(currentPicture.dataset.pictureId);
    }
  });
};

export { initPreview };
