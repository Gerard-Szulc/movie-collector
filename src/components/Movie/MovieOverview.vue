<template>
  <div class="col-xs-12 offset-md-3 col-md-6 movie-overview">
    <h5>Overview:</h5>
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieOverview',
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.movie-overview {
& h5 {
    text-align: center;
  }

& p {
    text-indent: 25px;
    text-align: justify;
  }
}

</style>
