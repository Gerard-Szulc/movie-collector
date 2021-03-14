<template>
  <div>
    <VerticalList
      :current-page="currentPage"
      :list="searchResults"
      :total-pages="totalPages"
      :loading="loading"
      :change-page="changePage"
      :empty-list-notice="'Sorry, no available element on this list.'"
    ></VerticalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VerticalList from '@/components/List/VerticalList/VerticalList.vue'

export default {
  name: 'SearchList',
  components: {
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
