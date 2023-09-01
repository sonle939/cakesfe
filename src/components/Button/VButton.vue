<template>
  <button class="vbutton">
    <i :class="leftIcon"></i>
    {{ text }}
  </button>
</template>
  
  <script>
export default {
  name: "VButton",
  props: ["text", "leftIcon"],
};
</script>
  
  <style >
</style>