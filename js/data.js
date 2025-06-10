const EFFECTS = {
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

export { EFFECTS };
