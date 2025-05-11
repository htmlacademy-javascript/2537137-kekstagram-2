import { makePhotos } from './create-array-photos.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreview } from './render-photo.js';
import { initUploadModal } from './form/upload-photo-form.js';

const photos = makePhotos();

renderThumbnails(photos);
initPreview(photos);
initUploadModal();

