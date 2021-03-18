<template>
  <div v-if="!loading">
    <div id="movie-container">
      <div class="movie-background-wrapper">
        <img
          v-if="movieFullBackdrop ? movieFullBackdrop : movieBackdrop"
          :src="movieFullBackdrop ? movieFullBackdrop : movieBackdrop"
          class="movie-background">
        <div class="movie-background movie-background-replacement">
        </div>
      </div>
      <div class="">
        <div class="">
          <div class="col-sm-12">
            <div class="container">
              <list-item :item="movie" item-title-prop="">
                <template v-slot:list-item-header>
                  <MovieListItemHeader :element="movie"/>
                </template>
              </list-item>
            </div>
          </div>
          <div class="movie-details col-sm-12">
            <div class="container">
              <h1 class="display-4">{{ movie.title }}</h1>
              <AdditionalInfo :movie="movie" class="col-xs-12 col-md-4"></AdditionalInfo>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-details jumbotron jumbotron-fluid">
        <div class="container">
          <div class="movie-details-other col-xs-12">
            <div class="col-xs-12 offset-md-3 col-md-6 movie-overview">
              <h5>Overview:</h5>
              <p>{{ movie.overview }}</p>
            </div>
            <div class="col-xs-12">
              <HorizontalList
                :title="'Cast'"
                :list="primaryCast"
                :loading="false"
              >
                <template v-slot:list-item="{ element }">
                  <ListItem :item="element" item-title-prop="original_name" item-image-prop="profile_path"
                            :key="element.cast_id" :redirect-enabled="false">
                    <div slot="element-info" class="cast-character">
                      {{ element.character }}
                    </div>
                  </ListItem>
                </template>
                <template v-slot:notice>
                  <div class="alert alert-warning" role="alert">
                    Sorry, no available cast on this list.
                  </div>
                </template>
              </HorizontalList>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/Item/ListItem.vue'
import { request } from '@/utils/apiClient.js'
import AdditionalInfo from '@/components/Movie/AdditionalInfo.vue'
import MovieListItemHeader from '@/components/Item/MovieListItemHeader.vue'
import HorizontalList from '@/components/List/HorizontalList/HorizontalList.vue'
import handleGetImageMixin from '@/components/handleGetImageMixin.js'

export default {
  name: 'Movie',
  components: {
    HorizontalList,
    MovieListItemHeader,
    AdditionalInfo,
    ListItem
  },
  mixins: [
    handleGetImageMixin
  ],
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      movieBackdrop: null,
      movieFullBackdrop: null,
      cast: []
    }
  },
  created () {
    this.getMovie(this.id)
    this.getCast(this.id)
  },
  watch: {
    loading: function (val, oldVal) {
      if (oldVal === true && val === false) {
        this.loadImages()
      }
    }
  },
  computed: {
    ...mapGetters({
      movie: 'movies/movieGetter',
      loading: 'movies/loadingGetter',
      backdropSizesGetter: 'backdropSizesGetter',
      baseImageUrlGetter: 'baseImageUrlGetter',
      isFavoriteMovie: 'movies/favorites/isFavoriteMovieGetter',
      favoritesLoading: 'movies/favorites/loadingGetter'
    }),
    primaryCast () {
      return this.cast.slice(0, 20)
    }
  },
  methods: {
    ...mapActions({
      getMovie: 'movies/loadMovie',
      addFavorite: 'movies/favorites/toggleFavoriteMovie'
    }),
    loadImages () {
      if (!this.movie.backdrop_path) {
        return
      }
      this.movieBackdrop = `${this.baseImageUrlGetter}${this.backdropSizesGetter[0]}${this.movie.backdrop_path}`
      this.toDataURL(`${this.baseImageUrlGetter}${this.backdropSizesGetter[this.backdropSizesGetter.length - 2]}${this.movie.backdrop_path}`).then((data) => {
        this.movieFullBackdrop = data
      })
    },
    getCast (id) {
      request(`/movie/${id}/credits`).then(({ data }) => {
        this.cast = data.cast
      }).catch(e => {
        console.error(e)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../node_modules/bootstrap/scss/bootstrap";
@import "../../node_modules/bootstrap/scss/variables";

#movie-container {
  padding-top: 20px;
}

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

.movie-details {
  background-color: rgba(255, 255, 255, 0.8);
}

.movie-overview {
  & h5 {
    text-align: center;
  }

  & p {
    text-indent: 25px;
    text-align: justify;
  }
}

.movie-background-replacement {
  position: absolute;
  height: 20rem;
  width: 100vw;
  background-image: linear-gradient(180deg, $primary, transparent 45%);
  z-index: -1;
}

.cast-list {
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $secondary;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary;
    border-radius: 10px;
  }

  overflow: auto;
  max-height: 40rem;
}

.cast-character {
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cast-character:hover {
  max-height: 100%;
  white-space: normal;
}

</style>
