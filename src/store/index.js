import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '@/utils/apiClient.js'
import { movies } from '@/store/modules/movies'

Vue.use(Vuex)

const SET_CONFIGURATION = 'SET_CONFIGURATION'
export default new Vuex.Store({
  state: {
    config: {}
  },
  mutations: {
    SET_CONFIGURATION: (state, payload) => {
      state.config = payload
    }
  },
  actions: {
    loadConfiguration ({
      commit,
      state
    }) {
      request('/configuration', 'get').then(({ data }) => {
        commit(SET_CONFIGURATION, data)
      }).catch((error) => {
        const config = {
          images: {
            base_url: 'http://image.tmdb.org/t/p/',
            secure_base_url: 'https://image.tmdb.org/t/p/',
            backdrop_sizes: [
              'w300',
              'w780',
              'w1280',
              'original'
            ],
            logo_sizes: [
              'w45',
              'w92',
              'w154',
              'w185',
              'w300',
              'w500',
              'original'
            ],
            poster_sizes: [
              'w92',
              'w154',
              'w185',
              'w342',
              'w500',
              'w780',
              'original'
            ]
          }
        }
        commit(SET_CONFIGURATION, config)

        console.error(error)
      })
    }
  },
  getters: {
    configurationGetter: state => {
      return state.config
    },
    baseImageUrlGetter: state => {
      return state.config.images.secure_base_url
    },
    posterSizesGetter: state => {
      return state.config.images.poster_sizes
    }
  },
  modules: {
    movies
  }
})
