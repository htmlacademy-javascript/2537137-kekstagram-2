import { makePhotos } from './create-array-photos.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreview } from './render-photo.js';

const photos = makePhotos();
renderThumbnails(photos);
initPreview(photos);

