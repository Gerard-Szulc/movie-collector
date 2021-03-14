<template>
  <div>
    <SearchList></SearchList>
  </div>
</template>

<script>
import SearchList from '@/components/Search/SearchList.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Search',
  components: {
    SearchList
  },
  created () {
    if (!this.searchValue) {
      this.$router.push({ name: 'Home' })
    }
  },
  computed: {
    ...mapGetters({
      searchValue: 'movies/search/searchValueGetter'
    })
  }
}
</script>

<style scoped>

</style>
