import { search } from '@/store/modules/search'
import { popular } from '@/store/modules/popular'
import { favorites } from '@/store/modules/favorite'
import { request } from '@/utils/apiClient.js'
import { loadingGetter } from '@/store/utils/getters/getters.js'

const SET_MOVIE = 'SET_MOVIE'
const SET_MOVIE_LOADING = 'SET_MOVIE_LOADING'

export const movies = {
  namespaced: true,
  state: {
    loading: true,
    movie: {}
  },
  mutations: {
    SET_MOVIE_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_MOVIE: (state, payload) => {
      state.movie = payload
    }
  },
  getters: {
    movieGetter: (state) => {
      return state.movie
    },
    loadingGetter
  },
  actions: {
    loadMovie ({
      commit,
      store
    }, id) {
      commit(SET_MOVIE_LOADING, true)
      request(`/movie/${id}`, 'get').then(({ data }) => {
        commit(SET_MOVIE, data)
        commit(SET_MOVIE_LOADING, false)
      }).catch(error => {
        commit(SET_MOVIE_LOADING, false)
        console.error(error)
      })
    }
  },
  modules: {
    search,
    popular,
    favorites
  }
}
