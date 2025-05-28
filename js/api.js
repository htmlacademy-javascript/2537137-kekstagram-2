const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA:'/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const ERROR_TEXT = {
  [METHOD.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [METHOD.POST]: 'Не удалось отправить данные формы',
};

const load = async (route, method = METHOD.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body});
  return response.ok ? await response.json() : Promise.reject(ERROR_TEXT[method]);
};

const getData = async() => await load(ROUTE.GET_DATA);

const sendData = async(body) => await load(ROUTE.SEND_DATA, METHOD.POST, body);

export { getData, sendData };
