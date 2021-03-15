<template>
  <div v-if="!isLoading && element" class="list-item-header" title="Click to favorite this movie.">
    <i :class="isFavoriteMovie(element) ? `bi-star-fill`: 'bi-star'" @click="() => toggleFavorite(element)"></i>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MovieListItemHeader',
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'movies/favorites/loadingGetter',
      isFavoriteMovie: 'movies/favorites/isFavoriteMovieGetter'
    })
  },
  methods: {
    ...mapActions({
      toggleFavorite: 'movies/favorites/toggleFavoriteMovie'
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/itemListHeader.scss";

</style>
