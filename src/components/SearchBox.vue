<template>
  <form @submit.prevent="redirectToSearchList" class="form-inline my-2 my-lg-0">
    <label for="search"></label>
    <input id="search" class="form-control mr-sm-2" type="search" placeholder="Search movies" aria-label="Searchmovies"
           v-model="searchTerm" @input="search">
    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

const SEARCH_TIMEOUT = 450
export default {
  name: 'SearchBox',
  data () {
    return {
      searchTerm: '',
      typeTimeoutId: null
    }
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/search/loadMovies'
    }),
    redirectToSearchList () {
      this.$router.push({
        name: 'search-results',
        params: { query: this.searchTerm }
      })
    },
    search (event) {
      event.preventDefault()
      if (this.typeTimeoutId) {
        clearTimeout(this.typeTimeoutId)
      }
      this.typeTimeoutId = setTimeout(() => {
        this.loadMovies(this.searchTerm)
      }, SEARCH_TIMEOUT)
    }
  }
}
</script>

<style lang="scss" scoped>
#search-container {
  display: inline-block;
}

#search-list {
  float: right;
}
</style>
