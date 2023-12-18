/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#252525",
      },
      screens: {
        tablet: "640px",
        navHide: "800px",
        laptop: "1024px",
      },
    },
    fontFamily: {
      heading: ["Monaco", "Bitstream Vera Sans Mono", "Lucida Console"],
    },
  },
  plugins: [],
};
