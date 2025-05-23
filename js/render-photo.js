const COMMENTS_PER_CLICK = 5;
let currentComments = [];
let shownCommentsCount = 0;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsItem = bigPicture.querySelector('.social__comment');
const caption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const isEscKey = (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
};

const updateCommentsCounter = () => {
  commentsCount.querySelector('.social__comment-shown-count').textContent = shownCommentsCount;
  commentsCount.querySelector('.social__comment-total-count').textContent = currentComments.length;
};

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

const loadNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_CLICK);
  renderComments(nextComments);

  shownCommentsCount += nextComments.length;

  updateCommentsCounter();

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', isEscKey);
  commentsLoader.removeEventListener('click', loadNextComments);
}

const renderBigPicture = (currentPhoto) => {
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  caption.textContent = currentPhoto.description;

  commentsList.innerHTML = '';
  currentComments = currentPhoto.comments;
  shownCommentsCount = 0;

  bigPicture.classList.remove('hidden');

  loadNextComments();

  commentsLoader.addEventListener('click', loadNextComments);
  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', isEscKey);
};

const initPreview = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if(!currentPicture) {
      return;
    }

    const currentPhoto = photos.find((photo) => photo.id === Number(currentPicture.dataset.pictureId));

    if (currentPhoto) {
      evt.preventDefault();
      renderBigPicture(currentPhoto);
    }
  });
};

export { initPreview };
