<template>
  <div class="px-3 md:px-4 lg:px-[5vw] py-10 lg:py-16">
    <template v-if="!$fetchState.pending">
      <h3
        class="font-cubano uppercase text-2xl lg:text-3xl 2xl:text-5xl text-black dark:text-white"
      >
        TAGS
      </h3>
      <div class="py-8 flex flex-wrap gap-4">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.slug"
          :to="'/tags/' + tag.slug"
          class="px-4 py-1 font-cubano uppercase text-xl lg:text-2xl 2xl:text-3xl rounded-md"
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
        class="font-cubano uppercase text-2xl lg:text-3xl 2xl:text-5xl text-black dark:text-white"
      >
        LOADING TAGS
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
        hid: 'keywords',
        name: 'keywords',
        content:
          'javascript, türkçe yazılım, türkçe programlama, türkçe vue eğitimi, vue dersleri, javascript dersleri',
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
