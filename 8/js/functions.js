

const checkLength = (string, maxLength) => (string.length <= maxLength);

checkLength('Java Script', 20);


const catchString = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let emptyString = '';

  for (let i = newString.length - 1; i >= 0; i--) {
    emptyString += newString.at(i);
  }

  return emptyString === newString;
};

catchString(' дЕд ');

const getString = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let polid = true;

  for (let i = 0; i < newString.length; i++) {
    const start = newString.at(i);
    const end = newString.at(-1 - i);

    if (start !== end) {
      polid = false;
    }
  }
  return polid;
};

getString(' Лёша на полке клопа нашёл ');


const getNumber = (string) => {
  let numberString = '';

  for (let i = 0; i < string.length; i++) {
    const symbol = parseInt(string.at(i), 10);

    if (!Number.isNaN(symbol)) {
      numberString += symbol;
    }
  }

  return parseInt(numberString, 10);
};

getNumber('2023 год');

const getTime = (startWork, endWork, startMeeting, meetingDuration) => {
  const dayStartMinutes = timeToMinutes(startWork);
  const dayEndMinutes = timeToMinutes(endWork);
  const meetingStartMinutes = timeToMinutes(startMeeting);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= dayStartMinutes && meetingEndMinutes <= dayEndMinutes;
};

function timeToMinutes(time) {
  const parts = time.split(':').map(Number);
  const hours = parts[0];
  const minutes = parts[1];
  return hours * 60 + minutes;
}

getTime('08:00', '17:30', '14:00', 90);
