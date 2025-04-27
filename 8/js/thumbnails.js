const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.dataset.pictureId = photo.id;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  pictures.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });

  container.append(fragment);
};

export { renderThumbnails };
