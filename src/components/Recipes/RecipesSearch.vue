<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <ul class="results" v-if="recipesList.length > 0">
    <recipe-search
      v-for="recipe in recipesList"
      :key="recipe.id"
      :id="recipe.id"
      :title="recipe.title"
      :publisher="recipe.publisher"
      :image_url="recipe.image_url"
      :isUserGenerated="recipe.isUserGenerated"
    >
    </recipe-search>
  </ul>
  <base-message v-if="isEmptySearch" mode="error">
    <div>
      <svg>
        <use href="../../assets/icons.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>No recipes found for your query. Please try again!</p>
  </base-message>
  <the-pagination />
</template>

<script>
import RecipeSearch from "./RecipeSearch.vue";
import ThePagination from "../ui/ThePagination.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    RecipeSearch,
    ThePagination,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters({
      recipesList: "recipes/recipes",
      isLoading: "recipes/isLoading",
      isEmptySearch: "recipes/isEmptySearch",
    }),
  },
};
</script>

<style lang="scss" scoped>
.results {
  list-style: none;
  margin-bottom: 2rem;
}
</style>
