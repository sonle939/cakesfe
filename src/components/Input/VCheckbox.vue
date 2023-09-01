<template>
  <input type="checkbox" class="option-input" :id="valueID" />
</template>
  
  <script>
export default {
  name: "VCheckbox",
  props: ["valueID"],
};
</script>
  
<style scoped>
</style>