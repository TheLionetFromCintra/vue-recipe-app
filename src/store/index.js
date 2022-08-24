import { createStore } from "vuex";

import recipesModule from "./modules/recipes/index.js";

const store = createStore({
  modules: {
    recipes: recipesModule,
  },
});

export default store;
