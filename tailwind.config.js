const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extends: {
      colors: {
        cyan: colors.cyan,
        violet: colors.violet,
        'white': '#ffffff',
      },
    }
  },
  safelist: ['disabled:opacity-50'],
  plugins: [],
}
