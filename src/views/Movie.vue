<template>
  <div v-if="!loading">
    <div id="movie-container">
      <div class="movie-background-wrapper">
        <img
          v-if="movieFullBackdrop || movieBackdrop"
          :src="movieFullBackdrop ? movieFullBackdrop : movieBackdrop"
          class="movie-background">
        <div v-else class="movie-background movie-background-replacement">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-3">
            <list-item :item="movie" item-title-prop="" >
              <template v-slot:list-item-header >
              <MovieListItemHeader :element="movie"/>
              </template>
            </list-item>
          </div>
          <div class="movie-details col-sm-9">
            <div class="container">
              <h1 class="display-4">{{ movie.title }}</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-details jumbotron jumbotron-fluid">
        <div class="container">
          <div class="movie-details-other row col-xs-12">
            <AdditionalInfo :movie="movie" class="col-xs-12 col-md-4"></AdditionalInfo>
            <div class="col-xs-12 col-md-4 movie-overview">
              <h5>Overview:</h5>
              {{ movie.overview }}
            </div>
            <div class="col-xs-12 col-md-4">
              <h1 class="display-4 offset-6 col-xs-6">Cast</h1>
              <div class="cast-list float-right">
                <template v-for="person in primaryCast">
                  <ListItem :item="person" item-title-prop="original_name" item-image-prop="profile_path" :key="person.cast_id">
                    <div slot="movie-info">
                      {{ person.character }}
                    </div>
                  </ListItem>
                </template>
              </div>
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
import axios from 'axios'
import { request } from '@/utils/apiClient.js'
import AdditionalInfo from '@/components/Movie/AdditionalInfo.vue'
import MovieListItemHeader from '@/components/Item/MovieListItemHeader.vue'

export default {
  name: 'Movie',
  components: { MovieListItemHeader, AdditionalInfo, ListItem },
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
      this.toDataURL(`${this.baseImageUrlGetter}${this.backdropSizesGetter[0]}${this.movie.backdrop_path}`).then((data) => {
        this.movieBackdrop = data
      })
      this.toDataURL(`${this.baseImageUrlGetter}${this.backdropSizesGetter[this.backdropSizesGetter.length - 1]}${this.movie.backdrop_path}`).then((data) => {
        this.movieFullBackdrop = data
      })
    },
    toDataURL (url) {
      return axios({
        url,
        method: 'get',
        headers: null,
        responseType: 'blob'
      })
        .then(response => {
          return response.data
        })
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
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

.movie-background-replacement {
  height: 20rem;
  width: 100vw;
  background-image: linear-gradient(40deg, $primary, transparent);
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

</style>
