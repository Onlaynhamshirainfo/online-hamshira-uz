// auth fetcher
import {getItemsFromLocal} from "@/redux/slice/settings";
import {useDispatch} from "react-redux";

function updateOptions(options) {
  const update = {
    ...options,
    headers: {
      ...options.headers,
      Accept: "application/json",

      ...(typeof window !== "undefined" &&
      location.host === "hambi.onlaynhamshira.uz"
        ? {
            From: "hambi",
          }
        : {}),
    },
  };
  if (localStorage.auth__key) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.auth__key}`,
    };
  }
  return update;
}

export default function fetcher(url = "", options = {}, params = {}) {
  const __url = new URL(process.env.API + url);
  Object.keys(params).forEach((key) =>
    __url.searchParams.append(key, params[key]),
  );
  return fetch(__url, updateOptions(options)).then((res) => {
    if (res.status === 401) {
      localStorage.removeItem("auth__key");
      localStorage.removeItem("auth__phone");
      localStorage.removeItem("auth__info");
    }
    return res.json();
  })
}
