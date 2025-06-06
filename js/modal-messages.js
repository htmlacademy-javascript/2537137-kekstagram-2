import { isEscKey } from './util.js';

const REMOVE_TIMEOUT = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadDataTemplate = document.querySelector('#data-error').content;

const notificationTemplates = {
  success: successTemplate,
  error: errorTemplate
};

const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);

  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }

  document.body.append(errorArea);
  const errorLoadDataArea = document.body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_TIMEOUT);
};

const showNotification = (type) => {
  const template = notificationTemplates[type];
  if (!template) {
    return;
  }

  const node = template.cloneNode(true);
  document.body.append(node);

  const closeNotification = () => {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  node.addEventListener('click', (evt) => {
    if (evt.target === node || evt.target.classList.contains(`${type}__button`)) {
      closeNotification();
    }
  });

  function onDocumentKeydown(evt) {
    if (isEscKey(evt)) {
      evt.preventDefault();
      closeNotification();
    }
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

export { showErrorMessage, showNotification };
