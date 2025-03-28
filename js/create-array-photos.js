import {getRandomInteger} from './util.js';
import {MESSAGES, NAMES, DESCRIPTIONS} from './data.js';

const PHOTO_QUANTITY = 25;

const Likes = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  FROM: 0,
  TO: 30
};

const ImgAvatar = {
  MIN: 1,
  MAX: 6
};

// Функция генерирующая комментарий
const getComment = () => {
  let id = 0;

  return () => {
    id++;

    return {
      id,
      avatar: `img/avatar-${getRandomInteger[(ImgAvatar.MIN, ImgAvatar.MAX)]}.svg`,
      message: `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`,
      name: `${NAMES[getRandomInteger(0, NAMES.length - 1)]}`
    };
  };
};

// Функция создающая фото
const createPhoto = () => {
  let id = 0;

  return () => {
    id++;

    return {
      id,
      url: `photos/${id}.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: Array.from({length: getRandomInteger(Comments.FROM, Comments.TO)}, getComment())
    };
  };
};

// Создание массива описаний для фотографий
const makePhotos = () => Array.from({length: PHOTO_QUANTITY}, createPhoto());

// console.log(makePhotos());

export {makePhotos};
