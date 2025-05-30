import { isEscKey } from './util.js';

const successTemplate = document.body.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.body.querySelector('#error').content.querySelector('.error');

const notificationTemplates = {
  success: successTemplate,
  error: errorTemplate
};

const REMOVE_TIMEOUT = 5000;

const showErrorMessage = (message) => {
  const errorLoadDataTemplate = document.querySelector('#data-error').content;
  const body = document.body;

  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }

  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_TIMEOUT);
};

const showNotification = (notification) => {
  const template = notificationTemplates(notification);
  const node = template.cloneNode(true);

  document.body.append(node);

  const button = node.querySelector(`.${ notification }__button`);

  const closeNotification = () => {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeNotification();
  });

  document.addEventListener('keydown', onDocumentKeydown);

  function onDocumentKeydown (evt) {
    if(isEscKey(evt)) {
      evt.preventDefault();
      closeNotification();
    }
  }
};

export { showErrorMessage, showNotification };
