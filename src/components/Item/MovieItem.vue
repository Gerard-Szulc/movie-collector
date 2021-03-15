<template>
  <ListItem :item="element" :key="element.id">
    <template v-slot:list-item-header >
      <MovieListItemHeader :element="element"/>
    </template>
    <template v-slot:movie-info>
      <span class="movie-info">{{ new Date(element.release_date).getFullYear() || '' }}</span>
    </template>
  </ListItem>
</template>

<script>
import ListItem from '@/components/Item/ListItem.vue'
import { mapActions, mapGetters } from 'vuex'
import MovieListItemHeader from '@/components/Item/MovieListItemHeader.vue'
export default {
  name: 'MovieItem',
  components: { MovieListItemHeader, ListItem },
  props: {
    element: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      isFavoriteMovie: 'movies/favorites/isFavoriteMovieGetter',
      favoritesLoading: 'movies/favorites/loadingGetter'
    })
  },
  methods: {
    ...mapActions({
      addFavorite: 'movies/favorites/toggleFavoriteMovie'
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/itemListHeader.scss";
</style>
