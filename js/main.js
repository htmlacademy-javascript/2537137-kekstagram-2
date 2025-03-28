const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Василий', 'Иван', 'Дарья', 'Мария', 'Алексей', 'Сергей', 'Екатерина', 'Виктор', 'Серафим', 'Евгения', 'Юлия', 'Владимир'];

const DESCRIPTIONS = ['Море', 'Горы', 'Солнце', 'Лес', 'Котики'];

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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция генерирующая комментарий
const getComment = () => {
  let id = 0;

  return () => {
    id++;

    return {
      id,
      avatar: `img/avatar-${getRandomInteger[(ImgAvatar.MIN, ImgAvatar.MAX)]}.jpg`,
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
      comments: Array.from({ length: getRandomInteger(Comments.FROM, Comments.TO) }, getComment())
    };
  };
};

// Создание массива описаний для фотографий
const photos = Array.from({length: PHOTO_QUANTITY}, createPhoto());

console.log(photos);
