const totalPagesGetter = state => {
  return state.totalPages
}
const currentPageGetter = state => {
  return state.currentPage
}
const loadingGetter = state => {
  return state.loading
}

export { currentPageGetter, totalPagesGetter, loadingGetter }
