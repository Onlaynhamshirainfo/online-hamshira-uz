export function DateTranslate(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}

export function convertUnixFormat(date, hour) {
  const dateTimeString = `${date}T${hour}:00`;
  const dateTime = new Date(dateTimeString);
  const unixTimestamp = dateTime.getTime() / 1000;
  return unixTimestamp;
}

export function converUnivDate(date) {
  const [day, month, year] = date.split('.');
  const hour = '00:00';
  const dateTimeString = `${year}-${month}-${day}T${hour}:00`;
  const dateTime = new Date(dateTimeString);
  const unixTimestamp = dateTime.getTime() / 1000;
  return unixTimestamp;
}

export function convertUnixToDate(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function convertUnixToDateWithHours(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");


  return `${day}.${month}.${year}, ${hours}-${minutes}`;
}
