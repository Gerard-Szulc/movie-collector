<template>
  <div>
    <HorizontalList :title="'Popular movies'" :list="popularResultsGetter" :loading="loadingPopularMoviesGetter"></HorizontalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HorizontalList from '@/components/HorizontalList.vue'

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
