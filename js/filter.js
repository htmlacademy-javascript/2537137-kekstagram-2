import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

let currentFilter = FILTER.default;
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

function onFilterChange(evt) {
  const targetButton = evt.target.closest('button');

  if (!targetButton || targetButton.id === currentFilter) {
    return;
  }
  console.log('button check passed');
  document.querySelector(`.${ACTIVE_BUTTON_CLASS}`)?.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.id;
}

function applyFilter(pictures) {
  console.log('filter works');
  const filteredPictures = () => {
    console.log(pictures);
    switch (currentFilter) {
      case FILTER.random:
        return pictures.toSorted(SORTFUNC.random).slice(0, 10);
      case FILTER.discussed:
        return pictures.toSorted(SORTFUNC.discussed);
      default:
        return pictures;
    }
  };

  const pictureContainer = document.querySelector('.pictures');
  const oldPictures = pictureContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  return filteredPictures();
}

function configFilter(picturesData, firstCb, secondCb) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', (evt) => {
    onFilterChange(evt);
    const result = applyFilter(picturesData);
    // debounce(
    //   () => firstCb(result),
    //   RERENDER_DELAY,
    // );
    firstCb(result);
    secondCb(result);
  });
}

export { configFilter };
