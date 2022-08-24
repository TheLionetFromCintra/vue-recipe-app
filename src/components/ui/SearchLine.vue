<template>
  <form class="search" @submit.prevent="getRecipes">
    <input
      type="text"
      class="search__field"
      placeholder="Search over 1,000,000 recipes..."
      v-model="searchQuery"
    />
    <button class="btn search__btn">
      <svg class="search__icon">
        <use href="../../assets/icons.svg#icon-search"></use>
      </svg>
      <span>Search</span>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    async getRecipes() {
      try {
        await this.$store.dispatch("recipes/loadRecipes", {
          searchQuery: this.searchQuery,
          firstPage: 1,
          isNewRequest: true,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.searchQuery = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #fff;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  transition: all 0.3s;

  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 0.7rem 3rem rgba($color-grey-dark-1, 0.08);
  }

  &__field {
    border: none;
    background: none;
    font-family: inherit;
    color: inherit;
    font-size: 1.7rem;
    width: 30rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: $color-grey-light-3;
    }

    @media only screen and (max-width: $bp-medium) {
      width: auto;

      &::placeholder {
        color: white;
      }
    }
  }

  &__btn {
    font-weight: 600;
    font-family: inherit;
  }
}

.btn {
  @extend %btn;

  padding: 1.5rem 4rem;
  font-size: 1.5rem;
  font-weight: 600;

  svg {
    height: 2.25rem;
    width: 2.25rem;
    fill: currentColor;
  }
}
</style>
