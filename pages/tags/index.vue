<template>
  <div class="px-3 md:px-4 lg:px-[5vw] py-10 lg:py-16">
    <template v-if="!$fetchState.pending">
      <h3
        class="font-oswald uppercase text-2xl lg:text-3xl 2xl:text-5xl text-black dark:text-white"
      >
        Etiketler
      </h3>
      <div class="py-8 flex flex-wrap gap-4">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.slug"
          :to="'/tags/' + tag.slug"
          class="px-4 py-2 font-oswald lowercase text-3xl lg:text-4xl 2xl:text-5xl rounded-md"
          :style="{
            backgroundColor: tag.background || 'black',
            color: tag.foreground || 'white',
          }"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
    </template>
    <div v-else>
      <h3
        class="font-oswald uppercase text-2xl lg:text-3xl 2xl:text-5xl text-black dark:text-white"
      >
        Etiketler yükleniyor
      </h3>
      <div class="spinner">
        <div class="bounce1 bg-gray-700 dark:bg-gray-300"></div>
        <div class="bounce2 bg-gray-700 dark:bg-gray-300"></div>
        <div class="bounce3 bg-gray-700 dark:bg-gray-300"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
    }
  },
  async fetch() {
    await this.fetchTags()
  },

  head: {
    title: 'Etiketler | Umut Aktaş - Personal Blog',
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
        href: 'https://umutaktas.me/tags',
      },
    ],
  },
  methods: {
    async fetchTags() {
      try {
        const res = await this.$axios.get('/articles/tags')
        this.tags = res.data
      } catch (err) {
        this.tag = {
          error: err,
        }
      }
    },
  },
}
</script>

<style></style>
