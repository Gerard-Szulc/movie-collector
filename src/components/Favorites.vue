<template>
  <div>
    <HorizontalList
      :title="'Favorite movies'"
      :list="favoritesResultsGetter"
      :loading="loading"
      :empty-list-notice="'Sorry, you have no favorite movies.'"
    ></HorizontalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HorizontalList from '@/components/List/HorizontalList/HorizontalList.vue'

export default {
  name: 'Favorites',
  components: { HorizontalList },
  created () {
    this.loadFavoriteMovies({})
  },
  computed: {
    ...mapGetters({
      favoritesResultsGetter: 'movies/favorites/favoritesResultsGetter',
      loading: 'movies/favorites/loadingGetter'
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
