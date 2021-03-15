<template>
  <div class="home">
    <PopularMovies></PopularMovies>
    <Favorites></Favorites>
  </div>
</template>

<script>

import PopularMovies from '@/components/PopularMovies.vue'
import Favorites from '@/components/Favorites.vue'
export default {
  name: 'Home',
  components: {
    Favorites,
    PopularMovies
  }
}
</script>
