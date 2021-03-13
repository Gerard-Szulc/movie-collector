<template>
  <div class="card movie_card">
    <img
      v-if="movie.poster_path"
      :src="`${baseImageUrlGetter}/${posterSizesGetter[1]}${movie.poster_path}`"
      class="card-img-top"
      :alt="movie.title"
    >
    <img v-else
         src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg">
    <div class="card-body">
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
.movie_card {
  width: 10rem;
  margin: 14px;
  border-radius: 10px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);
}

.movie_card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 15rem;
}

.movie-info {
  color: #5e5c5c;
}

.card-title {
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  /*height: 2rem;*/
}
.card-body {
  padding: 0.55rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
