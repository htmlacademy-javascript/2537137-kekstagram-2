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

const onEscKeydown = (evt) => {
  if(evt.key === 'Escape') {
    onBigPictureCancelClick();
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

const onCommentsButtonClick = () => {
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

function onBigPictureCancelClick () {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsButtonClick);
  document.body.classList.remove('modal-open');
}

const renderBigPicture = (currentPhoto) => {
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  caption.textContent = currentPhoto.description;

  commentsList.innerHTML = '';
  currentComments = currentPhoto.comments;
  shownCommentsCount = 0;

  bigPicture.classList.remove('hidden');

  onCommentsButtonClick();

  commentsLoader.addEventListener('click', onCommentsButtonClick);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
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
      document.body.classList.add('modal-open');
    }
  });
};

export { initPreview };
