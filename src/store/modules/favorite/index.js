import {
  currentPageGetter,
  loadingGetter,
  totalPagesGetter,
} from "@/store/utils/getters/getters.js";
import { getStorageItem, setStorageItem } from "@/store/utils/localStorage";
import { calculateTotalPages } from "@/store/utils";

const SET_FAVORITE_RESULTS = "SET_FAVORITE_RESULTS";
const SET_FAVORITE_CURRENT_PAGE = "SET_FAVORITE_CURRENT_PAGE";
const SET_FAVORITE_TOTAL_PAGES = "SET_FAVORITE_TOTAL_PAGES";
const SET_FAVORITE_TOTAL_RESULTS = "SET_FAVORITE_TOTAL_RESULTS";
const ADD_FAVORITE_MOVIE = "ADD_FAVORITE_MOVIE";
const REMOVE_FAVORITE_MOVIE = "REMOVE_FAVORITE_MOVIE";
const SET_FAVORITE_LOADING = "SET_FAVORITE_LOADING";
const SET_FAVORITES_STATE = "SET_FAVORITES_STATE";
export const favorites = {
  namespaced: true,
  state: {
    loading: true,
    favorites: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 0,
  },
  getters: {
    favoritesResultsGetter: (state) => {
      return state.favorites;
    },
    loadingGetter,
    totalPagesGetter,
    currentPageGetter,
    isFavoriteMovieGetter: (state) => (movie) => {
      return state.favorites.some(
        (favoriteMovie) => favoriteMovie.id === movie.id
      );
    },
  },
  mutations: {
    SET_FAVORITE_RESULTS: (state, payload) => {
      state.favorites = payload;
    },
    SET_FAVORITE_CURRENT_PAGE: (state, payload) => {
      state.currentPage = payload;
    },
    SET_FAVORITE_TOTAL_PAGES: (state, payload) => {
      state.totalPages = payload;
    },
    SET_FAVORITE_TOTAL_RESULTS: (state, payload) => {
      state.totalResults = payload;
    },
    SET_FAVORITE_LOADING: (state, payload) => {
      state.loading = payload;
    },
    ADD_FAVORITE_MOVIE: (state, payload) => {
      state.favorites.push(payload);
      state.totalPages = calculateTotalPages(state, "favorites");
      state.totalResults = state.favorites.length;
    },
    REMOVE_FAVORITE_MOVIE: (state, payload) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== payload.id
      );
      state.totalPages = calculateTotalPages(state, "favorites");
      state.totalResults = state.favorites.length;
    },
    SET_FAVORITES_STATE: (state, payload) => {
      state.favorites = payload.favorites;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
    },
  },
  actions: {
    toggleFavoriteMovie({ dispatch, commit, state }, movie) {
      if (state.favorites.some((element) => element.id === movie.id)) {
        dispatch("setMovie", {
          mutation: REMOVE_FAVORITE_MOVIE,
          movie,
        });
        return;
      }
      dispatch("setMovie", {
        mutation: ADD_FAVORITE_MOVIE,
        movie,
      });
    },
    setMovie({ commit, state }, { mutation, movie }) {
      const originalState = { ...state };
      commit(mutation, movie);
      setStorageItem("favorites", state).catch((e) => {
        commit(SET_FAVORITES_STATE, originalState);
        console.error(e);
      });
    },
    loadFavoriteMovies({ commit }) {
      commit(SET_FAVORITE_LOADING, true);
      getStorageItem("favorites")
        .then((data) => {
          commit(SET_FAVORITE_RESULTS, data.favorites);
          commit(SET_FAVORITE_CURRENT_PAGE, data.currentPage);
          commit(SET_FAVORITE_TOTAL_PAGES, data.totalPages);
          commit(SET_FAVORITE_TOTAL_RESULTS, data.totalResults);
          commit(SET_FAVORITE_LOADING, false);
        })
        .catch(() => {
          commit(SET_FAVORITE_RESULTS, []);
          commit(SET_FAVORITE_LOADING, false);
        });
    },
  },
};
