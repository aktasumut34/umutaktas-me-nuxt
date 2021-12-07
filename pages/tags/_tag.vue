<template>
  <div class="px-10 md:px-16 lg:px-36 transition-colors">
    <div
      class="py-8 lg:py-12 2xl:py-20 flex flex-col gap-8 lg:gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending">
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Latest Posts About
            <span
              :to="'/tags/' + meta.tag.slug"
              class="px-4 py-1 font-cubano uppercase text-xl lg:text-2xl 2xl:text-3xl rounded-md"
              :style="{
                backgroundColor: meta.tag.background || 'black',
                color: meta.tag.foreground || 'white',
              }"
            >
              {{ meta.tag.name }}
            </span>
          </h3>
          <p
            class="font-mono uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            {{ meta.tag.description }}
          </p>
        </template>
        <div v-else>
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
      <div v-if="!articles.error" class="grid grid-cols-2 gap-8 w-full">
        <PostCard
          v-for="post in articles"
          :key="post._id"
          :image="post.image"
          :title="post.name"
          :description="post.content"
          class="w-full"
        />
      </div>
      <div v-else class="w-full">
        <h3
          class="text-center font-light font-sofia text-xl md:text-2xl uppercase text-red-600"
        >
          Sorry, we couldn't load posts now. Shame on us 🙁<br /><small
            class="text-xs text-gray-700 dark:text-gray-300"
            >ERROR CODE: {{ articles.error.code }}</small
          >
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      meta: {},
    }
  },
  async fetch() {
    await this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const res = await this.$axios.get(
          '/articles?page=1&tag=' + this.$route.params.tag
        )
        this.articles = res.data.articles
        this.meta = res.data.meta
      } catch (err) {
        this.articles = {
          error: err,
        }
      }
    },
  },
}
</script>
