<template>
  <div>
    <TopBar />
    <Nuxt
      keep-alive
      :keep-alive-props="{ exclude: ['pages/tags/_tag.vue'] }"
      class="mt-navWidth md:mt-navWidthMd bg-[#DBE1E8] dark:bg-[#12181B] transition-colors bodyHeight"
    />
  </div>
</template>
<style>
.bodyHeight {
  min-height: calc(100vh - 60px);
}
@media (min-width: 768px) {
  .bodyHeight {
    min-height: calc(100vh - 80px);
  }
}
</style>
