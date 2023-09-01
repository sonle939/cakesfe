<template>
  <div class="form_container" v-if="isshowschoolyear">
    <form class="schoolyear_form">
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới năm học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_SCHOOLYEAR"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã năm học
          <input type="text" class="sinput" placeholder="mã năm học" />
        </label>
        <label class="slabel"
          >Tên năm học
          <input type="text" class="sinput" placeholder="tên năm học" />
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_SCHOOLYEAR" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
export default {
  name: "FSchoolyear",
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  computed: {
    ...mapGetters(["isshowschoolyear"]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    ...mapMutations(["SHOW_FORM_SCHOOLYEAR"]),
  },
  components: {
    VButton,
  },
};
</script>

<style scoped>
.form_container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in;
}
.info_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
}
.title_close {
  display: flex;
  align-items: center;
  position: absolute;
  right: -22px;
  top: -22px;
}
.title_close i {
  font-size: 24px;
  color: #666666;
  margin-right: 10px;
}
.title_close i:nth-child(2) {
  margin-right: 0;
  font-size: 34px;
}
.schoolyear_form {
  height: 30%;
  width: 40%;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  padding-bottom: 20px;
  animation: aniForm 0.6s linear;
  position: relative;
}
.info_property {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>