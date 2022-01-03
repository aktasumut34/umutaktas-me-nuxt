<template>
  <div class="px-4 md:px-8 lg:px-16 xl:px-36">
    <div
      class="py-10 md:py-16 lg:py-36 flex flex-col md:flex-row gap-6 items-stretch"
    >
      <div
        class="w-full md:w-1/2 flex flex-col gap-8 md:gap-16 items-center md:items-start"
      >
        <h3
          class="font-oswald uppercase text-3xl md:text-4xl lg:text-5xl text-black dark:text-white text-center md:text-left"
        >
          <span
            class="bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent"
            >Çevrimiçi</span
          >
          kişisel eğitmenin
        </h3>
        <p
          class="font-montserrat text-3xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 text-center md:text-left"
        >
          <code
            class="font-bold font-attributeMono bg-gradient-to-r from-pink-600 to-yellow-400 px-1 rounded-sm inline-block text-[0.85em] text-white"
            >Programlama</code
          >
          öğrenmeye başlamanın ilk adımlarını atıyorsun
        </p>
        <div class="flex gap-2">
          <NuxtLink
            :to="'/tags'"
            class="bg-transparent border-pink-600 text-gray-700 dark:text-gray-300 border-4 rounded-sm px-4 py-2 font-montserrat hover:bg-pink-600 text-md uppercase hover:-translate-y-1 transition-all hover:text-gray-300 text-center"
          >
            İlgi Alanını Bul
          </NuxtLink>
          <NuxtLink
            :to="'/posts'"
            class="bg-transparent border-green-500 text-gray-700 dark:text-gray-300 border-4 rounded-sm px-4 py-2 font-montserrat hover:bg-green-500 text-md uppercase hover:-translate-y-1 transition-all hover:text-gray-300 text-center"
          >
            Son Gönderiler
          </NuxtLink>
        </div>
      </div>
      <div
        class="w-full md:w-1/2 flex items-center md:items-start justify-center md:justify-start"
      >
        <iframe
          width="600"
          src="https://www.youtube.com/embed/nAY0oKOWmUI"
          title="Umut Aktaş 120 Saniyede Visual Studio Code"
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
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Son Gönderiler
          </h3>
          <p
            class="font-montserrat uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            Yeni gönderiler her ayın 32. günü güncellenir.
          </p>
        </template>
        <div v-else>
          <h3
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Gönderiler yükleniyor
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
    <hr />
    <div
      v-if="0"
      class="py-8 mx-4 md:mx-8 xl:mx-32 2xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending">
          <h3
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Yaparak Öğren
          </h3>
          <p
            class="font-montserrat uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            Programlama öğrenmenin en iyi yolu denemektir.
          </p>
        </template>
        <div v-else>
          <h3
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Gönderiler yükleniyor
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
        <span
          class="block text-center font-light font-montserrat text-xl md:text-2xl uppercase text-red-600"
        >
          Üzgünüm, şuan gönderileri yükleyemiyorum ve bu benim hatam 🙁
          <small
            v-if="projects.error.code"
            class="block text-xs text-gray-700 dark:text-gray-300"
            >Hata Kodu: {{ projects.error.code }}</small
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
    <hr />
    <div
      class="py-8 mx-4 md:mx-8 xl:mx-32 2xl:mx-64 flex flex-col gap-12 items-center justify-center"
    >
      <div class="flex flex-col gap-6 items-center justify-center">
        <template v-if="!$fetchState.pending">
          <h3
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Programlama Temelleri
          </h3>
          <p
            class="font-montserrat uppercase text-sm md:text-md text-gray-700 dark:text-gray-300 font-light text-center"
          >
            Programlama öğrenmeye yeni mi başlıyorsun? Burası tam sana göre!
          </p>
        </template>
        <div v-else>
          <h3
            class="font-oswald uppercase text-2xl md:text-3xl text-black dark:text-white"
          >
            Gönderiler yükleniyor
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
        <span
          class="block text-center font-light font-montserrat text-xl md:text-2xl uppercase text-red-600"
        >
          Üzgünüm, şuan gönderileri yükleyemiyorum ve bu benim hatam 🙁
          <small
            v-if="basics.error.code"
            class="block text-xs text-gray-700 dark:text-gray-300"
            >Hata Kodu: {{ basics.error.code }}</small
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
    <hr />
    <div
      class="py-10 md:py-16 lg:py-36 px-10 md:px-14 lg:px-20 xl:px-32 2xl:px-40 flex flex-col lg:flex-row gap-6 items-stretch justify-evenly"
    >
      <div class="flex justify-center">
        <img
          v-show="currentMode == 'light'"
          class="max-w-[300px]"
          src="/img/logo-light.png"
          alt="umutaktas.me logo"
        />
        <img
          v-show="currentMode == 'dark'"
          class="max-w-[300px]"
          src="/img/logo-dark.png"
          alt="umutaktas.me logo"
        />
      </div>
      <div
        class="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-6"
      >
        <h3
          class="font-oswald uppercase text-3xl md:text-4xl lg:text-5xl text-black dark:text-white text-center lg:text-left"
        >
          🎙️ Ben Kimim?
        </h3>
        <p
          class="font-montserrat text-2xl xl:text-3xl text-gray-700 dark:text-gray-300 text-center lg:text-left"
        >
          Merhaba, ben
          <code
            class="font-bold bg-gradient-to-r from-pink-600 to-yellow-400 px-1 rounded-sm inline-block text-[1.05em] text-white"
            >Umut Aktaş</code
          >, 26 yaşındayım. En büyük tutkum programlama öğrenmek ve bildiklerimi
          başkalarına aktarmak.
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
  head: {
    title: 'Umut Aktaş - Kişisel Blog',
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
        href: 'https://umutaktas.me',
      },
    ],
  },
  computed: {
    currentMode() {
      return this.$store.state.mode
    },
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
          '/articles?limit=2&sort=desc&tag=temel'
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
