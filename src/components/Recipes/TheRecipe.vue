<template>
  <div class="recipe">
    <figure class="recipe__fig">
      <img :src="image_url" :alt="title" class="recipe__img" />
      <h1 class="recipe__title">
        <span>{{ title }}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="../../assets/icons.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">{{
          cooking_time
        }}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="../../assets/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">{{
          countServings
        }}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button
            class="btn--tiny btn--increase-servings"
            @click="removeServings"
          >
            <svg>
              <use href="../../assets/icons.svg#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings" @click="addServings">
            <svg>
              <use href="../../assets/icons.svg#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated" v-if="isUserGenerated">
        <svg>
          <use href="../../assets/icons.svg#icon-user"></use>
        </svg>
      </div>
      <!-- -fill -->
      <button class="btn--round" @click="updateBookmarks">
        <svg class="">
          <use
            href="../../assets/icons.svg#icon-bookmark-fill"
            v-if="isFavorite"
          ></use>
          <use href="../../assets/icons.svg#icon-bookmark" v-else></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        <li
          class="recipe__ingredient"
          v-for="ing in newIngredients"
          :key="ing.description"
        >
          <svg class="recipe__icon">
            <use href="../../assets/icons.svg#icon-check"></use>
          </svg>
          <div class="recipe__quantity" v-if="ing.quantity">
            {{ ing.quantity }}
          </div>
          <div class="recipe__description" v-if="ing.unit || ing.description">
            <span class="recipe__unit">{{ ing.unit }}</span>
            {{ ing.description }}
          </div>
        </li>
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">{{ publisher }}</span
        >. Please check out directions at their website.
      </p>
      <a class="btn--small recipe__btn" :href="source_url" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
          <use href="../../assets/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
const Fraction = require("fractional").Fraction;

export default {
  props: [
    "id",
    "cooking_time",
    "image_url",
    "ingredients",
    "servings",
    "source_url",
    "title",
    "publisher",
    "isUserGenerated",
  ],
  data() {
    return {
      countServings: null,
      isFavorite: false,
    };
  },
  methods: {
    addServings() {
      this.countServings++;
    },
    removeServings() {
      if (this.countServings > 1) this.countServings--;
    },
    updateBookmarks() {
      if (!this.isFavorite) {
        this.$store.dispatch("recipes/addFavorites", {
          bookmark: {
            id: this.id,
            cooking_time: this.cooking_time,
            image_url: this.image_url,
            ingredients: this.ingredients,
            servings: this.servings,
            source_url: this.source_url,
            title: this.title,
            publisher: this.publisher,
            isUserGenerated: this.isUserGenerated,
          },
        });
        localStorage.setItem(
          "bookmarks",
          JSON.stringify(this.$store.getters["recipes/favorites"])
        );
      } else {
        this.$store.dispatch("recipes/deleteFavorites", {
          removedBookmarkId: this.id,
        });
        localStorage.setItem(
          "bookmarks",
          JSON.stringify(this.$store.getters["recipes/favorites"])
        );
      }
      this.isFavorite = !this.isFavorite;
    },
  },

  computed: {
    newIngredients() {
      const newIngredients = this.ingredients.map((ing) => ({
        ...ing,
        quantity: ing.quantity
          ? new Fraction(
              (ing.quantity * this.countServings) / this.servings
            ).toString()
          : "",
      }));
      return newIngredients;
    },
  },
  mounted() {
    this.countServings = this.servings;
    //local storage
    const storage = JSON.parse(localStorage.getItem("bookmarks"));
    if (storage) {
      const isStorageFavorite = storage.filter((item) => item.id === this.id);
      if (isStorageFavorite.length > 0) this.isFavorite = true;
      this.$store.dispatch("recipes/loadFavortiesFromStorage", {
        favorites: storage,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.recipe {
  background-color: $color-grey-light-1;

  ///////////
  // FIGURE
  &__fig {
    height: 32rem;
    position: relative;
    // transform: scale(1.04) translateY(-1px);
    transform-origin: top;

    &::before {
      content: "";
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(
        to right bottom,
        $color-grad-1,
        $color-grad-2
      );
      opacity: 0.6;
    }
  }

  &__img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 20%) skewY(-6deg);
    color: #fff;
    font-weight: 700;
    font-size: 3.25rem;
    text-transform: uppercase;
    width: 50%;
    line-height: 1.95;
    text-align: center;

    span {
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      padding: 1.3rem 2rem;
      background-image: linear-gradient(
        to right bottom,
        $color-grad-1,
        $color-grad-2
      );
    }

    @media only screen and (max-width: $bp-medium) {
      width: 70%;
    }
  }

  ///////////
  // DETAILS
  &__details {
    display: flex;
    align-items: center;
    padding: 7.5rem 8rem 3.5rem 8rem;
  }

  &__info {
    font-size: 1.65rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-right: 4.5rem;
    }
  }

  &__info-icon {
    height: 2.35rem;
    width: 2.35rem;
    fill: $color-primary;
    margin-right: 1.15rem;
  }

  &__info-data {
    margin-right: 0.5rem;
    font-weight: 700;
  }

  &__info-buttons {
    display: flex;
    margin-left: 1.6rem;
    transform: translateY(-1px);
  }

  &__user-generated {
    background-color: darken($color-grey-light-2, 2%);

    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    width: 4rem;
    border-radius: 10rem;

    margin-left: auto;
    margin-right: 1.75rem;

    svg {
      height: 2.25rem;
      width: 2.25rem;
      fill: $color-primary;
    }
  }

  ///////////
  // INGREDIENTS
  &__ingredients {
    padding: 5rem 8rem;
    font-size: 1.6rem;
    line-height: 1.4;
    background-color: $color-grey-light-2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__ingredient-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 3rem;
    list-style: none;
  }

  &__ingredient {
    display: flex;
  }

  &__icon {
    height: 2rem;
    width: 2rem;
    fill: $color-primary;
    margin-right: 1.1rem;
    flex: 0 0 auto;
    margin-top: 0.1rem;
  }

  &__quantity {
    margin-right: 0.5rem;
    flex: 0 0 auto;
  }

  ///////////
  // DIRECTIONS
  &__directions {
    padding: 5rem 10rem;
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__directions-text {
    font-size: 1.7rem;
    text-align: center;
    margin-bottom: 3.5rem;
    color: $color-grey-dark-2;
  }

  &__publisher {
    font-weight: 700;
  }
}
</style>
