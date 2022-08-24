import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      isLoading: false,
      isEmptySearch: false,
      page: 0,
      resultsCount: 0,
      searchQuery: "",
      isNewRequest: false,
      recipe: {},
      isRecipeLoading: false,
      activeRecipe: null,
      favorites: [],
      isModalVisible: false,
    };
  },
  mutations,
  actions,
  getters,
};
