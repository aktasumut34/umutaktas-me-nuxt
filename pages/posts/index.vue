<template>
  <div class="px-10 md:px-16 lg:px-36 transition-colors">
    <div
      class="py-8 lg:py-12 2xl:py-20 mx-4 xl:mx-16 2xl:mx-32 3xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template
          v-if="articles.length > 0 && !$fetchState.pending && !articles.error"
        >
          <span
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            <template v-if="!$route.query.s">Son Gönderiler</template>
            <template v-else>Arama Sonuçları</template>
          </span>
          <p
            class="font-montserrat uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            <template v-if="!$route.query.s"
              >Yeni gönderiler her ayın 32. günü güncellenir.</template
            >
            <template v-else>
              <span class="text-gray-900 dark:text-gray-100">
                {{ $route.query.s }}</span
              ></template
            >
          </p>
        </template>
        <div v-if="$fetchState.pending && !articles.error">
          <span
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Gönderiler yükleniyor
          </span>
          <div class="spinner">
            <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
          </div>
        </div>
      </div>
      <template v-if="!articles.error && !$fetchState.pending">
        <template v-if="articles.length > 0">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <PostCard
              v-for="post in articles"
              :key="post._id"
              :image="post.image"
              :title="post.name"
              :description="post.description"
              :tags="post.tags"
              :slug="post.slug"
              class="w-full"
            />
          </div>
          <div
            v-if="meta.totalPages > 1"
            class="pt-8 lg:pt-12 2xl:pt-20 flex justify-center items-center flex-wrap gap-4"
          >
            <span
              class="paginationLink"
              :class="{ active: curPage === 1 }"
              @click="move(-1)"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                /></svg
            ></span>
            <span
              v-for="page in meta.totalPages"
              :key="page"
              class="paginationLink"
              :class="{ active: page === curPage }"
              @click="go(page)"
              >{{ page }}</span
            >
            <span
              class="paginationLink"
              :class="{ active: curPage === meta.totalPages }"
              @click="move(1)"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                /></svg
            ></span>
          </div>
        </template>
        <div v-else class="w-full">
          <span
            class="block text-center font-light font-montserrat text-xl md:text-2xl uppercase text-gray-700 dark:text-gray-300"
          >
            <span class="text-gray-900 dark:text-gray-100 text-2xl md:text-3xl">
              {{ $route.query.s }}</span
            >
            ile ilgili bir gönderi bulamadık... Belki de kendin kontrol
            etmelisin
            <span class="block text-9xl my-2">🤔</span>
            <span class="block text-gray-700 dark:text-gray-300 mt-4">
              <NuxtLink to="/posts" class="text-black dark:text-white underline"
                >Tüm Gönderiler</NuxtLink
              >
              sayfasına git</span
            >
          </span>
        </div>
      </template>
      <div v-if="articles.error" class="w-full">
        <span
          class="block text-center font-light font-montserrat text-xl md:text-2xl uppercase text-red-600"
        >
          Üzgünüm, şuan gönderileri yükleyemiyorum ve bu benim hatam 🙁
          <small
            v-if="articles.error.code"
            class="block text-xs text-gray-700 dark:text-gray-300"
            >Hata Kodu: {{ articles.error.code }}</small
          >
          <span class="block text-gray-700 dark:text-gray-300 mt-4">
            <NuxtLink to="/posts" class="text-black dark:text-white underline"
              >Tüm Gönderiler</NuxtLink
            >
            sayfasına git</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      meta: {
        tag: {},
      },
      curPage: 0,
    }
  },
  async fetch() {
    this.articles = []
    await this.fetchPosts()
  },

  head: {
    title: 'Yazılar | Umut Aktaş - Kişisel Blog',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Javascript ağırlıklı programlama içerikleri ve youtube videolarımı blog şeklinde paylaştığım kişisel web sitem.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'javascript, türkçe yazılım, türkçe programlama, türkçe vue eğitimi, vue dersleri, javascript dersleri',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://umutaktas.me/posts',
      },
    ],
  },
  watch: {
    '$route.query.page': '$fetch',
    '$route.query.s': '$fetch',
  },
  methods: {
    async fetchPosts() {
      try {
        const searchQuery = this.$route.query.s || ''
        this.curPage = parseInt(this.$route.query.page) || 1
        const res = await this.$axios.get(
          '/articles?limit=4&search=' + searchQuery + '&page=' + this.curPage
        )
        this.articles = res.data.articles
        this.meta = res.data.meta
      } catch (err) {
        this.articles = {
          error: err,
        }
      }
    },
    move(i) {
      if (
        !(this.curPage <= 1 && i === -1) &&
        !(this.curPage >= this.meta.totalPages && i === 1)
      ) {
        this.curPage += i
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, page: this.curPage },
        })
      }
    },
    go(i) {
      if (this.curPage !== i) {
        this.curPage = i
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, page: this.curPage },
        })
      }
    },
  },
}
</script>

<style>
.paginationLink {
  @apply text-xl lg:text-2xl cursor-pointer text-black dark:text-white hover:text-gray-600 transition-colors;
}
.paginationLink.active {
  @apply text-gray-600 dark:text-gray-400 cursor-not-allowed;
}
</style>
