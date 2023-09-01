<template>
  <div class="form_container" v-if="isshowclassroom">
    <form class="classroom_form">
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới lớp học</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_CLASSROOM"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã lớp học
          <input type="text" class="sinput" placeholder="mã lớp học" />
        </label>
        <label class="slabel"
          >Tên lớp học
          <input type="text" class="sinput" placeholder="tên lớp học" />
        </label>
        <label class="slabel" @click="toggleDropdown">
          Khối lớp
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOption"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdown"
              :class="
                isOpen ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpen">
              <ul ref="list">
                <li
                  v-for="data in grade"
                  :key="data.GradeId"
                  @click="selectOption(data.GradeName)"
                >
                  {{ data.GradeName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_CLASSROOM" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
export default {
  name: "FClassroom",
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  computed: {
    ...mapGetters(["grade", "isshowclassroom"]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    ...mapActions(["getGrade"]),
    ...mapMutations(["SHOW_FORM_CLASSROOM"]),
  },
  mounted() {
    this.getGrade();
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
.classroom_form {
  height: 30%;
  width: 60%;
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