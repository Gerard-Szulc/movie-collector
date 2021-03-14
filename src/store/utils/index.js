const PAGE_ITEMS_AMOUNT = 20
const calculateTotalPages = (state, property) => {
  return Math.ceil(state[property].length / PAGE_ITEMS_AMOUNT)
}
export { calculateTotalPages }
