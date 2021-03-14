import { request } from '@/utils/apiClient.js'
import { currentPageGetter, totalPagesGetter } from '@/store/utils/getters/getters.js'
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
const SET_SEARCH_CURRENT_PAGE = 'SET_SEARCH_CURRENT_PAGE'
const SET_SEARCH_TOTAL_PAGES = 'SET_SEARCH_TOTAL_PAGES'
const SET_SEARCH_TOTAL_RESULTS = 'SET_SEARCH_TOTAL_RESULTS'
const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'

export const search = {
  namespaced: true,
  state: {
    loading: false,
    searchValue: '',
    searchResult: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 0
  },
  getters: {
    searchResultsGetter: state => {
      return state.searchResult
    },
    totalPagesGetter,
    currentPageGetter,
    searchValueGetter: state => {
      return state.searchValue
    }
  },
  mutations: {
    SET_SEARCH_VALUE: (state, payload) => {
      state.searchValue = payload
    },
    CLEAR_SEARCH_RESULTS: (state) => {
      state.searchResult = []
      state.currentPage = 0
      state.totalPages = 0
      state.totalResults = 0
    },
    SET_SEARCH_RESULTS: (state, payload) => {
      state.searchResult = payload
    },
    SET_SEARCH_CURRENT_PAGE: (state, payload) => {
      state.currentPage = payload
    },
    SET_SEARCH_TOTAL_PAGES: (state, payload) => {
      state.totalPages = payload
    },
    SET_SEARCH_TOTAL_RESULTS: (state, payload) => {
      state.totalResults = payload
    },
    SET_SEARCH_LOADING: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
    loadMovies ({
      commit,
      state
    }, {
      searchValue,
      redirect,
      page = 1
    }) {
      commit(SET_SEARCH_LOADING, true)
      if (!searchValue) {
        commit(CLEAR_SEARCH_RESULTS)
        redirect()
        return
      }
      request('/search/movie', 'get',
        {
          params: {
            query: searchValue,
            page
          }
        }).then(({ data }) => {
        commit(SET_SEARCH_VALUE, searchValue)
        commit(SET_SEARCH_RESULTS, data.results)
        commit(SET_SEARCH_CURRENT_PAGE, data.page)
        commit(SET_SEARCH_TOTAL_PAGES, data.total_pages)
        commit(SET_SEARCH_TOTAL_RESULTS, data.total_results)
        commit(SET_SEARCH_LOADING, false)
        this.seachResult = data.results
        redirect()
      }).catch((error) => {
        commit(SET_SEARCH_LOADING, false)
        console.error(error)
      })
    }
  }
}
