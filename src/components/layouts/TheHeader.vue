<template>
  <header class="header">
    <img src="../../assets/logo.png" alt="Logo" class="header__logo" />
    <search-line />
    <group-btns />
  </header>
</template>

<script>
import GroupBtns from "../ui/GroupBtns.vue";
import SearchLine from "../ui/SearchLine.vue";

export default {
  name: "TheHeader",
  components: {
    SearchLine,
    GroupBtns,
  },
};
</script>

<style lang="scss" scoped>
.header {
  grid-area: head;
  background-color: $color-grey-light-1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__logo {
    margin-left: 4rem;
    height: 4.6rem;
    display: block;
  }
}
</style>
