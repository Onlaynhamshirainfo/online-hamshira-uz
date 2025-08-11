/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "uz",
    localeDetection: false,
    locales: ["ru", "uz", "en"],
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
  images: {
    // like ['domen.uz']
    domains: ["dashboard.onlaynhamshira.uz"],
  },
  env: {
    // like base url
    API: "https://dashboard.onlaynhamshira.uz/api/v1/",
  },
  publicRuntimeConfig: {
    baseUrl: "https://dashboard.onlaynhamshira.uz",
  },

};

module.exports = nextConfig;
