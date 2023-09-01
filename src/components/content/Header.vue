<template>
  <div class="headerContent">
    <div class="header_icon">
      <h1>{{ text }}</h1>
      <i class="bx bx-chevron-down"></i>
    </div>
    <div class="header_add">
      <VButton
        text="Thêm mới"
        leftIcon="bx bx-plus leftIcon"
        @click="showform"
      />
      <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" class="mg-left" />
    </div>
  </div>
</template>

<script>
import VButton from "../Button/VButton.vue";
import VButtonicon from "../Button/VButtonicon.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HeaderContent",
  props: {
    text: {
      type: String,
      required: true,
    },
    showform: {
      type: Function,
      required: true,
    },
  },
  components: {
    VButtonicon,
    VButton,
  },
};
</script>

<style scoped>
@import "../../style/components/headerContent.css";
</style>