<template>
  <li class="preview">
    <a
      class="preview__link"
      :class="{ 'preview__link--active': id === activeRecipe }"
      :href="'#' + id"
      @click="showRecipe"
    >
      <figure class="preview__fig">
        <img :src="image_url" :alt="title" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">{{ title }}</h4>
        <p class="preview__publisher">{{ publisher }}</p>
        <div class="preview__user-generated" v-if="isUserGenerated">
          <svg>
            <use href="../../assets/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ["id", "title", "publisher", "image_url", "isUserGenerated"],
  methods: {
    async showRecipe() {
      try {
        await this.$store.dispatch("recipes/showRecipe", {
          recipeId: this.id,
          isUserGenerated: this.isUserGenerated,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
  computed: {
    activeRecipe() {
      return this.$store.getters["recipes/activeRecipe"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
