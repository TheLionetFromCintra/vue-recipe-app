<template>
  <div class="search-results">
    <recipes-search />
  </div>
  <the-recipe-container />
</template>

<script>
import RecipesSearch from "./RecipesSearch.vue";
import TheRecipeContainer from "./TheRecipeContainer.vue";

export default {
  components: {
    RecipesSearch,
    TheRecipeContainer,
  },
  data() {
    return {
      curId: "",
    };
  },
  methods: {
    async loadRecipe(id) {
      try {
        await this.$store.dispatch("recipes/showRecipe", {
          recipeId: id,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
  mounted() {
    this.curId = window.location.hash.slice(1);
    if (this.curId) this.loadRecipe(this.curId);
  },
};
</script>

<style lang="scss" scoped>
.search-results {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
}

.copyright {
  color: $color-grey-dark-2;
  font-size: 1.2rem;
  padding: 0 3.5rem;
  margin-top: 4rem;

  .twitter-link:link,
  .twitter-link:visited {
    color: $color-grey-dark-2;
  }
}
</style>
