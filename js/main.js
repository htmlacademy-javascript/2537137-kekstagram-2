import { renderThumbnails } from './thumbnails.js';
import { initPreview } from './render-photo.js';
import { initUploadModal } from './form/upload-photo-form.js';
import { getData } from './api.js';
import { showErrorMessage } from './modal-messages.js';
import { configFilter } from './filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const getPhotos = async() => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    initPreview(photos);
    configFilter(photos, renderThumbnails, initPreview);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

getPhotos();
initUploadModal();

