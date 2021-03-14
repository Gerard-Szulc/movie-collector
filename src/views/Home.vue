<template>
  <div class="home">
    <PopularMovies></PopularMovies>
  </div>
</template>

<script>

import PopularMovies from '@/components/PopularMovies.vue'
export default {
  name: 'Home',
  components: {
    PopularMovies
  }
}
</script>
