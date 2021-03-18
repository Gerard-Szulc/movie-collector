<template>
  <div v-if="!loading">
    <div id="movie-container">
      <MovieBackdrop :movie="movie"></MovieBackdrop>
      <MovieHeader :movie="movie"></MovieHeader>

      <div class="movie-details jumbotron jumbotron-fluid">
        <div class="container">
          <div class="movie-details-other col-xs-12">
            <MovieOverview :movie="movie"></MovieOverview>
            <CastList :movie="movie"></CastList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MovieBackdrop from '@/components/Movie/MovieBackdrop.vue'
import MovieHeader from '@/components/Movie/MovieHeader.vue'
import MovieOverview from '@/components/Movie/MovieOverview.vue'
import CastList from '@/components/Movie/CastList.vue'

export default {
  name: 'Movie',
  components: {
    CastList,
    MovieOverview,
    MovieHeader,
    MovieBackdrop
  },
  props: {
    id: {
      required: true
    }
  },
  created () {
    this.getMovie(this.id)
  },
  computed: {
    ...mapGetters({
      movie: 'movies/movieGetter',
      loading: 'movies/loadingGetter',
      isFavoriteMovie: 'movies/favorites/isFavoriteMovieGetter',
      favoritesLoading: 'movies/favorites/loadingGetter'
    })
  },
  methods: {
    ...mapActions({
      getMovie: 'movies/loadMovie',
      addFavorite: 'movies/favorites/toggleFavoriteMovie'
    })
  }
}
</script>

<style scoped lang="scss">
#movie-container {
  padding-top: 20px;
}
</style>
