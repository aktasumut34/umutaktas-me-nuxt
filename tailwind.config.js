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
    typography: (theme) => ({
      light: {
        css: [
          {
            color: theme('colors.gray.400'),
            '[class~="lead"]': {
              color: theme('colors.gray.300'),
            },
            a: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
            },
            blockquote: {
              color: theme('colors.gray.200'),
              borderLeftColor: theme('colors.gray.600'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.white'),
            },
            'a code': {
              color: theme('colors.white'),
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            thead: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.gray.400'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.600'),
            },
          },
        ],
      },
    }),
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
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
