<template>
  <div class="px-10 md:px-16 lg:px-36 transition-colors">
    <div
      class="py-8 lg:py-12 2xl:py-20 mx-4 xl:mx-16 2xl:mx-32 3xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending && !articles.error">
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Latest<code
              :to="'/tags/' + meta.tag.slug"
              class="px-4 py-1 font-cubano uppercase text-xl lg:text-2xl 2xl:text-3xl rounded-md mx-2"
              :style="{
                backgroundColor: meta.tag.background || 'black',
                color: meta.tag.foreground || 'white',
              }"
            >
              {{ meta.tag.name }} </code
            >Posts
          </h3>
          <p
            class="font-mono uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            {{ meta.tag.description }}
          </p>
        </template>
        <div v-if="$fetchState.pending && !articles.error">
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            LOADING POSTS
          </h3>
          <div class="spinner">
            <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
          </div>
        </div>
      </div>
      <template v-if="!articles.error && !$fetchState.pending">
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
      <div v-if="articles.error" class="w-full">
        <span
          class="block text-center font-light font-sofia text-xl md:text-2xl uppercase text-red-600"
        >
          Sorry, we couldn't load posts now. Shame on us 🙁
          <small
            v-if="articles.error.code"
            class="block text-xs text-gray-700 dark:text-gray-300"
            >ERROR CODE: {{ articles.error.code }}</small
          >
          <span class="block text-gray-700 dark:text-gray-300 mt-4"
            >Go to
            <NuxtLink to="/posts" class="text-black dark:text-white underline"
              >All Posts</NuxtLink
            ></span
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
  watch: {
    '$route.query.page': '$fetch',
  },
  methods: {
    async fetchPosts() {
      try {
        this.curPage = parseInt(this.$route.query.page) || 1
        const res = await this.$axios.get(
          '/articles?limit=4&page=' +
            this.curPage +
            '&tag=' +
            this.$route.params.tag
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
