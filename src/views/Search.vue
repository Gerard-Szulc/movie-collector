<template>
  <div>
    <SearchList></SearchList>
    <Pagination></Pagination>
  </div>
</template>

<script>
import SearchList from '@/components/SearchList.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Search',
  components: {
    Pagination,
    SearchList
  }
}
</script>

<style scoped>

</style>
