<template>
  <div class="form_container" v-if="isshowaccount">
    <form class="account_form">
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới tài khoản</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_ACCOUNT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã tài khoản
          <input type="text" class="sinput" placeholder="mã lớp học" />
        </label>
        <label class="slabel"
          >Mật khẩu
          <input type="text" class="sinput" placeholder="tên lớp học" />
        </label>
        <label class="slabel" @click="toggleDropdownstudent">
          Thông tin học sinh
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionstudent"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownstudent"
              :class="
                isOpenstudent
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenstudent">
              <ul ref="list">
                <li
                  v-for="data in filteredStudent"
                  :key="data.StudentId"
                  @click="selectOptionstudent(data.StudentName)"
                >
                  {{ data.StudentName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownteacher">
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionteacher"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownteacher"
              :class="
                isOpensteacher
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpensteacher">
              <ul ref="list">
                <li
                  v-for="data in filteredTeacher"
                  :key="data.TeacherId"
                  @click="selectOptionteacher(data.TeacherName)"
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdown">
          Loại tài khoản
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
                  v-for="data in selectedRoles"
                  :key="data.í"
                  @click="selectOption(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_ACCOUNT" />
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
      isOpenstudent: false,
      isOpensteacher: false,
      selectedOptionstudent: "",
      selectedOptionteacher: "",
      selectedOption: "",
      selectedRoles: [
        { id: 1, name: "admin" },
        { id: 2, name: "teacher" },
        { id: 3, name: "student" },
      ],
    };
  },
  computed: {
    filteredTeacher() {
      const keyword = this.selectedOptionteacher.toLowerCase();
      return this.teacherAll.filter((data) =>
        data.TeacherName.toLowerCase().includes(keyword)
      );
    },
    filteredStudent() {
      const keyword = this.selectedOptionstudent.toLowerCase();
      return this.studentAll.filter((data) =>
        data.StudentName.toLowerCase().includes(keyword)
      );
    },
    ...mapGetters(["account", "studentAll", "teacherAll", "isshowaccount"]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdownstudent() {
      this.isOpenstudent = !this.isOpenstudent;
    },
    toggleDropdownteacher() {
      this.isOpensteacher = !this.isOpensteacher;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    selectOptionstudent(options) {
      this.selectedOptionstudent = options;
      this.isOpenstudent = false;
    },
    selectOptionteacher(options) {
      this.selectedOptionteacher = options;
      this.isOpensteacher = false;
    },
    ...mapActions(["getaccount", "getStudentAll", "getteacherAll"]),
    ...mapMutations(["SHOW_FORM_ACCOUNT"]),
  },
  mounted() {
    this.getaccount();
    this.getStudentAll();
    this.getteacherAll();
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
.account_form {
  height: 40%;
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