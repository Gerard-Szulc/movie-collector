<template>
  <form @submit.prevent="redirectToSearchList" class="form-inline my-2 my-lg-0">
    <label for="search"></label>
    <input id="search" class="form-control mr-md-2" type="search" placeholder="Search movies" aria-label="Searchmovies"
           v-model="searchValue" @input.prevent="search">
<!--    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>-->
  </form>
</template>

<script>
import { mapActions } from 'vuex'

const SEARCH_TIMEOUT = 450
export default {
  name: 'SearchBox',
  data () {
    return {
      searchValue: '',
      typingTimeoutId: null
    }
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/search/loadMovies'
    }),
    redirectToSearchList () {
      if (!this.searchValue) {
        this.$router.push({
          name: 'Home'
        })
        return
      }
      if (this.$route.name === 'search-results') {
        return
      }
      this.$router.push({
        name: 'search-results'
      })
    },
    search () {
      if (this.typingTimeoutId) {
        clearTimeout(this.typingTimeoutId)
      }
      this.typingTimeoutId = setTimeout(() => {
        this.loadMovies({
          searchValue: this.searchValue,
          redirect: this.redirectToSearchList
        })
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
