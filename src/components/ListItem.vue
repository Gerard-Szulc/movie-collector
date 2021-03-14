<template>
  <div class="card movie-card">
    <img
      v-if="movie.poster_path"
      :src="`${baseImageUrlGetter}/${posterSizesGetter[1]}${movie.poster_path}`"
      class="card-img-top"
      :alt="movie.title"
    >
    <img v-else
         src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" :alt="movie.title">
    <div class="card-body" :class="{'card-body-visible': !movie.poster_path}">
      <p class="card-title"><strong>{{ movie.title }}</strong></p>
      <span class="movie-info">{{ new Date(movie.release_date).getFullYear() || '' }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListItem',
  props: {
    movie: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      posterSizesGetter: 'posterSizesGetter',
      baseImageUrlGetter: 'baseImageUrlGetter'
    })
  }
}
</script>

<style scoped>
.movie-card {
  cursor: pointer;
  width: 10rem;
  height: 100%;
  margin: 14px;
  border-radius: 10px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);
}

.movie-card img {
  border-radius: 10px;
  height: 15rem;
}

.movie-info {
  color: #5e5c5c;
}

.card-body {
  position: absolute;
  display: flex;
  bottom: 0;
  opacity: 0;
  width: 100%;
  padding: 0.55rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all ease-in-out 0.2s;
  background-color: rgba(255, 255, 255, 0);
}

.card:hover .card-body, .card-body-visible {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
