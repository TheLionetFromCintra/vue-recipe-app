<template>
  <teleport to="body">
    <div class="overlay" @click="closeModal" v-if="show"></div>
    <transition name="dialog" appear mode="out-in">
      <div class="add-recipe-window" role="dialog" v-if="show">
        <button class="btn--close-modal" @click="closeModal">&times;</button>
        <base-message mode="message">
          <div>
            <svg>
              <use href="../../assets/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>You don't have the API key. You can't add a new recipe.</p>
        </base-message>
        <form class="upload" @submit.prevent="submitForm" v-if="successSubmit">
          <div class="upload__column">
            <h3 class="upload__heading">Recipe data</h3>
            <label>Title</label>

            <input
              required
              name="title"
              type="text"
              :class="{ error: !title.isValid }"
              v-model.trim="title.val"
              @blur="clearValidity('title')"
            />
            <label>URL</label>
            <input
              required
              name="sourceUrl"
              type="text"
              :class="{ error: !url.isValid }"
              v-model.trim="url.val"
              @blur="clearValidity('url')"
            />
            <label>Image URL</label>
            <input
              required
              name="image"
              type="text"
              :class="{ error: !imageUrl.isValid }"
              v-model.trim="imageUrl.val"
              @blur="clearValidity('imageUrl')"
            />
            <label>Publisher</label>
            <input
              required
              name="publisher"
              type="text"
              :class="{ error: !publisher.isValid }"
              v-model.trim="publisher.val"
              @blur="clearValidity('publisher')"
            />
            <label>Prep time</label>
            <input
              required
              name="cookingTime"
              type="number"
              :class="{ error: !prepTime.isValid }"
              v-model.trim="prepTime.val"
              @blur="clearValidity('prepTime')"
            />
            <label>Servings</label>
            <input
              required
              name="servings"
              type="number"
              :class="{ error: !servings.isValid }"
              v-model.trim="servings.val"
              @blur="clearValidity('servings')"
            />
          </div>

          <div class="upload__column">
            <h3 class="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
              :class="{ error: !ingredients.isValid }"
              v-model.trim="ingredients.val['ing1']"
              @blur="clearValidity('ingredients')"
            />
            <label>Ingredient 2</label>
            <input
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
              :class="{ error: !ingredients.isValid }"
              v-model.trim="ingredients.val['ing2']"
              @blur="clearValidity('ingredients')"
            />
            <label>Ingredient 3</label>
            <input
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
              :class="{ error: !ingredients.isValid }"
              v-model.trim="ingredients.val['ing3']"
              @blur="clearValidity('ingredients')"
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
              :class="{ error: !ingredients.isValid }"
              v-model.trim="ingredients.val['ing4']"
              @blur="clearValidity('ingredients')"
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
              :class="{ error: !ingredients.isValid }"
              v-model.trim="ingredients.val['ing5']"
              @blur="clearValidity('ingredients')"
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
              :class="{ error: !ingredients.isValid }"
              v-model.trim="ingredients.val['ing6']"
              @blur="clearValidity('ingredients')"
            />
          </div>

          <button class="btn upload__btn">
            <svg>
              <use href="../../assets/icons.svg#icon-upload-cloud"></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
        <base-message mode="message" v-if="!!successSubmit">
          <div>
            <svg>
              <use href="../../assets/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>The recipe was successfully added!</p>
        </base-message>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: ["save-data"],
  props: ["show"],
  data() {
    return {
      successSubmit: false,
      title: {
        val: "",
        isValid: true,
      },
      url: {
        val: "",
        isValid: true,
      },
      imageUrl: {
        val: "",
        isValid: true,
      },
      publisher: {
        val: "",
        isValid: true,
      },
      prepTime: {
        val: null,
        isValid: true,
      },
      servings: {
        val: null,
        isValid: true,
      },
      ingredients: {
        val: {
          ing1: "",
          ing2: "",
          ing3: "",
          ing4: "",
          ing5: "",
          ing6: "",
        },
        isValid: true,
      },
      formIsValid: true,
    };
  },
  computed: {
    formatedIngredients() {
      const ingredients = Object.entries(this.ingredients.val)
        .filter((entry) => entry[1] !== "")
        .map((ing) => {
          const ingArr = ing[1].split(",").map((el) => el.trim());
          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        });
      return ingredients;
    },
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.title.val === "") {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.url.val === "") {
        this.url.isValid = false;
        this.formIsValid = false;
      }
      if (this.imageUrl.val === "") {
        this.imageUrl.isValid = false;
        this.formIsValid = false;
      }
      if (this.publisher.val === "") {
        this.publisher.isValid = false;
        this.formIsValid = false;
      }
      if (!this.prepTime.val || this.prepTime.val < 0) {
        this.prepTime.isValid = false;
        this.formIsValid = false;
      }
      if (!this.servings.val || this.servings.val < 0) {
        this.servings.isValid = false;
        this.formIsValid = false;
      }
      if (this.ingredients.val.length === 0) {
        this.ingredients.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      this.successSubmit = true;

      if (!this.formIsValid) {
        this.successSubmit = false;
        return;
      }

      const formData = {
        title: this.title.val,
        source_url: this.url.val,
        image_url: this.imageUrl.val,
        publisher: this.publisher.val,
        cooking_time: +this.prepTime.val,
        servings: +this.servings.val,
        ingredients: this.formatedIngredients,
      };

      this.$emit("save-data", formData);
      this.title.val = "";
      this.url.val = "";
      this.imageUrl.val = "";
      this.publisher.val = "";
      this.prepTime.val = "";
      this.servings.val = "";
      this.ingredients.val = {
        ing1: "",
        ing2: "",
        ing3: "",
        ing4: "",
        ing5: "",
        ing6: "",
      };
    },
    closeModal() {
      this.successSubmit = false;
      this.$store.dispatch("recipes/toggleModal", {
        isVisible: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-recipe-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100rem;
  background-color: white;
  border-radius: 9px;

  padding: 5rem 6rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.25);
  z-index: 1000;
  // transition: all 0.5s;

  .btn--close-modal {
    font-family: inherit;
    color: inherit;
    position: absolute;
    top: 0.5rem;
    right: 1.6rem;
    font-size: 3.5rem;
    cursor: pointer;
    border: none;
    background: none;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
}

.hidden {
  visibility: hidden;
  opacity: 0;
}

.upload {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem 6rem;

  &__column {
    display: grid;
    grid-template-columns: 1fr 2.8fr;
    align-items: center;
    gap: 1.5rem;

    & label {
      font-size: 1.5rem;
      font-weight: 600;
      color: inherit;
    }

    & input {
      font-size: 1.5rem;
      padding: 0.8rem 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      transition: all 0.2s;
      outline: none;

      &::placeholder {
        color: $color-grey-light-3;
      }

      &.error {
        outline: none;
        border: 1px solid $color-primary;
        background-color: $color-grey-light-1;
        width: 100%;
      }
    }

    & button {
      grid-column: 1 / span 2;
      justify-self: center;
      margin-top: 1rem;
    }
  }

  &__heading {
    font-size: 2.25rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
    grid-column: 1/-1;
  }

  &__btn {
    @extend %btn;
    padding: 1.5rem 4rem;
    font-size: 1.5rem;
    font-weight: 600;
    grid-column: 1 / -1;
    justify-self: center;
  }
  .btn svg {
    height: 2.25rem;
    width: 2.25rem;
    fill: currentColor;
  }
}
</style>
