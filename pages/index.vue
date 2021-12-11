<template>
  <div class="px-10 md:px-16 lg:px-36">
    <div
      class="py-10 md:py-16 lg:py-36 flex flex-col md:flex-row gap-6 items-stretch"
    >
      <div
        class="w-full md:w-1/2 flex flex-col gap-8 md:gap-16 items-center md:items-start"
      >
        <h3
          class="font-cubano uppercase text-3xl md:text-4xl lg:text-5xl text-black dark:text-white text-center md:text-left"
        >
          Your
          <span
            class="bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent"
            >online</span
          >
          personal trainer
        </h3>
        <p
          class="font-sofia text-3xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 text-center md:text-left"
        >
          Here comes your first steps to
          <code
            class="font-bold font-attributeMono bg-gradient-to-r from-pink-600 to-yellow-400 px-1 rounded-sm inline-block text-[0.85em] text-white"
            >programming</code
          >
        </p>
        <div class="flex gap-2">
          <button
            class="bg-transparent border-pink-600 text-gray-700 dark:text-gray-300 border-4 rounded-sm px-4 py-2 font-sofia hover:bg-pink-600 text-md uppercase hover:-translate-y-1 transition-all hover:text-gray-300"
          >
            FREE LESSONS
          </button>
          <button
            class="bg-transparent border-green-500 text-gray-700 dark:text-gray-300 border-4 rounded-sm px-4 py-2 font-sofia hover:bg-green-500 text-md uppercase hover:-translate-y-1 transition-all hover:text-gray-300"
          >
            LAST POSTS
          </button>
        </div>
      </div>
      <div
        class="w-full md:w-1/2 flex items-center md:items-start justify-center md:justify-start"
      >
        <iframe
          width="600"
          src="https://www.youtube.com/embed/bhS1TqA9emE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="aspect-ratio: calc(16 / 9)"
        ></iframe>
      </div>
    </div>
    <hr />
    <div
      class="py-8 mx-4 md:mx-8 xl:mx-32 2xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending">
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Latest Posts
          </h3>
          <p
            class="font-mono uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            New posts, updated every 32nd day of month
          </p>
        </template>
        <div v-else>
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            LOADING LATEST POSTS
          </h3>
          <div class="spinner">
            <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
          </div>
        </div>
      </div>
      <div
        v-if="!articles.error"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
      >
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
    <hr />
    <div
      class="py-8 mx-4 md:mx-8 xl:mx-32 2xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending">
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Learn By Doing
          </h3>
          <p
            class="font-mono uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            The best way to learn code is doing something
          </p>
        </template>
        <div v-else>
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            LOADING LATEST PROJECTS
          </h3>
          <div class="spinner">
            <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
          </div>
        </div>
      </div>

      <div
        v-if="!projects.error"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
      >
        <PostCard
          v-for="post in projects"
          :key="post._id"
          :image="post.image"
          :title="post.name"
          :description="post.description"
          :tags="post.tags"
          :slug="post.slug"
          class="w-full"
        />
      </div>
      <div v-else class="w-full">
        <h3
          class="text-center font-light font-sofia text-xl md:text-2xl uppercase text-red-600"
        >
          Sorry, we couldn't load latest projects now. Shame on us 🙁<br /><small
            class="text-xs text-gray-700 dark:text-gray-300"
            >ERROR CODE: {{ projects.error.code }}</small
          >
        </h3>
      </div>
    </div>
    <hr />
    <div
      class="py-8 mx-4 md:mx-8 xl:mx-32 2xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending">
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            New To Development?
          </h3>
          <p
            class="font-mono uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            Learn The Basics First.
          </p>
        </template>
        <div v-else>
          <h3
            class="font-cubano uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            LOADING LATEST PROJECTS
          </h3>
          <div class="spinner">
            <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
          </div>
        </div>
      </div>

      <div
        v-if="!basics.error"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
      >
        <PostCard
          v-for="post in basics"
          :key="post._id"
          :image="post.image"
          :title="post.name"
          :description="post.description"
          :tags="post.tags"
          :slug="post.slug"
          class="w-full"
        />
      </div>
      <div v-else class="w-full">
        <h3
          class="text-center font-light font-sofia text-xl md:text-2xl uppercase text-red-600"
        >
          Sorry, we couldn't load latest projects now. Shame on us 🙁<br /><small
            class="text-xs text-gray-700 dark:text-gray-300"
            >ERROR CODE: {{ basics.error.code }}</small
          >
        </h3>
      </div>
    </div>
    <hr />
    <div
      class="py-10 md:py-16 lg:py-36 flex flex-col md:flex-row gap-6 items-stretch justify-between"
    >
      <div class="flex justify-center md:justify-start">
        <img src="//unsplash.it/300/300" alt="" class="rounded-full" />
      </div>
      <div
        class="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center md:justify-start gap-6"
      >
        <h3
          class="font-cubano uppercase text-3xl md:text-4xl lg:text-5xl text-black dark:text-white text-center md:text-left"
        >
          🎙️ Your Host
        </h3>
        <p
          class="font-sofia text-2xl xl:text-3xl text-gray-700 dark:text-gray-300 text-center md:text-left"
        >
          Hi, I'm
          <code
            class="font-bold bg-gradient-to-r from-pink-600 to-yellow-400 px-1 rounded-sm inline-block text-[1.05em] text-white"
            >Umut Aktaş</code
          >
          and I'm 26 right now. My biggest passion is coding and i like teaching
          what i know.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      articlesMeta: {},
      projects: [],
      projectsMeta: {},
      basics: [],
      basicsMeta: {},
    }
  },
  async fetch() {
    await this.fetchPosts()
    await this.fetchProjects()
    await this.fetchBasics()
  },
  methods: {
    async fetchPosts() {
      try {
        const articleRes = await this.$axios.get('/articles?limit=2&sort=desc')
        this.articles = articleRes.data.articles
        this.articlesMeta = articleRes.data.meta
      } catch (err) {
        this.articles = {
          error: err,
        }
      }
    },
    async fetchProjects() {
      try {
        const projectRes = await this.$axios.get(
          '/articles?limit=2&sort=desc&tag=project'
        )
        this.projects = projectRes.data.articles
        this.projectsMeta = projectRes.data.meta
      } catch (err) {
        this.projects = {
          error: err,
        }
      }
    },
    async fetchBasics() {
      try {
        const basicRes = await this.$axios.get(
          '/articles?limit=2&sort=desc&tag=basic'
        )
        this.basics = basicRes.data.articles
        this.basicsMeta = basicRes.data.meta
      } catch (err) {
        this.basics = {
          error: err,
        }
      }
    },
  },
}
</script>
<style>
hr {
  @apply -mx-5 md:-mx-10 lg:-mx-20 border-gray-700;
  border-width: 0px;
  border-bottom-width: 2px;
  border-bottom-style: dashed;
}
</style>
