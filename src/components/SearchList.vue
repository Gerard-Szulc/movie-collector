<template>
  <div id="search-list" class="" v-if="searchResultsGetter.length !== 0">
    <template v-for="movie in searchResultsGetter">
      <ListItem :movie="movie" :key="movie.id"></ListItem>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '@/components/ListItem.vue'

export default {
  name: 'SearchList',
  components: { ListItem },
  computed: {
    ...mapGetters({
      searchResultsGetter: 'movies/search/searchResultsGetter'
    })
  }
}
</script>

<style scoped lang="scss">
#search-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
