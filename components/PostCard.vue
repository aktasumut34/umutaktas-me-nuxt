<template>
  <div
    class="rounded px-6 py-8 flex flex-col items-center dark:bg-darkGray bg-white gap-4 hover:-translate-y-1 transition-transform"
  >
    <img :src="image" alt="" class="w-full ar object-cover" />
    <h3
      class="font-cubano uppercase text-xl md:text-3xl text-black dark:text-white text-center"
    >
      {{ title }}
    </h3>
    <p
      class="font-sofia text-md md:text-lg text-gray-700 dark:text-gray-300 text-center overflow-y-hidden max-h-[200px] font-extralight"
    >
      {{ striphtml(description) }}
    </p>
    <button
      class="bg-green-500 text-white rounded-sm py-4 font-sofia hover:bg-green-600 text-sm uppercase transition-colors hover:text-gray-300 w-full mt-auto"
    >
      {{ buttonText }}
    </button>
    <div v-if="cTags.length" class="flex gap-1 flex-wrap self-start">
      <div
        v-for="tag in cTags"
        :key="tag.slug"
        class="px-2 py-1 font-cubano uppercase text-sm"
        :style="{
          backgroundColor: tag.background || 'black',
          color: tag.foreground || 'white',
        }"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title',
    },
    image: {
      type: String,
      default: '//unsplash.it/1920/1080',
    },
    description: {
      type: String,
      default: 'description',
    },
    buttonText: {
      type: String,
      default: 'START',
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    cTags() {
      return this.tags.slice(0, 4)
    },
  },
  methods: {
    striphtml(html) {
      return (
        html
          .replace(/(<([^>]+)>)/gi, html)
          .replace(/`/g, '')
          .substring(0, 300) + '...'
      )
    },
  },
}
</script>

<style>
.ar {
  aspect-ratio: calc(16 / 9);
}
</style>
