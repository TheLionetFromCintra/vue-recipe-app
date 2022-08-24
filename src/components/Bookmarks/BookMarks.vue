<template>
  <li class="nav__item">
    <button class="nav__btn nav__btn--bookmarks">
      <svg class="nav__icon">
        <use href="../../assets/icons.svg#icon-bookmark"></use>
      </svg>
      <span>Bookmarks</span>
    </button>

    <div class="bookmarks">
      <base-message mode="message" v-if="initBookmarks.length === 0">
        <div>
          <svg>
            <use href="../../assets/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
      </base-message>
      <ul class="bookmarks__list" v-else>
        <recipe-search
          v-for="recipe in initBookmarks"
          :key="recipe.id"
          :id="recipe.id"
          :title="recipe.title"
          :publisher="recipe.publisher"
          :image_url="recipe.image_url"
          :isUserGenerated="recipe.isUserGenerated"
        >
        </recipe-search>
      </ul>
    </div>
  </li>
</template>

<script>
import RecipeSearch from "../Recipes/RecipeSearch.vue";

export default {
  components: {
    RecipeSearch,
  },
  computed: {
    favoritesRecipes() {
      return this.$store.getters["recipes/favorites"].length !== 0
        ? this.$store.getters["recipes/favorites"]
        : JSON.parse(localStorage.getItem("bookmarks"));
    },
    initBookmarks() {
      return this.favoritesRecipes ? this.favoritesRecipes : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.bookmarks {
  padding: 1rem 0;
  position: absolute;
  // right: 0;
  right: -2.5rem;
  z-index: 10;
  width: 40rem;
  background-color: #fff;
  box-shadow: 0 0.8rem 5rem 2rem rgba($color-grey-dark-1, 0.1);

  visibility: hidden;
  opacity: 0;
  transition: all 0.5s 0.2s;

  &__list {
    list-style: none;
  }

  &__field {
    cursor: pointer;
    padding: 0 4rem;

    display: flex;
    align-items: center;
    height: 100%;
    transition: all 0.3s;

    &:hover {
      background-color: $color-grey-light-2;
    }
  }

  &:hover,
  .nav__btn--bookmarks:hover + & {
    visibility: visible;
    opacity: 1;
  }
}
</style>
