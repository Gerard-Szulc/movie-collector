<template>
  <div class="movie-background-wrapper">
    <img
      v-if="movieFullBackdrop ? movieFullBackdrop : movieBackdrop"
      :src="movieFullBackdrop ? movieFullBackdrop : movieBackdrop"
      class="movie-background"
      :alt="`${movie.title} poster`"
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import handleGetImageMixin from '@/components/handleGetImageMixin.js'

export default {
  name: 'MovieBackdrop',
  mixins: [
    handleGetImageMixin
  ],
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      movieBackdrop: null,
      movieFullBackdrop: null
    }
  },
  computed: {
    ...mapGetters({
      backdropSizesGetter: 'backdropSizesGetter',
      baseImageUrlGetter: 'baseImageUrlGetter'
    })
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages () {
      if (!this.movie.backdrop_path) {
        return
      }
      this.movieBackdrop = `${this.baseImageUrlGetter}${this.backdropSizesGetter[0]}${this.movie.backdrop_path}`
      this.toDataURL(`${this.baseImageUrlGetter}${this.backdropSizesGetter[this.backdropSizesGetter.length - 2]}${this.movie.backdrop_path}`).then((data) => {
        this.movieFullBackdrop = data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.movie-background-wrapper {
  top: 50px;
  z-index: -1;
  position: absolute;
  max-height: 31rem;
  width: 100%;
  overflow: hidden;
}

.movie-background {
  min-height: 17rem;
  height: 35vh;
  float: left;
}

@media screen and (min-width: 576px) {
  .movie-background {
    height: auto;
    position: relative;
    width: 100%;
  }
}

</style>
