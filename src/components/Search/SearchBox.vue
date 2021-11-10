<template>
  <form @submit.prevent="redirectToSearchList" class="form-inline my-2 my-lg-0">
    <input id="search" class="form-control mr-md-2" type="search" placeholder="Search for a movie" aria-label="Search movies"
           v-model="searchValue" @input.prevent="search">
<!--    <button class="btn btn-outline-primary my-2 my-sm-0 search-button" type="submit">Search</button>-->
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

.search-button {
  display: none
}

@media screen and (max-width: 576px) {
  .search-button {
    color: #0d253f;
    background-color: #01b4e4;
    display: inline-block;
    width: 100%;
  }
}
</style>
