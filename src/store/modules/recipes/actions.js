import axios from "axios";
export default {
  async loadRecipes(context, payload) {
    context.commit("isLoading", true);
    context.commit("isEmptySearch", false);
    context.commit("getRecipes", []);
    context.commit("checkNewRequest", false);

    const searchQuery = payload.searchQuery
      ? payload.searchQuery
      : context.getters.searchQuery;
    context.commit("saveSearchQuery", searchQuery);

    const res = await axios
      .get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}&key=f003ccfe-215c-413c-874d-3c2a213e3db0`
      )
      .finally(() => {
        context.commit("isLoading", false);
        if (payload.isNewRequest)
          context.commit("checkNewRequest", payload.isNewRequest);
      });
    const data = res.data.data.recipes;

    if (res.statusText !== "OK") {
      throw new Error("Failed to fetch!");
    }

    const recipes = [];
    for (const key in data) {
      const recipe = {
        id: data[key].id,
        image_url: data[key].image_url,
        publisher: data[key].publisher,
        title: data[key].title,
        isUserGenerated: data[key].key ? data[key].key : false,
      };
      recipes.push(recipe);
    }
    const curPage = payload.curPage ? payload.curPage : payload.firstPage;
    const start = (curPage - 1) * 10;
    const end = curPage * 10;
    context.commit("setPage", curPage);

    if (recipes.length === 0) context.commit("isEmptySearch", true);

    context.commit("setResultsCount", recipes.length);
    context.commit("getRecipes", recipes.slice(start, end));
  },

  async showRecipe(context, payload) {
    context.commit("showRecipeSpinner", true);
    context.commit("showRecipe", {});
    context.commit("setActiveRecipe", null);
    const res = await axios
      .get(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${payload.recipeId}?key=f003ccfe-215c-413c-874d-3c2a213e3db0`
      )
      .finally(() => {
        context.commit("showRecipeSpinner", false);
      });
    const data = res.data.data.recipe;

    if (res.statusText !== "OK") {
      throw new Error("Failed to fetch!");
    }

    const recipe = {
      cooking_time: data.cooking_time,
      id: data.id,
      image_url: data.image_url,
      ingredients: data.ingredients,
      servings: data.servings,
      source_url: data.source_url,
      title: data.title,
      publisher: data.publisher,
      isUserGenerated: payload.isUserGenerated
        ? payload.isUserGenerated
        : false,
    };
    context.commit("showRecipe", recipe);
    context.commit("setActiveRecipe", recipe.id);
  },
  loadFavortiesFromStorage(context, payload) {
    if (payload.favorites.length !== 0)
      context.commit("loadFavorites", payload.favorites);
  },
  addFavorites(context, payload) {
    context.commit("addFavorites", payload.bookmark);
  },
  deleteFavorites(context, payload) {
    context.commit("deleteFavorites", payload.removedBookmarkId);
  },
  toggleModal(context, payload) {
    context.commit("toggleModal", payload.isVisible);
  },
  async uploadRecipe(context, payload) {
    await axios
      .post(
        "https://forkify-api.herokuapp.com/api/v2/recipes?key=f003ccfe-215c-413c-874d-3c2a213e3db0",
        payload,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        context.commit("addFavorites", {
          ...res.data.data.recipe,
          isUserGenerated: true,
        });
        localStorage.setItem(
          "bookmarks",
          JSON.stringify(context.getters.favorites)
        );
        context.commit("showRecipe", {
          ...res.data.data.recipe,
          isUserGenerated: true,
        });
        context.commit("setActiveRecipe", res.data.data.recipe.id);
        window.location.hash = `#${res.data.data.recipe.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
