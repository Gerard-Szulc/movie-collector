import { request } from '@/utils/apiClient.js'
import { currentPageGetter, totalPagesGetter } from '@/store/utils/getters/getters.js'

const SET_POPULAR_RESULTS = 'SET_POPULAR_RESULTS'
const CLEAR_POPULAR_RESULTS = 'CLEAR_POPULAR_RESULTS'
const SET_POPULAR_CURRENT_PAGE = 'SET_POPULAR_CURRENT_PAGE'
const SET_POPULAR_TOTAL_PAGES = 'SET_POPULAR_TOTAL_PAGES'
const SET_POPULAR_TOTAL_RESULTS = 'SET_POPULAR_TOTAL_RESULTS'
const SET_POPULAR_LOADING = 'SET_POPULAR_LOADING'
export const popular = {
  namespaced: true,
  state: {
    loading: false,
    popular: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 0
  },
  getters: {
    popularResultsGetter: state => {
      return state.popular
    },
    totalPagesGetter,
    currentPageGetter
  },
  mutations: {
    CLEAR_POPULAR_RESULTS: (state) => {
      state.searchResult = []
      state.currentPage = 0
      state.totalPages = 0
      state.totalResults = 0
    },
    SET_POPULAR_RESULTS: (state, payload) => {
      state.popular = payload
    },
    SET_POPULAR_CURRENT_PAGE: (state, payload) => {
      state.currentPage = payload
    },
    SET_POPULAR_TOTAL_PAGES: (state, payload) => {
      state.totalPages = payload
    },
    SET_POPULAR_TOTAL_RESULTS: (state, payload) => {
      state.totalResults = payload
    },
    SET_POPULAR_LOADING: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
    loadPopularMovies ({
      commit,
      state
    }, { page = 1 }) {
      commit(SET_POPULAR_LOADING, true)
      commit(CLEAR_POPULAR_RESULTS, true)
      request('/movie/popular', 'get', {
        params: {
          page
        }
      }).then(({ data }) => {
        commit(SET_POPULAR_RESULTS, data.results)
        commit(SET_POPULAR_CURRENT_PAGE, data.page)
        commit(SET_POPULAR_TOTAL_PAGES, data.total_pages)
        commit(SET_POPULAR_TOTAL_RESULTS, data.total_results)
        commit(SET_POPULAR_LOADING, false)
        this.seachResult = data.results
      }).catch((error) => {
        commit(SET_POPULAR_LOADING, false)
        console.error(error)
      })
    }
  }
}
