<template>
  <div id="app" v-if="configLoaded">
    <NavBar></NavBar>
    <router-view id="dashboard" />
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
  },
  computed: {
    ...mapGetters({
      configLoaded: 'configLoadedGetter'
    })
  },
  methods: {
    ...mapActions({
      loadConfiguration: 'loadConfiguration'
    })
  }
}
</script>
