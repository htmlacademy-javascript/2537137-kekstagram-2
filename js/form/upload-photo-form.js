import { setupValidation, validateForm } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFile = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const isEscKey = (evt) => evt.key === 'Escape';

const onPhotoEditorResetButtonClick = () => closePhotoEditor();

const onEscKeydown = (evt) => {
  if(isEscKey(evt)
  && document.activeElement !== hashtagInput
  && document.activeElement !== commentInput
  ) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetButtonClick);
  uploadFile.value = '';
}

const onUploadFileChange = () => {
  photoEditorForm.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);

  document.addEventListener('keydown', onEscKeydown);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    console.log(isValid);
  }
};

const initUploadModal = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
  uploadForm.addEventListener('submit', onFormSubmit);
  setupValidation();
};

export { initUploadModal };
