<template>
  <div>
    <VerticalList
      :current-page="currentPage"
      :list="searchResults"
      :total-pages="totalPages"
      :loading="loading"
      :change-page="changePage"
    >
      <template v-slot:list-item="{ element }">
        <MovieItem :element="element"/>
      </template>
      <template v-slot:notice>
        <div class="alert alert-warning" role="alert">
          Sorry, no results found.
        </div>
      </template>
    </VerticalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VerticalList from '@/components/List/VerticalList/VerticalList.vue'
import MovieItem from '@/components/Item/MovieItem.vue'

export default {
  name: 'SearchList',
  components: {
    MovieItem,
    VerticalList
  },
  computed: {
    ...mapGetters({
      searchResults: 'movies/search/searchResultsGetter',
      currentPage: 'movies/search/currentPageGetter',
      totalPages: 'movies/search/totalPagesGetter',
      loading: 'movies/search/loadingGetter'
    })
  },
  methods: {
    ...mapActions({
      changePage: 'movies/search/changePage'
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
