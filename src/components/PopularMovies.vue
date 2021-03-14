<template>
  <div>
    <HorizontalList
      :title="'Popular movies'"
      :list="popularResultsGetter"
      :loading="loadingPopularMoviesGetter"
      :empty-list-notice="'Sorry, no available element on this list.'"
    ></HorizontalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HorizontalList from '@/components/List/HorizontalList/HorizontalList.vue'

export default {
  name: 'PopularMovies',
  components: { HorizontalList },
  created () {
    this.loadPopularMovies({})
  },
  computed: {
    ...mapGetters({
      popularResultsGetter: 'movies/popular/popularResultsGetter',
      loadingPopularMoviesGetter: 'movies/popular/loadingPopularMoviesGetter'
    })
  },
  methods: {
    ...mapActions({
      loadPopularMovies: 'movies/popular/loadPopularMovies'
    })
  }
}
</script>

<style scoped>

</style>
