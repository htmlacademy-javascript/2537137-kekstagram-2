import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORT_FUNCTION = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

let currentFilter = FILTER.default;
const filterElement = document.querySelector('.img-filters');
const pictureContainer = document.querySelector('.pictures');

const deletePictures = () => {
  const oldPictures = pictureContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());
};

const applyFilter = (pictures) => {
  switch (currentFilter) {
    case FILTER.random:
      return pictures.toSorted(SORT_FUNCTION.random).slice(0, 10);
    case FILTER.discussed:
      return pictures.toSorted(SORT_FUNCTION.discussed);
    case FILTER.default:
      return pictures;
    default:
      throw new Error(`Unknown filter: ${currentFilter}`);
  }
};

const filterPictures = debounce((pictures, renderCb) => {
  deletePictures();
  renderCb(applyFilter(pictures));
}, RERENDER_DELAY);

const onFilterChange = (evt, pictures, renderCb) => {
  const targetButton = evt.target.closest('button');

  if (!targetButton || targetButton.id === currentFilter) {
    return;
  }

  document.querySelector(`.${ACTIVE_BUTTON_CLASS}`)?.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.id;

  filterPictures(pictures, renderCb);
};

function configFilter(picturesData, renderCb) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', (evt) => onFilterChange(evt, picturesData, renderCb));
}

export { configFilter };
