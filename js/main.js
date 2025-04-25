import { makePhotos } from './create-array-photos.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreview } from './render-photo.js';

const photos = makePhotos();
const thumbnail = renderThumbnails(photos);
const renderBigPic = initPreview();

