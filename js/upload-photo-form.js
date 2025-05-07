import { error, isHashtagValid } from './check-hashtag-validity.js';

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
  && !evt.target.classList.contains('text__hashtags')
  && !evt.target.classlist.contains('text__description')
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

function initUploadModal () {
  uploadFile.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown', onEscKeydown);
  });
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onHashtagInput = () => {
  isHashtagValid(hashtagInput.value);
};

const submitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    uploadForm.submit();
  }
};

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

pristine.addValidator(commentInput, (value) => {
  const hasValue = value.length <= 140;

  return hasValue;
}, 'Текст не может быть длиннее 140 символов');

hashtagInput.addEventListener('input', onHashtagInput);
uploadForm.addEventListener('submit', submitForm);

export { initUploadModal };
