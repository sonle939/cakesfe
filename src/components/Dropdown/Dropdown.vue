<template>
  <div class="dropdown">
    <input
      type="text"
      v-model="selectedOption"
      :placeholder="text"
      @click="toggleDropdown"
    />
    <i
      @click="toggleDropdown"
      :class="isOpen ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'"
    ></i>
    <div class="overlaylist" v-show="isOpen">
      <ul ref="list">
        <li
          v-for="option in options"
          :key="generateKey(option)"
          @click="selectOption(option)"
        >
          {{ option.GradeName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dropdown",
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  props: ["options", "text", "width"],
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option.GradeName;
      this.isOpen = false;
    },
    generateKey(option) {
      return `${option.GradeId}${option.Role}`;
    },
  },
};
</script>

<style scoped>
@import "../../style/components/dropdown.css";
</style>