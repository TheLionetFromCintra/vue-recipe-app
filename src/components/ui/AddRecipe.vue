<template>
  <li class="nav__item">
    <button class="nav__btn nav__btn--add-recipe" @click="showModal">
      <svg class="nav__icon">
        <use href="../../assets/icons.svg#icon-edit"></use>
      </svg>
      <span>Add recipe</span>
    </button>
  </li>

  <add-recipe-form :show="isVisibleModal" @save-data="saveData" />
</template>

<script>
import AddRecipeForm from "./AddRecipeForm.vue";

export default {
  components: {
    AddRecipeForm,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    showModal() {
      this.$store.dispatch("recipes/toggleModal", {
        isVisible: true,
      });
    },
    saveData(data) {
      this.$store.dispatch("recipes/uploadRecipe", data);
    },
  },
  computed: {
    isVisibleModal() {
      return this.$store.getters["recipes/isModalVisible"];
    },
  },
};
</script>
