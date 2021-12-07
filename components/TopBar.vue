<template>
  <nav
    class="fixed top-0 left-0 bg-white dark:bg-darkGray flex h-navWidth md:h-navWidthMd w-full items-center transition-colors duration-300 z-50"
  >
    <NuxtLink
      class="min-w-[15vw] flex items-center justify-start py-2 md:py-4 px-3 md:px-4 lg:pl-[5vw]"
      to="/"
    >
      <img
        class="w-logoWidth h-logoWidth md:w-logoWidthMd md:h-logoWidthMd"
        src="//unsplash.it/128/128"
        alt="umutaktas.me logo"
      />
    </NuxtLink>
    <div
      class="flex-1 flex invisible md:visible text-center justify-center gap-6"
    >
      <div class="nav-text">🎒 COURSES</div>
      <div class="nav-text">🚀 POSTS</div>
      <NuxtLink to="/tags" class="nav-text">🚀 TAGS</NuxtLink>
      <div class="nav-text">👨‍💻 ABOUT&nbsp;ME</div>
    </div>
    <div class="min-w-[15vw] flex items-center justify-end pr-2 md:pr-4 gap-8">
      <div class="nav-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div class="nav-text" @click="darkMode">
        <svg
          v-if="currentMode == 'light'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <div class="nav-text lg:pr-[5vw]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentMode: 'light',
    }
  },
  methods: {
    swapMode() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        this.currentMode = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        this.currentMode = 'light'
      }
    },
    darkMode() {
      localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark'
      this.swapMode()
    },
  },
}
</script>

<style>
.nav-text {
  @apply md:text-lg lg:text-xl 2xl:text-2xl text-gray-500 hover:text-gray-900 active:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:active:text-gray-200 uppercase font-cubano cursor-pointer transition-colors;
}
</style>
