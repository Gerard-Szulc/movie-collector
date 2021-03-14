<template>
  <nav aria-label="Pagination" v-if="totalPages !== 0 && currentPage !== 0">
    <ul class="pagination justify-content-center">
      <li v-if="previous >= 1" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => changePage(1)"><i
            class="bi-arrow-left-circle-fill"></i></a></li>
      <li v-if="previous >= 1" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => changePage(previous)"><i
            class="bi-arrow-left-circle"></i>
        </a>
      </li>
      <li v-if="previous >= 1" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => changePage(previous)">{{ previous }}</a>
      </li>
      <li class="page-item">
        <a class="page-link active" aria-current="page">{{ currentPage }}</a>
      </li>
      <li v-if="next <= totalPages" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => changePage(next)"> {{ next }}</a>
      </li>
      <li v-if="next <= totalPages" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => changePage(next)"><i
            class="bi-arrow-right-circle"></i></a>
      </li>
      <li v-if="next <= totalPages" class="page-item">
        <a class="page-link" href="#" @click.prevent="() => changePage(totalPages)"><i
            class="bi-arrow-right-circle-fill"></i>({{ totalPages }})</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import ListMixin from '@/components/List/ListMixin.js'

export default {
  name: 'Pagination',
  mixins: [
    ListMixin
  ],
  computed: {
    next () {
      return this.currentPage + 1
    },
    previous () {
      return this.currentPage - 1
    }
  }
}
</script>

<style scoped>

</style>
