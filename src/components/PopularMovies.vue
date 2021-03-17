<template>
  <div>
    <HorizontalList
      :title="'Popular movies'"
      :list="popularResultsGetter"
      :loading="loadingPopularMoviesGetter"
    >
      <template v-slot:list-item="{ element }">
        <MovieItem :element="element" :key="element.id"/>
      </template>
      <template v-slot:notice>
        <div class="alert alert-warning" role="alert">
          Sorry, no available element on this list.
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
  name: 'PopularMovies',
  components: { MovieItem, HorizontalList },
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
