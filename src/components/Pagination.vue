<template>
  <nav aria-label="Pagination" v-if="totalPagesGetter !== 0 && currentPageGetter !== 0">
    <ul class="pagination justify-content-center">
      <li v-if="previous >= 1" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => handlePageChange(1)"><i class="bi-arrow-left-circle-fill"></i></a></li>
      <li v-if="previous >= 1" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => handlePageChange(previous)"><i class="bi-arrow-left-circle"></i>
        </a>
      </li>
      <li v-if="previous >= 1" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => handlePageChange(previous)">{{ previous }}</a>
      </li>
      <li class="page-item">
        <a class="page-link active" aria-current="page">{{ currentPageGetter }}</a>
      </li>
      <li v-if="next <= totalPagesGetter" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => handlePageChange(next)"> {{ next }}</a>
      </li>
      <li v-if="next <= totalPagesGetter" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => handlePageChange(next)"><i class="bi-arrow-right-circle"></i></a>
      </li>
      <li v-if="next <= totalPagesGetter" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => handlePageChange(totalPagesGetter)"><i class="bi-arrow-right-circle-fill"></i>({{ totalPagesGetter }})</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  // props: {
  //   totalPages: {
  //     type: Number,
  //     required: true
  //   },
  //   currentPage: {
  //     type: Number,
  //     required: true
  //   }
  // },
  computed: {
    ...mapGetters({
      totalPagesGetter: 'movies/search/totalPagesGetter',
      currentPageGetter: 'movies/search/currentPageGetter',
      searchValueGetter: 'movies/search/searchValueGetter'
    }),
    next () {
      return this.currentPageGetter + 1
    },
    previous () {
      return this.currentPageGetter - 1
    }
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/search/loadMovies'
    }),
    handlePageChange (page) {
      this.loadMovies({
        searchValue: this.searchValueGetter,
        redirect: () => {
        },
        page
      })
    }
  }
}
</script>

<style scoped>

</style>
