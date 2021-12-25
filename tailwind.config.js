module.exports = {
  darkMode: 'class',
  mode: 'jit',
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  }, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      colors: {
        darkGray: '#2A2E35',
      },
      fontFamily: {
        cubano: ['cubano, sans-serif'],
        sofia: ['sofia-pro, sans-serif'],
        attributeMono: ['attribute-mono, sans-serif'],
      },
      spacing: {
        navWidth: '60px',
        navWidthMd: '80px',
        logoWidth: '44px',
        logoWidthMd: '64px',
        navItemWidth: '15vw',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
