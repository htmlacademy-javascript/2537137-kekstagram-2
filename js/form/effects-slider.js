import { EFFECTS } from '../data.js';

const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.img-upload__preview img');

let currentEffect = 'none';

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: EFFECTS.none.min,
      max: EFFECTS.none.max
    },
    start: EFFECTS.none.max,
    step: EFFECTS.none.step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
    imgPreview.style.filter = currentEffect === 'none'
      ? 'none'
      : EFFECTS[currentEffect].filter(value);
  });
};

const updateSliderOptions = ({ min, max, step }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });
};

const onEffectsListChange = (evt) => {
  if (!evt.target.id) {
    return;
  }

  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imgPreview.style.filter = 'none';
    return;
  }

  effectLevelContainer.classList.remove('hidden');
  updateSliderOptions(EFFECTS[currentEffect]);
};

const resetEffects = () => {
  currentEffect = 'none';
  effectLevelSlider.noUiSlider.set(EFFECTS.none.max);
  imgPreview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');
};

const initEffectsSlider = () => {
  createSlider();
  effectLevelContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectsListChange);
};

export { initEffectsSlider, resetEffects };
