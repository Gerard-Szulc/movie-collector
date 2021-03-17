<template>
  <div>
    <div>Genres: <template v-for="(genre, index)  in movie.genres" ><span :key="`genre-${genre.id}`">{{ genre.name }}{{index === movie.genres.length - 1 ? '.' : ', '}}</span></template></div>
    <div class="vote-average">Vote average: <i class="bi-star-fill"></i> {{movie.vote_average}}</div>
    <div>Vote count: {{movie.vote_count}}</div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalInfo',
  props: {
    movie: {
      type: Object,
      default: () => ({
        genres: [],
        vote_average: 0,
        vote_count: 0
      })
    }
  }
}
</script>

<style scoped>
.vote-average i {
  color: gold;
}
</style>
