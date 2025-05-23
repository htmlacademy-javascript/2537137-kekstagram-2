const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Василий', 'Иван', 'Дарья', 'Мария', 'Алексей', 'Сергей', 'Екатерина', 'Виктор', 'Серафим', 'Евгения', 'Юлия', 'Владимир'];

const DESCRIPTIONS = ['Море', 'Горы', 'Солнце', 'Лес', 'Котики'];

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

export {MESSAGES, NAMES, DESCRIPTIONS, EFFECTS};
