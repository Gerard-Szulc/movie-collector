<template>
  <div v-if="configLoaded" id="app">
    <NavBar></NavBar>
    <div id="dashboard">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "assets/scss/custom";
</style>
<script setup lang="ts">
import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";
import { computed } from "vue";

const { dispatch, getters } = useStore();

dispatch("loadConfiguration");
dispatch("movies/favorites/loadFavoriteMovies");
const configLoaded = computed((): boolean => getters.configLoadedGetter);
</script>
