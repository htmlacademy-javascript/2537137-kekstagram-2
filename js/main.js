// Массив сообщений
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];

// Массив имен
const NAMES = ['Василий', 'Иван', 'Дарья', 'Мария', 'Алексей', 'Сергей', 'Екатерина', 'Виктор', 'Серафим', 'Евгения', 'Юлия', 'Владимир'];

// Массив описания
const DESCRIPTIONS = ['Море', 'Горы', 'Солнце', 'Лес', 'Котики'];

const likes = {
  MIN: 15,
  MAX: 200
};

const comments = {
  FROM: 0,
  TO: 30
};

const imgAvatar = {
  MIN: 1,
  MAX: 6
};

const objectQuantity = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция генерации объекта comments
const getComment = () => {
  let id = 1;

  //Возвращаем функцию, которая создает комментарий
  return () => {
    const comment = {};
    const avatarId = getRandomInteger(imgAvatar.MIN, imgAvatar.MAX);
    comment.id = id;
    comment.avatar = `img/avatar-${avatarId}.svg`;
    comment.message = `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`;
    comment.name = `${NAMES[getRandomInteger(0, NAMES.length - 1)]}`;
    id++;

    return comment;
  };
};

// Функция создающая объект
const createPhoto = () => {
  let id = 1;

  return () => {
    const photo = {};
    photo.id = id;
    photo.url = `photos/${id}.jpg`;
    photo.description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
    photo.likes = getRandomInteger(likes.MIN, likes.MAX);
    photo.comments = Array.from({ length: getRandomInteger(comments.FROM, comments.TO) }, getComment());
    id++;

    return photo;
  };
};

// Создание массива описаний для фотографий
const photoArray = Array.from({ length: objectQuantity }, createPhoto());

console.log(photoArray);
