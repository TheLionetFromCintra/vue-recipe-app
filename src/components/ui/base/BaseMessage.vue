<template>
  <div :class="mode">
    <slot>
      <div></div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>
