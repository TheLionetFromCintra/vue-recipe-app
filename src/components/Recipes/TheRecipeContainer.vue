<template>
  <div class="recipe-wrapper">
    <base-spinner v-if="isRecipeLoading"></base-spinner>

    <the-recipe
      v-if="recipeDetail.hasOwnProperty('id')"
      :id="recipeDetail.id"
      :cooking_time="recipeDetail.cooking_time"
      :image_url="recipeDetail.image_url"
      :ingredients="recipeDetail.ingredients"
      :servings="recipeDetail.servings"
      :source_url="recipeDetail.source_url"
      :title="recipeDetail.title"
      :publisher="recipeDetail.publisher"
      :isUserGenerated="recipeDetail.isUserGenerated"
    />
    <base-message mode="message" v-if="isVisible">
      <div>
        <svg>
          <use href="../../assets/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </base-message>
  </div>
</template>

<script>
import TheRecipe from "./TheRecipe.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheRecipe,
  },
  data() {
    return {
      curId: "",
      isVisible: true,
    };
  },
  computed: {
    ...mapGetters({
      recipeDetail: "recipes/recipe",
      isRecipeLoading: "recipes/isRecipeLoading",
    }),
  },
  beforeUpdate() {
    this.curId = window.location.hash.slice(1);
    if (this.curId) this.isVisible = false;
  },
};
</script>

<style lang="scss" scoped>
.recipe-wrapper {
  background-color: #f9f5f3;
}
</style>
