<template>
  <div class="form_container" v-if="isshowtimetable">
    <form class="timetable_form">
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới thời khóa biểu</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_TIMETABLE"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã thời khóa biểu
          <input type="text" class="sinput" placeholder="mã lớp học" />
        </label>
        <label class="slabel"
          >Ngày học
          <input type="text" class="sinput" placeholder="tên lớp học" />
        </label>
        <label class="slabel"
          >Giờ bắt đầu
          <input type="date" class="sinput" style="width: 150px" />
        </label>
        <label class="slabel"
          >Giờ kết thúc
          <input type="date" class="sinput" style="width: 150px" />
        </label>
        <label class="slabel" @click="toggleDropdownsubject">
          Thông tin môn học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionsubject"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownsubject"
              :class="
                isOpenssubject
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenssubject">
              <ul ref="list">
                <li
                  v-for="data in filteredSubject"
                  :key="data.SubjectId"
                  @click="selectOptionsubject(data.SubjectName)"
                >
                  {{ data.SubjectName }}
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
        <label
          class="slabel"
          @click="toggleDropdownclassroom"
          style="margin-left: 24px"
        >
          Thông tin lớp học
          <div class="dropdown" style="margin-top: 8px; width: 345px">
            <input
              type="text"
              v-model="selectedOptionclassroom"
              placeholder="Chọn lớp học"
            />
            <i
              @click="toggleDropdownclassroom"
              :class="
                isOpenclassroom
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenclassroom"
              style="width: 345px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredClassroom"
                  :key="data.ClassRoomId"
                  @click="selectOptionclassroom(data.ClassRoomName)"
                >
                  {{ data.ClassRoomName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_TIMETABLE" />
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
  name: "FTimetable",
  data() {
    return {
      isOpenclassroom: false,
      isOpenssubject: false,
      isOpensteacher: false,
      selectedOptionsubject: "",
      selectedOptionteacher: "",
      selectedOptionclassroom: "",
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
      return this.teachertimetable.filter((data) =>
        data.TeacherName.toLowerCase().includes(keyword)
      );
    },
    filteredSubject() {
      const keyword = this.selectedOptionsubject.toLowerCase();
      return this.subjecttimetable.filter((data) =>
        data.SubjectName.toLowerCase().includes(keyword)
      );
    },
    filteredClassroom() {
      const keyword = this.selectedOptionclassroom.toLowerCase();
      return this.classroomtimetable.filter((data) =>
        data.ClassRoomName.toLowerCase().includes(keyword)
      );
    },
    ...mapGetters([
      "subjecttimetable",
      "teachertimetable",
      "classroomtimetable",
      "isshowtimetable",
    ]),
  },
  methods: {
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    toggleDropdownsubject() {
      this.isOpenssubject = !this.isOpenssubject;
    },
    toggleDropdownteacher() {
      this.isOpensteacher = !this.isOpensteacher;
    },
    selectOptionclassroom(options) {
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    selectOptionsubject(options) {
      this.selectedOptionsubject = options;
      this.isOpenssubject = false;
    },
    selectOptionteacher(options) {
      this.selectedOptionteacher = options;
      this.isOpensteacher = false;
    },
    ...mapActions([
      "getsubjecttimetable",
      "getteachertimetable",
      "getclassroomtimetable",
    ]),
    ...mapMutations(["SHOW_FORM_TIMETABLE"]),
  },
  mounted() {
    this.getsubjecttimetable();
    this.getteachertimetable();
    this.getclassroomtimetable();
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
.timetable_form {
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