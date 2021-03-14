<template>
  <div>
    <HorizontalList :title="'Favorite movies'" :list="favoritesResultsGetter"></HorizontalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HorizontalList from '@/components/HorizontalList.vue'

export default {
  name: 'Favorites',
  components: { HorizontalList },
  created () {
    this.loadFavoriteMovies({})
  },
  computed: {
    ...mapGetters({
      favoritesResultsGetter: 'movies/favorites/favoritesResultsGetter'
    })
  },
  methods: {
    ...mapActions({
      addFavoriteMovie: 'movies/favorites/addFavoriteMovie',
      loadFavoriteMovies: 'movies/favorites/loadFavoriteMovies'
    })
  }
}
</script>

<style scoped>

</style>
