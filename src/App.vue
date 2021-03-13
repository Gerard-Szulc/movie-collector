<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'assets/scss/custom';
</style>
<script>
import NavBar from '@/components/NavBar.vue'
import { mapActions } from 'vuex'

export default {
  components: { NavBar },
  created () {
    this.loadConfiguration()
  },
  methods: {
    ...mapActions({
      loadConfiguration: 'loadConfiguration'
    })
  }
}
</script>
