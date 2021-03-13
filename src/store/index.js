import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '@/utils/apiClient.js'

Vue.use(Vuex)
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
const SET_SEARCH_CURRENT_PAGE = 'SET_SEARCH_CURRENT_PAGE'
const SET_SEARCH_TOTAL_PAGES = 'SET_SEARCH_TOTAL_PAGES'
const SET_SEARCH_TOTAL_RESULTS = 'SET_SEARCH_TOTAL_RESULTS'
const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'

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
    movies: {
      namespaced: true,
      state: {
        favourite: [],
        popular: []
      },
      mutations: {},
      actions: {},
      modules: {
        search: {
          namespaced: true,
          state: {
            loading: false,
            searchResult: [],
            totalPages: 0,
            totalResults: 0,
            currentPage: 0
          },
          getters: {
            searchResultsGetter: state => {
              return state.searchResult
            }
          },
          mutations: {
            CLEAR_SEARCH_RESULTS: (state) => {
              state.searchResult = []
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
            }, searchValue) {
              commit(SET_SEARCH_LOADING, true)
              if (!searchValue) {
                commit(CLEAR_SEARCH_RESULTS)
                return
              }
              request('/search/movie', 'get',
                {
                  params: {
                    query: searchValue
                  }
                }).then(({ data }) => {
                commit(SET_SEARCH_RESULTS, data.results)
                commit(SET_SEARCH_CURRENT_PAGE, data.page)
                commit(SET_SEARCH_TOTAL_PAGES, data.total_pages)
                commit(SET_SEARCH_TOTAL_RESULTS, data.total_results)
                commit(SET_SEARCH_LOADING, false)
                this.seachResult = data.results
              }).catch((error) => {
                commit(SET_SEARCH_LOADING, false)
                console.error(error)
              })
            }
          }
        }
      }
    }
  }
})
