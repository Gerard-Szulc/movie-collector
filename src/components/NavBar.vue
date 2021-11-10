<template>
  <nav id="nav" class="navbar navbar-expand-sm navbar-dark navbar-custom-dark">
    <router-link class="navbar-brand" to="/">Movie Collector</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <SearchBox class="d-flex"></SearchBox>
    </div>
  </nav>
</template>

<script setup>
import SearchBox from '@/components/Search/SearchBox.vue'
</script>

<style scoped>
#nav {
  position: sticky;
  top: 0;
  z-index: 1099;
}

.navbar-custom-dark {
  background-color: #0d253f;
}
</style>
