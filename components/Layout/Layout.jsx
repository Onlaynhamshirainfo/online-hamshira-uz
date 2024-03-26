import i18nextConfig from "../../next.config";
import Head from "next/head";
import {
  CodeModal,
  Footer,
  Header,
  LangModalStart,
  RegisterModal,
  SliderModal,
  InfoModal,
  QuitModal,
  LangModal,
  ContactUs,
  OrderType,
  OrderCancel,
} from "../../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLangStartModal,
  changeSliderModal,
} from "../../redux/slice/modals";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { sliderModal, infoModal, orderCancel } = useSelector(
    (state) => state.modals
  );

  useEffect(() => {
    dispatch(changeLangStartModal());
    dispatch(changeSliderModal());
  }, []);

  return (
    <>
      <Head>
        {/* meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Idea.uz" />
        <meta name="robots" content="index, follow, noodp" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />

        {/* favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo-icon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/logo-icon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/logo-icon.svg"
        />
        {/* <link rel="manifest" href="/img/icons/favicon/site.webmanifest" /> */}
        <link rel="mask-icon" href="/images/logo-icon.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/images/logo-icon.svg" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta
          name="msapplication-config"
          content="/img/icons/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff"></meta>

        {/* href lang */}
        {/* {i18nextConfig.i18n.locales.map((locale, i) => {
               return (
                  <link
                     key={i}
                     rel="alternate"
                     hrefLang={locale}
                     href="https://api.idea.inweb.uz"
                  />
               );
            })} */}
      </Head>

      {/* Sprites */}
      {/* <Sprites /> */}

      {/* Body */}
      <div className="wrapper">
        <div className="app">
          {/* Header */}
          <Header />

          <div className="content-wrapper">{children}</div>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      <RegisterModal />
      <CodeModal />
      <LangModalStart />
      {sliderModal ? <SliderModal /> : ""}
      {infoModal ? <InfoModal /> : ""}
      {orderCancel ? <OrderCancel /> : ""}
      <QuitModal />
      <LangModal />
      <ContactUs />
      <OrderType />

      {/* Nav Bottom */}
      {/* <NavBottom /> */}

      {/* Scripts */}
      {/* <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"></Script> */}
      {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"></Script> */}

      {/* {settings && <Scripts settings={settings} />} */}
    </>
  );
};

export default Layout;
