import { currentPageGetter, loadingGetter, totalPagesGetter } from '@/store/utils/getters/getters.js'
import { getStorageItem, setStorageItem } from '@/store/utils/localStorage'
import { calculateTotalPages } from '@/store/utils'

const SET_FAVORITE_RESULTS = 'SET_FAVORITE_RESULTS'
// const CLEAR_FAVORITE_RESULTS = 'CLEAR_FAVORITE_RESULTS'
const SET_FAVORITE_CURRENT_PAGE = 'SET_FAVORITE_CURRENT_PAGE'
const SET_FAVORITE_TOTAL_PAGES = 'SET_FAVORITE_TOTAL_PAGES'
const SET_FAVORITE_TOTAL_RESULTS = 'SET_FAVORITE_TOTAL_RESULTS'
const ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE'
const REMOVE_FAVORITE_MOVIE = 'REMOVE_FAVORITE_MOVIE'
const SET_FAVORITE_LOADING = 'SET_FAVORITE_LOADING'
export const favorites = {
  namespaced: true,
  state: {
    loading: true,
    favorites: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 0
  },
  getters: {
    favoritesResultsGetter: state => {
      return state.favorites
    },
    loadingGetter,
    totalPagesGetter,
    currentPageGetter,
    isFavoriteMovieGetter: state => movie => {
      return state.favorites.some(favoriteMovie => favoriteMovie.id === movie.id)
    }
  },
  mutations: {
    CLEAR_FAVORITE_RESULTS: (state) => {
      state.favorites = []
      state.currentPage = 0
      state.totalPages = 0
      state.totalResults = 0
    },
    SET_FAVORITE_RESULTS: (state, payload) => {
      state.favorites = payload
    },
    SET_FAVORITE_CURRENT_PAGE: (state, payload) => {
      state.currentPage = payload
    },
    SET_FAVORITE_TOTAL_PAGES: (state, payload) => {
      state.totalPages = payload
    },
    SET_FAVORITE_TOTAL_RESULTS: (state, payload) => {
      state.totalResults = payload
    },
    SET_FAVORITE_LOADING: (state, payload) => {
      state.loading = payload
    },
    ADD_FAVORITE_MOVIE: (state, payload) => {
      state.favorites.push(payload)
      state.totalPages = calculateTotalPages(state, 'favorites')
      state.totalResults = state.favorites.length
      setStorageItem('favorites', state).catch(e => {
        console.error(e)
      })
    },
    REMOVE_FAVORITE_MOVIE: (state, payload) => {
      state.favorites = state.favorites.filter(movie => movie.id !== payload.id)
      state.totalPages = calculateTotalPages(state, 'favorites')
      state.totalResults = state.favorites.length
      setStorageItem('favorites', state).catch(e => {
        console.error(e)
      })
    }
  },
  actions: {
    toggleFavoriteMovie ({
      commit,
      state
    }, movie) {
      if (state.favorites.find(element => element.id === movie.id)) {
        commit(REMOVE_FAVORITE_MOVIE, movie)
        return
      }
      commit(ADD_FAVORITE_MOVIE, movie)
    },
    loadFavoriteMovies ({
      commit,
      state
    }, { page = 1 }) {
      commit(SET_FAVORITE_LOADING, true)
      getStorageItem('favorites').then((data) => {
        console.log(data)
        commit(SET_FAVORITE_RESULTS, data.favorites)
        commit(SET_FAVORITE_CURRENT_PAGE, data.currentPage)
        commit(SET_FAVORITE_TOTAL_PAGES, data.totalPages)
        commit(SET_FAVORITE_TOTAL_RESULTS, data.totalResults)
        commit(SET_FAVORITE_LOADING, false)
        this.seachResult = data.results
      }).catch(() => {
        commit(SET_FAVORITE_RESULTS, [])
        commit(SET_FAVORITE_LOADING, false)
      })
    }
  }
}
