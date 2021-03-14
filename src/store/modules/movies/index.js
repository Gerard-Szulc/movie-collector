import { search } from '@/store/modules/search'
import { popular } from '@/store/modules/popular'
import { favorites } from '@/store/modules/favorite'
export const movies = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    popular,
    favorites
  }
}
