<template>
  <div class="px-10 md:px-16 lg:px-36 transition-colors">
    <div
      class="py-8 lg:py-12 2xl:py-20 mx-4 xl:mx-16 2xl:mx-32 3xl:mx-64 flex flex-col gap-6 lg:gap-8 2xl:gap-10 3xl:gap-12"
    >
      <div class="flex flex-col gap-2 items-start justify-center w-full">
        <div v-if="!$fetchState.pending && !article.error">
          <span
            class="font-montserrat uppercase text-3xl md:text-4xl text-black dark:text-white font-bold"
          >
            {{ article.name }}
          </span>
        </div>
        <div v-if="!$fetchState.pending && !article.error">
          <span
            class="font-montserrat font-extralight uppercase text-sm md:text-base text-gray-700 dark:text-gray-300"
          >
            {{ humanReadableDate(article.created) }}
          </span>
        </div>
        <div v-if="$fetchState.pending && !article.error">
          <span
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Gönderi Yükleniyor
          </span>
          <div class="spinner">
            <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
            <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
          </div>
        </div>
      </div>
      <template v-if="!article.error && !$fetchState.pending">
        <div
          class="prose md:prose-xl dark:prose-dark dark:md:prose-xl-dark"
          v-html="$md.render(article.content)"
        ></div>
        <div class="self-start mt-4 xl:mt-8 mb-2 xl:mb-4">
          <h3
            class="font-oswald uppercase text-2xl lg:text-3xl 2xl:text-5xl text-black dark:text-white"
          >
            Etiketler
          </h3>
          <div class="py-4 flex flex-wrap gap-4">
            <NuxtLink
              v-for="tag in article.tags"
              :key="tag.slug"
              :to="'/tags/' + tag.slug"
              class="px-4 py-1 font-oswald lowercase text-lg lg:text-xl rounded-md"
              :style="{
                backgroundColor: tag.background || 'black',
                color: tag.foreground || 'white',
              }"
            >
              {{ tag.name }}
            </NuxtLink>
          </div>
        </div>
      </template>
      <div v-if="article.error" class="w-full">
        <span
          class="block text-center font-light font-montserrat text-xl md:text-2xl uppercase text-red-600"
        >
          Üzgünüm, şuan gönderileri yükleyemiyorum ve bu benim hatam 🙁
          <small
            v-if="article.error.code"
            class="block text-xs text-gray-700 dark:text-gray-300"
            >Hata Kodu: {{ article.error.code }}</small
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
      article: {},
    }
  },
  async fetch() {
    this.article = {}
    await this.fetchPost()
  },

  head() {
    if (this.article && this.article.tags) {
      return {
        title: this.article.name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description,
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.article.tags.map((item) => item.name).join(','),
          },
        ],
        link: [
          {
            rel: 'canonical',
            href: 'https://umutaktas.me/posts/' + this.article.slug,
          },
        ],
      }
    }
  },
  methods: {
    async fetchPost() {
      try {
        const postSlug = this.$route.params.post || ''
        const res = await this.$axios.get('/articles/' + postSlug)
        this.article = res.data.article
      } catch (err) {
        this.article = {
          error: err,
        }
      }
    },
    humanReadableDate(date) {
      const d = new Date(date)
      return d.toLocaleDateString(d) + ' ' + d.toLocaleTimeString(d)
    },
  },
}
</script>

<style>
.hljs {
  @apply px-2 md:px-4 lg:px-8 py-2 lg:py-4 mt-8;
  position: relative;
  overflow: unset;
}
.hljs::before,
.hljs::after {
  @apply px-2 md:px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-black;
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  left: 0;
  transition: opacity 0.25s ease;
  height: 30px;
}
.hljs::before {
  @apply border-b-0;
  content: attr(data-file);
  top: -30px;
  border-radius: 4px 4px 0 0;
}
.hljs::after {
  @apply border-t-0;
  content: attr(data-lang);
  bottom: -30px;
  border-radius: 0 0 4px 4px;
}
</style>
