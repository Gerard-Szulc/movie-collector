<template>
  <div class="home">
    <PoweredBy></PoweredBy>
    <PopularMovies></PopularMovies>
    <Favorites></Favorites>
  </div>
</template>
<script>

import PopularMovies from '@/components/PopularMovies.vue'
import Favorites from '@/components/Favorites.vue'
import PoweredBy from '@/components/PoweredBy.vue'

export default {
  name: 'Home',
  components: {
    PoweredBy,
    Favorites,
    PopularMovies
  }
}
</script>
<style scoped lang="scss">
.home {
  height: 100vh;
  background: linear-gradient(
      180deg, #0d253f, rgba(255, 0, 0, 0) 45.00%), linear-gradient(
      178deg, #01b4e4, rgba(0, 255, 0, 0) 70.71%), linear-gradient(
      180deg, #90cea1, rgba(0, 0, 255, 0) 70.71%);
}
</style>
