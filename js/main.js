import { makePhotos } from './create-array-photos.js';
import { renderThumbnails } from './thumbnails.js';

const photos = makePhotos();
renderThumbnails(photos);
