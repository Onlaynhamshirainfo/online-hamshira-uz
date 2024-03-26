/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // '.s/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      fontFamily: ["Montserrat", "sans-serif"],
      colors: {
        green: "#1cc34b",
        blue: "#0057ff",
        body: "#F7F7F8",
        gray: "#99A0A8",
        grey: {
          1: "#333333",
          2: "#4F4F4F",
          3: "#828282",
          4: "#BDBDBD",
          5: "#E0E0E0",
          6: "#ECEDEE",
          7: "#F2F2F2",
        },
        text: {
          primary: "#242424",
          secondary: "#828282",
          placeholder: "#BDBDBD",
        },
        footer: "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        box: "0px 4px 40px 0px rgba(38, 41, 43, 0.07)",
        input: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      screens: {
        small: "360px",
        // => @media (min-width: 360px) { ... }

        xs: "450px",
        // => @media (min-width: 450px) { ... }

        sm: "576px",
        // => @media (min-width: 576px) { ... }

        ms: "650px",
        // => @media (min-width: 650px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        "2xl": "1200px",
        // => @media (min-width: 1200px) { ... }

        "4xl": "1300px",
        // => @media (min-width: 1200px) { ... }

        "6xl": "1440px",
        // => @media (min-width: 1440px) { ... }

        "8xl": "1540px",
        // => @media (min-width: 1540px) { ... }
      },
    },
  },
};
