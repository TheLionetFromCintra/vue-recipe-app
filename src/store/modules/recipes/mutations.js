export default {
  getRecipes(state, payload) {
    state.recipes = payload;
  },
  isLoading(state, payload) {
    state.isLoading = payload;
  },
  isEmptySearch(state, payload) {
    state.isEmptySearch = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  },
  saveSearchQuery(state, payload) {
    state.searchQuery = payload;
  },
  setResultsCount(state, payload) {
    state.resultsCount = payload;
  },
  checkNewRequest(state, payload) {
    state.isNewRequest = payload;
  },
  showRecipe(state, payload) {
    state.recipe = payload;
  },
  showRecipeSpinner(state, payload) {
    state.isRecipeLoading = payload;
  },
  setActiveRecipe(state, payload) {
    state.activeRecipe = payload;
  },
  addFavorites(state, payload) {
    state.favorites.push(payload);
  },
  deleteFavorites(state, payload) {
    const index = state.favorites.findIndex((el) => el.id === payload);
    state.favorites.splice(index, 1);
  },
  loadFavorites(state, payload) {
    state.favorites = payload;
  },
  toggleModal(state, payload) {
    state.isModalVisible = payload;
  },
  uploadRecipe(state, payload) {
    console.log(payload);
    state.recipes.unshift(payload);
  },
};
