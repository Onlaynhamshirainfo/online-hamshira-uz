// auth fetcher
function updateOptions(options, auth) {
  const update = {
    ...options,
    headers: {
      ...options.headers,
      Accept: "application/json",
    },
  };
  if (localStorage.auth__key && auth) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.auth__key}`,
    };
  }
  return update;
}

export default function fetcher(
  url = "",
  options = {},
  params = {},
  auth = false
) {
  const __url = new URL(process.env.API + url);
  Object.keys(params).forEach((key) =>
    __url.searchParams.append(key, params[key])
  );

  return fetch(__url, updateOptions(options, auth)).then((res) => {
    if (res.status === 401) {
      localStorage.removeItem("auth__key");
      localStorage.removeItem("auth__phone");
      localStorage.removeItem("auth__info");
    }
    return res.json();
  });
}
