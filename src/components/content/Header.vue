<template>
  <div class="headerContent">
    <div class="header_icon">
      <h1>{{ text }}</h1>
      <i class="bx bx-chevron-down"></i>
    </div>
    <div class="header_add">
      <button><i class="bx bx-plus-medical"></i> Thêm mới</button>
      <button><i class="bx bx-dots-horizontal-rounded"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HeaderContent",
  props: ["text"],
};
</script>

<style scoped>
@import "../../style/components/headerContent.css";
</style>