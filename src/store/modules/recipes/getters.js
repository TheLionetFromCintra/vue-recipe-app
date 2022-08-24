export default {
  recipes(state) {
    return state.recipes;
  },
  isLoading(state) {
    return state.isLoading;
  },
  isEmptySearch(state) {
    return state.isEmptySearch;
  },
  page(state) {
    return state.page;
  },
  searchQuery(state) {
    return state.searchQuery;
  },
  resultsCount(state) {
    return state.resultsCount;
  },
  isNewRequest(state) {
    return state.isNewRequest;
  },
  recipe(state) {
    return state.recipe;
  },
  isRecipeLoading(state) {
    return state.isRecipeLoading;
  },
  activeRecipe(state) {
    return state.activeRecipe;
  },
  favorites(state) {
    return state.favorites;
  },
  isModalVisible(state) {
    return state.isModalVisible;
  },
};
