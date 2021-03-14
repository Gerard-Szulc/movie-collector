<template>
  <div>
    <div class="popular-movies-header">
      <h3>{{title}}</h3>
      <div>
        <button class="btn" @click="() => handleScrollList(false)"><i class="bi-arrow-left-circle"></i></button>
        <button class="btn" @click="() => handleScrollList(true)"><i class="bi-arrow-right-circle"></i></button>
      </div>
    </div>
    <div class="horizontal-list-wrapper" ref="horizontalListWrapper">
      <div class="horizontal-list" v-if="list.length !== 0">
        <template v-for="movie in list">
          <ListItem :movie="movie" :key="movie.id"></ListItem>
        </template>
      </div>
      <div v-else>
        <div class="alert alert-warning" role="alert">
          Sorry, no results for this search term
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
export default {
  name: 'HorizontalList',
  components: { ListItem },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleScrollList (direction) {
      const step = this.$refs.horizontalListWrapper.scrollWidth / 10
      this.$refs.horizontalListWrapper.scrollLeft += direction ? step : -step
    }
  }
}
</script>

<style scoped lang="scss">
.popular-movies-header {
  display: flex;
  justify-content: space-between;
}

.horizontal-list-wrapper {
  max-width: 100vw;
  overflow: hidden;
  scroll-behavior: smooth;
}
.horizontal-list {
  flex-direction: row;
  display: inline-flex;
  flex-wrap: nowrap;
  overflow: auto;
}
</style>
