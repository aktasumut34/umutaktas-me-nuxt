module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ], // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            iframe: {
              margin: '2em 0',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            p: {
              color: theme('colors.gray.300'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.gray.400'),
            },
            'a:hover': {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
      screens: {
        '3xl': '1920px',
      },
      colors: {
        darkGray: '#2A2E35',
      },
      fontFamily: {
        oswald: ['Oswald, sans-serif'],
        montserrat: ['Montserrat, sans-serif'],
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
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
