import { renderThumbnails } from './thumbnails.js';
import { initPreview } from './render-photo.js';
import { initUploadModal } from './form/upload-photo-form.js';
import { getData } from './api.js';
import { showErrorMessage } from './modal-messages.js';

const getPhotos = async() => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    initPreview(photos);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

getPhotos();
initUploadModal();

