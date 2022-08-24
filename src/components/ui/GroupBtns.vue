<template>
  <nav class="nav">
    <ul class="nav__list">
      <add-recipe />
      <book-marks />
    </ul>
  </nav>
</template>

<script>
import AddRecipe from "./AddRecipe.vue";
import BookMarks from "../Bookmarks/BookMarks.vue";

export default {
  components: {
    AddRecipe,
    BookMarks,
  },
};
</script>

<style lang="scss">
.nav {
  align-self: stretch;
  margin-right: 2.5rem;

  &__list {
    list-style: none;
    display: flex;
    height: 100%;
  }

  &__item {
    position: relative;
  }

  &__btn {
    height: 100%;
    font-family: inherit;
    color: inherit;
    font-size: 1.4rem;
    font-weight: 700;
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 1.5rem;
    transition: all 0.3s;

    display: flex;
    align-items: center;

    svg {
      height: 2.4rem;
      width: 2.4rem;
      fill: $color-primary;
      margin-right: 0.7rem;
      transform: translateY(-1px);
    }

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: $color-grey-light-2;
    }
  }
}
</style>
