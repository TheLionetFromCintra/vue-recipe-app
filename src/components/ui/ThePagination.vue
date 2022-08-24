<template>
  <div class="pagination">
    <button
      class="btn--inline pagination__btn--prev"
      @click="getToPrevPage"
      v-if="curPage - 1 > 0"
    >
      <svg class="search__icon">
        <use href="../../assets/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>Page {{ curPage - 1 }}</span>
    </button>

    <button
      class="btn--inline pagination__btn--next"
      @click="getToNextPage"
      v-if="curPage < setResultPage"
    >
      <span>Page {{ curPage + 1 }}</span>
      <svg class="search__icon">
        <use href="../../assets/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      curPage: 1,
    };
  },
  computed: {
    ...mapGetters({
      resultPage: "recipes/resultsCount",
      checkNewRequest: "recipes/isNewRequest",
    }),
    setResultPage() {
      return Math.ceil(this.resultPage / 10);
    },
  },
  watch: {
    checkNewRequest() {
      if (this.checkNewRequest) this.curPage = 1;
    },
  },

  methods: {
    getToPrevPage() {
      this.curPage--;
      this.$store.dispatch("recipes/loadRecipes", {
        curPage: this.curPage,
        isNewRequest: false,
      });
    },
    getToNextPage() {
      this.curPage++;
      this.$store.dispatch("recipes/loadRecipes", {
        curPage: this.curPage,
        isNewRequest: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: auto;
  padding: 0 3.5rem;

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  &__btn {
    &--prev {
      float: left;
    }
    &--next {
      float: right;
    }
  }
}
</style>
