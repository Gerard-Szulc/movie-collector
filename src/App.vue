<template>
  <div id="app" v-if="configLoaded">
    <NavBar></NavBar>
    <div id="dashboard">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import 'assets/scss/custom';
</style>
<script>
import NavBar from '@/components/NavBar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { NavBar },
  created () {
    this.loadConfiguration()
    this.loadFavoriteMovies({})
  },
  computed: {
    ...mapGetters({
      configLoaded: 'configLoadedGetter'
    })
  },
  methods: {
    ...mapActions({
      loadConfiguration: 'loadConfiguration',
      loadFavoriteMovies: 'movies/favorites/loadFavoriteMovies'
    })
  }
}
</script>
