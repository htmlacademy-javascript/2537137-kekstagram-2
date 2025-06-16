import { pluralize } from '../util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_LENGTH = 140;

const RULES = [
  {
    check: (hashtags) => hashtags.some((item) => item.slice(1).includes('#')),
    error: 'Хэштеги разделяются пробелами',
  },
  {
    check: (hashtags) => hashtags.some((item, num, items) => items.includes(item, num + 1)),
    error: 'Один и тот же хэштег не может быть использован дважды',
  },
  {
    check: (hashtags) => hashtags.some((item) => item.length > MAX_SYMBOLS),
    error: `Максимальная длина одного хэштега ${ MAX_SYMBOLS } символов, включая решетку`,
  },
  {
    check: (hashtags) => hashtags.length > MAX_HASHTAGS,
    error: `Нельзя указать больше ${ MAX_HASHTAGS } ${ pluralize(MAX_HASHTAGS, 'хэштега', 'хэштегов', 'хэштегов') }`,
  },
  {
    check: (hashtags) => hashtags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
    error: 'Хештег содержит недопустимые символы, либо не начинается с решетки',
  },
];

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

let errorMessage = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

const getErrorMessage = () => errorMessage;

const isHashtagValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/).filter((x) => x !== '');

  return RULES.every((rule) => {
    const isValid = !rule.check(inputHashtags);

    if (!isValid) {
      errorMessage = rule.error;
    }

    return isValid;
  });
};

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

const setupValidation = () => {
  pristine.addValidator(hashtagInput, isHashtagValid, getErrorMessage, 2, false);

  pristine.addValidator(commentInput, (value) => {
    const hasValue = value.length <= MAX_LENGTH;

    return hasValue;
  }, `Текст не может быть длиннее ${ MAX_LENGTH } символов`);
};

export { setupValidation, validateForm, resetValidation };
