<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Movie Collector</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/"><span>Home</span></router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/about"><span>About</span></router-link>
        </li>
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

<style scoped>
#nav {
  position: sticky;
  top: 0;
  z-index: 1099;
}
</style>
