<template>
  <div>
    <HorizontalList
      :title="'Favorite movies'"
      :list="favoritesResultsGetter"
      :loading="loading"
    >
      <template v-slot:list-item="{ element }">
        <MovieItem :element="element"/>
      </template>
      <template v-slot:notice>
        <div class="alert alert-warning" role="alert">
          Add some favorite movies to see them in this list.
        </div>
      </template>
    </HorizontalList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HorizontalList from '@/components/List/HorizontalList/HorizontalList.vue'
import MovieItem from '@/components/Item/MovieItem.vue'

export default {
  name: 'Favorites',
  components: { MovieItem, HorizontalList },
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
