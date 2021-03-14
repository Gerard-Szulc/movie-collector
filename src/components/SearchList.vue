<template>
  <div id="search-list" class="" v-if="searchResultsGetter.length !== 0">
    <template v-for="movie in searchResultsGetter">
      <ListItem :movie="movie" :key="movie.id"></ListItem>
    </template>
  </div>
  <div v-else>
    <div class="alert alert-warning" role="alert">
      Sorry, no results for this search term
    </div>
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
  align-content: flex-start;
  justify-content: center;
  min-height: 88vh;
}
</style>
