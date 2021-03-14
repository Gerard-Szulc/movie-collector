const totalPagesGetter = state => {
  return state.totalPages
}
const currentPageGetter = state => {
  return state.currentPage
}

export { currentPageGetter, totalPagesGetter }
