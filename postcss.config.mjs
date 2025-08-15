// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- تغییر کلیدی و نهایی اینجاست
    autoprefixer: {},
  },
};

export default config;