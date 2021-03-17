<template>
  <nav id="nav" class="navbar navbar-expand-sm navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Movie Collector</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
      </ul>
      <SearchBox></SearchBox>
    </div>
  </nav>
</template>

<script>
import SearchBox from '@/components/Search/SearchBox.vue'

export default {
  name: 'NavBar',
  components: {
    SearchBox
  }
}
</script>

<style scoped lang="scss">
#nav {
  position: sticky;
  top: 0;
  z-index: 1099;
}
</style>
