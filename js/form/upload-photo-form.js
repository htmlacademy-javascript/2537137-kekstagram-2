import { setupValidation, validateForm } from './validation.js';
import { initEffectsSlider, resetEffects } from './effects-slider.js';
import { isEscKey } from '../util.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFile = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const smallerButton = uploadForm.querySelector('.scale__control--smaller');
const biggerButton = uploadForm.querySelector('.scale__control--bigger');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');

let currentScale = DEFAULT_SCALE;

const onPhotoEditorResetButtonClick = () => closePhotoEditor();

const onEscKeydown = (evt) => {
  if(isEscKey(evt)
  && document.activeElement !== hashtagInput
  && document.activeElement !== commentInput
  ) {
    evt.stopPropagation();
    uploadForm.reset();
    closePhotoEditor();
  }
};

const updateImageScale = () => {
  const scaleValue = currentScale / 100;
  imgPreview.style.transform = `scale(${scaleValue})`;
  scaleControl.value = `${currentScale}%`;
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetButtonClick);
  uploadFile.value = '';
  currentScale = DEFAULT_SCALE;
  updateImageScale();
  resetEffects();
}

const onUploadFileChange = () => {
  photoEditorForm.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);

  document.addEventListener('keydown', onEscKeydown);
};

const onSmallerButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateImageScale();
  }
};

const onBiggerButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateImageScale();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    uploadForm.reset();
    closePhotoEditor();
  }
};

const initUploadModal = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
  uploadForm.addEventListener('submit', onFormSubmit);
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  setupValidation();
  initEffectsSlider();
};

export { initUploadModal };
