import { Provider } from "react-redux";
import "../public/styles/nprogress.css";
import "../styles/globals.css";
import store from "../redux/store/store";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";
import messages_uz from "../lang/uz.json";
import messages_ru from "../lang/ru.json";
import messages_en from "../lang/en.json";
import { IntlProvider } from "react-intl";
import { LangProvider } from "../context/useLang";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import NProgress from "nprogress";
import { initCollapse } from "../utils/collapse";
import "react-loading-skeleton/dist/skeleton.css";
import { FilesProvider } from "../context/useFiles";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale);
  const [texts, setTexts] = useState({});

  // useEffect(() => {
  // 	const fetchTexts = async () => {
  // 		await axios(`${process.env.API}/texts`, {
  // 			headers: { 'Accept-Language': router.locale },
  // 		}).then((res) =>
  // 			setTexts(
  // 				res.data.data
  // 					.map((data) => ({
  // 						id: data.id,
  // 						value: data.value,
  // 					}))
  // 					.reduce(
  // 						(acc, cur) => ({
  // 							...acc,
  // 							[cur.id]: cur.value,
  // 						}),
  // 						{}
  // 					)
  // 			)
  // 		)
  // 	}

  // 	fetchTexts()
  // }, [router.locale])

  const messages = {
    uz: messages_uz,
    ru: messages_ru,
    en: messages_en,
  };

  useEffect(() => {
    try {
      const handleStart = () => NProgress.start();
      const handleStop = () => NProgress.done();

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleStop);
      router.events.on("routeChangeError", handleStop);

      initCollapse();

      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleStop);
        router.events.off("routeChangeError", handleStop);
      };
    } catch (error) {
      console.error("Error initializing collapse:", error);
    }
  }, [router]);

  useEffect(() => {
    setLocale(router.locale);
  }, [router.locale]);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={router.locale}
        defaultLocale={router.defaultLocale}
        messages={{ ...texts, ...messages[router.locale] }}
        // remove
        onError={() => null}
      >
        <LangProvider>
          <FilesProvider>
            <SkeletonTheme>
              <Toaster position="top-right" reverseOrder={false} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SkeletonTheme>
          </FilesProvider>
        </LangProvider>
      </IntlProvider>
    </Provider>
  );
}
