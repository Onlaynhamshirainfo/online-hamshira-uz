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
export async function converUnivDate(date) {
  if (!date) return null;

  // Check if the date is in the format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const dateTimeString = `${date}T00:00:00.000Z`;

    const dateTime = new Date(dateTimeString);

    if (!isNaN(dateTime.getTime())) {
      const unixTimestamp = dateTime.getTime() / 1000;
      return unixTimestamp;
    } else {
      return null;
    }
  } else {
    return null; // Invalid format
  }
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

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}
