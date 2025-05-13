const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.img-upload__preview');

let currentEffect = 'none';

const effects = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    filter: () => 'none'
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`
  }
};

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: effects.none.min,
      max: effects.none.max
    },
    start: effects.none.max,
    step: effects.none.step,
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
      : effects[currentEffect].filter(value);
  });
};

const updateSliderOptions = ({ min, max, step }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
    format: {
      to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
      from: (value) => parseFloat(value)
    }
  });
};

const onEffectsListChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  currentEffect = evt.target.value;
  imgPreview.className = `effects__preview--${currentEffect}`;

  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imgPreview.style.filter = 'none';
    return;
  }

  effectLevelContainer.classList.remove('hidden');
  updateSliderOptions(effects[currentEffect]);
};

const resetEffects = () => {
  currentEffect = 'none';
  effectLevelSlider.noUiSlider.set(effects.none.max);
  imgPreview.className = 'effects__preview--none';
  imgPreview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');
  document.querySelector('#effect-none').checked = true;
};

const initEffectsSlider = () => {
  createSlider();
  effectLevelContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectsListChange);
};

export { initEffectsSlider, resetEffects };
