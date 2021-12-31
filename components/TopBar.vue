<template>
  <div>
    <div
      class="absolute h-full w-full top-0 left-0 px-8 md:px-16 xl:px-40 z-[9999] flex items-center justify-center transition-transform duration-500 searchContainer"
      :class="{
        'translate-y-[-100vh]': !searchActive,
        'translate-y-0': searchActive,
      }"
      @keydown.esc="toggleSearch"
    >
      <div
        class="absolute right-5 top-5 text-white hover:text-gray-200 active:text-gray-100 cursor-pointer"
        @click="toggleSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 xl:h-20 xl:w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <input
        ref="search"
        v-model="query"
        type="text"
        class="flex-1 bg-transparent outline-none text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-100 placeholder-gray-300"
        placeholder="Search something"
        @keydown.enter="doSearch"
      />
      <div
        class="text-white hover:text-gray-200 active:text-gray-100 cursor-pointer"
        @click="doSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9 lg:h-14 lg:w-14 xl:h-20 xl:w-20"
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
    </div>
    <div
      class="absolute h-full w-full top-0 left-0 px-8 md:px-16 xl:px-40 z-[9999] flex items-center justify-center transition-transform duration-700 searchContainer"
      :class="{
        'translate-y-[-100vh]': !menuActive,
        'translate-y-0': menuActive,
      }"
      @keydown.esc="toggleMenu"
    >
      <div
        class="absolute right-5 top-5 text-white hover:text-gray-200 active:text-gray-100 cursor-pointer"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 xl:h-20 xl:w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div
        class="flex-1 flex flex-col text-center justify-center items-center gap-6"
      >
        <img
          class="w-[200px] h-[200px] m-12"
          src="/img/logo-dark.png"
          alt="umutaktas.me logo"
        />
        <span
          class="uppercase font-oswald cursor-pointer text-4xl text-white"
          @click="go('/')"
          >🏠 Anasayfa</span
        >
        <span
          class="uppercase font-oswald cursor-pointer text-4xl text-white"
          @click="go('/posts')"
          >🚀 Tüm Gönderiler</span
        >
        <span
          class="uppercase font-oswald cursor-pointer text-4xl text-white"
          @click="go('/tags')"
          >🏷 Etiketler</span
        >
        <span
          class="uppercase font-oswald cursor-pointer text-4xl text-white"
          @click="go('/about-me')"
          >👨‍💻 HAKKIMDA</span
        >
      </div>
    </div>
    <nav
      class="fixed top-0 left-0 bg-white dark:bg-darkGray flex h-navWidth md:h-navWidthMd w-full items-center transition-colors duration-300 z-50"
    >
      <NuxtLink
        class="min-w-[15vw] flex items-center justify-start py-2 md:py-4 px-3 md:px-4 lg:pl-[5vw]"
        to="/"
      >
        <img
          v-show="currentMode == 'light'"
          class="w-logoWidth h-logoWidth md:w-logoWidthMd md:h-logoWidthMd"
          src="/img/logo-light.png"
          alt="umutaktas.me logo"
        />
        <img
          v-show="currentMode == 'dark'"
          class="w-logoWidth h-logoWidth md:w-logoWidthMd md:h-logoWidthMd"
          src="/img/logo-dark.png"
          alt="umutaktas.me logo"
        />
      </NuxtLink>
      <div
        class="flex-1 flex invisible md:visible text-center justify-center gap-6"
      >
        <NuxtLink to="/posts" class="nav-text">🚀 TÜM GÖNDERİLER</NuxtLink>
        <NuxtLink to="/tags" class="nav-text">🏷 ETİKETLER</NuxtLink>
        <NuxtLink to="/about-me" class="nav-text">👨‍💻 HAKKIMDA</NuxtLink>
      </div>
      <div
        class="min-w-[15vw] flex items-center justify-end pr-2 md:pr-4 gap-8"
      >
        <div class="nav-text" @click="toggleSearch">
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
        <div class="nav-text lg:pr-[5vw]" @click="darkMode">
          <svg
            v-show="currentMode == 'light'"
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
            v-show="currentMode == 'dark'"
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
        <div class="nav-text block md:hidden" @click="toggleMenu">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchActive: false,
      query: '',
      menuActive: false,
    }
  },
  computed: {
    currentMode() {
      return this.$store.state.mode
    },
  },
  created() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line nuxt/no-globals-in-created
      if (window._MODE) {
        // eslint-disable-next-line no-undef
        this.set(_MODE)
      }
    }
  },
  methods: {
    swapMode(mode) {
      if (mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.theme = mode
      this.set(mode)
    },
    darkMode() {
      const mode = this.currentMode === 'dark' ? 'light' : 'dark'
      this.swapMode(mode)
    },
    toggleSearch() {
      this.searchActive = !this.searchActive
      if (this.searchActive) this.$refs.search.focus()
    },
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    doSearch() {
      this.searchActive = false
      this.$router.push({
        path: '/posts',
        query: { s: this.query },
      })
    },
    go(i) {
      this.menuActive = false
      this.$router.push({
        path: i,
      })
    },
    ...mapMutations(['set']),
  },
}
</script>

<style>
.nav-text {
  @apply md:text-lg lg:text-xl 2xl:text-2xl text-gray-500 hover:text-gray-900 active:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 dark:active:text-gray-200 uppercase font-oswald cursor-pointer transition-colors;
}
.nuxt-link-active {
  @apply text-gray-900 dark:text-gray-100;
}
.searchContainer {
  background: rgba(0, 0, 0, 0.85);
}
</style>
