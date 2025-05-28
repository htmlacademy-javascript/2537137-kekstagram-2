import { isEscKey } from './util.js';

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
  const body = document.body;
  const template = document.querySelector(`#${ notification }`).content;
  body.append(template);
  const button = document.querySelector(`.${ notification }__button`);
  const modal = document.querySelector(`.${ notification }`);

  button.addEventListener('click', (evt) => {
    evt.stopPropagation();
    modal.remove();
    document.removeEventListener('keydown', handlerEscModal);
  });

  document.addEventListener('keydown', handlerEscModal);

  function handlerEscModal (evt) {
    if(isEscKey(evt)) {
      evt.preventDefault();
      modal.remove();
      document.removeEventListener('keydown', handlerEscModal);
    }
  }
};

export { showErrorMessage, showNotification };
