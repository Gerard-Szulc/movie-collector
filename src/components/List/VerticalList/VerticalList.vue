<template>
  <div>
    <div class="vertical-list" v-if="list.length !== 0">
      <template v-for="element in list">
        <slot v-bind:element="element" name="list-item"/>
      </template>
    </div>
    <div v-else>
      <div class="alert alert-warning" role="alert">
        {{ emptyListNotice }}
      </div>
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :changePage="changePage">
    </Pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListMixin from '@/components/List/ListMixin.js'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'VerticalList',
  components: { Pagination },
  mixins: [
    ListMixin
  ],
  computed: {
    ...mapGetters({
      searchResultsGetter: 'movies/search/searchResultsGetter'
    })
  }
}
</script>

<style scoped lang="scss">
.vertical-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  min-height: 88vh;
}
</style>
