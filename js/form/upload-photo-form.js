import { setupValidation, validateForm, resetValidation } from './validation.js';
import { initEffectsSlider, resetEffects } from './effects-slider.js';
import { isEscKey } from '../util.js';
import { sendData } from '../api.js';
import { showNotification } from '../modal-messages.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const FILE_TYPES = ['jpeg', 'jpg', 'png', 'gif', 'jfif'];

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
const uploadPreviewEffects = document.querySelectorAll('.effects__preview');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const uploadSubmit = uploadForm.querySelector('#upload-submit');

let currentScale = DEFAULT_SCALE;

const onPhotoEditorResetButtonClick = () => closePhotoEditor();

const onEscKeydown = (evt) => {
  if(isEscKey(evt)
  && document.activeElement !== hashtagInput
  && document.activeElement !== commentInput
  && !document.body.classList.contains('has-error')
  ) {
    evt.stopPropagation();
    uploadForm.reset();
    closePhotoEditor();
  }
};

function onFileInputChange() {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);

  if (matches) {
    const url = URL.createObjectURL(file);

    imgPreview.src = url;
    uploadPreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });

    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown', onEscKeydown);
  }
}

const updateImageScale = () => {
  const scaleValue = currentScale / MAX_SCALE;
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
  resetValidation();
  document.body.classList.remove('has-error');
}

const onSmallerButtonClick = () => {
  currentScale -= SCALE_STEP;
  currentScale = Math.max(MIN_SCALE, currentScale);
  updateImageScale();
};

const onBiggerButtonClick = () => {
  currentScale += SCALE_STEP;
  currentScale = Math.min(currentScale, MAX_SCALE);
  updateImageScale();
};

const disableButton = (text) => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = text;
};

const enableButton = (text) => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = text;
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    disableButton(SUBMIT_BUTTON_TEXT.SENDING);

    try {
      await sendData(new FormData(evt.target));
      closePhotoEditor();
      uploadForm.reset();
      showNotification('success');
    } catch (error) {
      showNotification('error');
      document.body.classList.add('has-error');
    } finally {
      enableButton(SUBMIT_BUTTON_TEXT.IDLE);
    }
  }
};

const initUploadModal = () => {
  uploadFile.addEventListener('change', onFileInputChange);
  uploadForm.addEventListener('submit', onFormSubmit);
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  setupValidation();
  initEffectsSlider();
};

export { initUploadModal };
