import { search } from '@/store/modules/search'
import { popular } from '@/store/modules/popular'
export const movies = {
  namespaced: true,
  state: {
    favourite: []
  },
  mutations: {},
  actions: {},
  modules: {
    search,
    popular
  }
}
