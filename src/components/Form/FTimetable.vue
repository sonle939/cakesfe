<template>
  <div class="form_container" v-if="isshowtimetable">
    <div class="notify_error" v-if="checkForm">
      <div class="error_wrapper">
        <div class="error_text">
          <h1>Dữ liệu không hợp lệ</h1>
          <i class="bx bx-x" @click="handleClose"></i>
        </div>
        <ul>
          <li v-for="(erro, index) in error" :key="index">
            <i class="bx bxs-error"></i>
            {{ erro }}
          </li>
        </ul>
        <div class="error_btn">
          <button @click="handleClose">Đồng ý</button>
        </div>
      </div>
    </div>
    <form
      class="timetable_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModetimetable === true"
    >
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
          <input
            type="text"
            class="sinput"
            placeholder="mã thời khóa biểu"
            v-model="formData.TimeTableCode"
          />
        </label>
        <label class="slabel"
          >Ngày học
          <input
            type="text"
            class="sinput"
            placeholder="ngày học"
            v-model="formData.DayLearn"
          />
        </label>
        <label class="slabel"
          >Giờ bắt đầu
          <input
            type="text"
            class="sinput"
            style="width: 150px"
            v-model="formData.TimeStart"
            placeholder="Nhập giờ học"
          />
        </label>
        <label class="slabel"
          >Giờ kết thúc
          <input
            type="text"
            class="sinput"
            style="width: 150px"
            v-model="formData.TimeEnd"
            placeholder="Nhập giờ kết thúc"
          />
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
                  @click="selectOptionsubject(data.SubjectId, data.SubjectName)"
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
                  @click="selectOptionteacher(data.TeacherId, data.TeacherName)"
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
                  @click="
                    selectOptionclassroom(data.ClassRoomId, data.ClassRoomName)
                  "
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
    <form
      class="timetable_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModetimetable === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật thời khóa biểu</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_TIMETABLE"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã thời khóa biểu
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="getByIdtimetable.TimeTableCode"
          />
        </label>
        <label class="slabel"
          >Ngày học
          <input
            type="text"
            class="sinput"
            placeholder="tên lớp học"
            v-model="getByIdtimetable.DayLearn"
          />
        </label>
        <label class="slabel"
          >Giờ bắt đầu
          <input
            type="text"
            class="sinput"
            style="width: 150px"
            v-model="getByIdtimetable.TimeStart"
          />
        </label>
        <label class="slabel"
          >Giờ kết thúc
          <input
            type="text"
            class="sinput"
            style="width: 150px"
            v-model="getByIdtimetable.TimeEnd"
          />
        </label>
        <label class="slabel" @click="toggleDropdownsubjectUpdate">
          Thông tin môn học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdtimetable.SubjectName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownsubjectUpdate"
              :class="
                isOpenssubjectUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenssubjectUpdate">
              <ul ref="list">
                <li
                  v-for="data in filteredSubject"
                  :key="data.SubjectId"
                  @click="
                    selectOptionsubjectUpdate(data.SubjectId, data.SubjectName)
                  "
                >
                  {{ data.SubjectName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownteacherUpdate">
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdtimetable.TeacherName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownteacherUpdate"
              :class="
                isOpensteacherUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpensteacherUpdate">
              <ul ref="list">
                <li
                  v-for="data in filteredTeacher"
                  :key="data.TeacherId"
                  @click="
                    selectOptionteacherUpdate(data.TeacherId, data.TeacherName)
                  "
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label
          class="slabel"
          @click="toggleDropdownclassroomUpdate"
          style="margin-left: 24px"
        >
          Thông tin lớp học
          <div class="dropdown" style="margin-top: 8px; width: 345px">
            <input
              type="text"
              v-model="getByIdtimetable.ClassRoomName"
              placeholder="Chọn lớp học"
            />
            <i
              @click="toggleDropdownclassroomUpdate"
              :class="
                isOpenclassroomUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenclassroomUpdate"
              style="width: 345px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredClassroom"
                  :key="data.ClassRoomId"
                  @click="
                    selectOptionclassroomUpdate(
                      data.ClassRoomId,
                      data.ClassRoomName
                    )
                  "
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
import { createToast } from "mosha-vue-toastify";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { reactive } from "vue";
export default {
  name: "FTimetable",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Thời khóa biểu",
          description: "Thêm mới thành công",
        },
        {
          type: "success",
          timeout: 5000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Thời khóa biểu",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 5000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const formData = reactive({
      TimeTableCode: "",
      SubjectId: "",
      TeacherId: "",
      ClassRoomId: "",
      DayLearn: "",
      TimeStart: "",
      TimeEnd: "",
    });
    const isOpenclassroom = ref(false);
    const isOpenssubject = ref(false);
    const isOpensteacher = ref(false);
    const isOpenclassroomUpdate = ref(false);
    const isOpenssubjectUpdate = ref(false);
    const isOpensteacherUpdate = ref(false);
    const selectedOptionsubject = ref("");
    const selectedOptionteacher = ref("");
    const selectedOptionclassroom = ref("");
    const selectedRoles = ref([
      { id: 1, name: "admin" },
      { id: 2, name: "teacher" },
      { id: 3, name: "student" },
    ]);
    return {
      toast,
      toastUpdate,
      checkForm,
      error,
      build,
      formData,
      isOpenclassroom,
      isOpenssubject,
      isOpensteacher,
      isOpenclassroomUpdate,
      isOpenssubjectUpdate,
      isOpensteacherUpdate,
      selectedOptionsubject,
      selectedOptionteacher,
      selectedOptionclassroom,
      selectedRoles,
    };
  },
  computed: {
    filteredTeacher() {
      if (this.selectedOptionteacher) {
        const keyword = this.selectedOptionteacher.toLowerCase();
        return this.teachertimetable.filter((data) =>
          data.TeacherName.toLowerCase().includes(keyword)
        );
      } else {
        // Trả về toàn bộ danh sách giáo viên nếu selectedOptionteacher là null
        return this.teachertimetable;
      }
    },
    filteredSubject() {
      if (this.selectedOptionsubject) {
        const keyword = this.selectedOptionsubject.toLowerCase();
        return this.subjecttimetable.filter((data) =>
          data.SubjectName.toLowerCase().includes(keyword)
        );
      } else {
        return this.subjecttimetable;
      }
    },
    filteredClassroom() {
      if (this.selectedOptionclassroom) {
        const keyword = this.selectedOptionclassroom.toLowerCase();
        return this.classroomtimetable.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroomtimetable;
      }
    },
    ...mapGetters([
      "subjecttimetable",
      "teachertimetable",
      "classroomtimetable",
      "isshowtimetable",
      "timetable",
      "timetablemaxcode",
      "formModetimetable",
      "getByIdtimetable",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        TimeTableCode: this.timetablemaxcode,
      });
    },
    TimetableList() {
      return this.timetable
        .filter(
          (item) => item.TimeTableId !== this.getByIdtimetable.TimeTableId
        )
        .map((employee) => {
          return employee.TimeTableCode;
        });
    },
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
    toggleDropdownclassroomUpdate() {
      this.isOpenclassroomUpdate = !this.isOpenclassroomUpdate;
    },
    toggleDropdownsubjectUpdate() {
      this.isOpenssubjectUpdate = !this.isOpenssubjectUpdate;
    },
    toggleDropdownteacherUpdate() {
      this.isOpensteacherUpdate = !this.isOpensteacherUpdate;
    },
    selectOptionclassroom(id, options) {
      this.formData.ClassRoomId = id;
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    selectOptionsubject(id, options) {
      this.formData.SubjectId = id;
      this.selectedOptionsubject = options;
      this.isOpenssubject = false;
    },
    selectOptionteacher(id, options) {
      this.formData.TeacherId = id;
      this.selectedOptionteacher = options;
      this.isOpensteacher = false;
    },
    selectOptionclassroomUpdate(id, options) {
      this.getByIdtimetable.ClassRoomId = id;
      this.getByIdtimetable.ClassRoomName = options;
      this.isOpenclassroom = false;
    },
    selectOptionsubjectUpdate(id, options) {
      this.getByIdtimetable.SubjectId = id;
      this.getByIdtimetable.SubjectName = options;
      this.isOpenssubject = false;
    },
    selectOptionteacherUpdate(id, options) {
      this.getByIdtimetable.TeacherId = id;
      this.getByIdtimetable.TeacherName = options;
      this.isOpensteacher = false;
    },
    checkCodeTimetable(code) {
      try {
        if (this.TimetableList.includes(code)) {
          console.log(code);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleClose() {
      try {
        this.checkForm = !this.checkForm;
        this.error = [];
      } catch (error) {
        console.log(error);
      }
    },
    validateFormAdd() {
      try {
        let isValid = true;
        switch (true) {
          case this.timetable.findIndex(
            (ele) => ele.TimeTableCode === this.formData.TimeTableCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã thời khóa biểu nhập bị trùng");
            break;
          case this.formData.TimeTableCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã thời khóa biểu");
            break;
          case this.formData.DayLearn.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập ngày học");
            break;
          case this.formData.TimeStart === "":
            isValid = false;
            this.error.push("Vui lòng nhập giờ bắt đầu");
            break;
          case this.formData.TimeEnd === "":
            isValid = false;
            this.error.push("Vui lòng nhập giờ kết thúc");
            break;
          case this.selectedOptionclassroom === "":
            isValid = false;
            this.error.push("Vui lòng chọn lớp học");
            break;
          case this.selectedOptionsubject === "":
            isValid = false;
            this.error.push("Vui lòng chọn môn học");
            break;
          case this.selectedOptionteacher === "":
            isValid = false;
            this.error.push("Vui lòng chọn giáo viên dạy");
            break;
          default:
            break;
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },
    validateFormUpdate() {
      try {
        let isValid = true;
        switch (true) {
          case this.checkCodeTimetable(this.getByIdtimetable.TimeTableCode):
            isValid = false;
            this.error.push("Mã thời khóa biểu bị trùng");
            break;
          case this.getByIdtimetable.TimeTableCode.trim() === "":
            isValid = false;
            this.error.push("Mã thời khóa biểu không được để trống");
            break;
          default:
            break;
        }
        return isValid;
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitAdd() {
      try {
        this.checkForm = true;
        if (this.validateFormAdd()) {
          this.addtimetable({
            TimeTableId: uuidv4(),
            TimeTableCode: this.formData.TimeTableCode,
            SubjectId: this.formData.SubjectId,
            TeacherId: this.formData.TeacherId,
            ClassRoomId: this.formData.ClassRoomId,
            DayLearn: this.formData.DayLearn,
            TimeStart: this.formData.TimeStart,
            TimeEnd: this.formData.TimeEnd,
            isChecked: false,
          });
          // reset formData
          this.formData = { TimeTableCode: this.timetablemaxcode };
          this.selectedOptionclassroom = null;
          this.selectedOptionsubject = null;
          this.selectedOptionteacher = null;
          this.SHOW_FORM_TIMETABLE();
          this.toast();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitUpdate() {
      try {
        this.checkForm = true;
        if (this.validateFormUpdate()) {
          this.getByIdtimetable.IsChecked = false;
          this.updateItemtimetable(this.getByIdtimetable);
          this.SHOW_FORM_TIMETABLE();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getsubjecttimetable",
      "getteachertimetable",
      "getclassroomtimetable",
      "getMaxCodetimetable",
      "updateItemtimetable",
      "addtimetable",
    ]),
    ...mapMutations(["SHOW_FORM_TIMETABLE"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getsubjecttimetable();
    this.getteachertimetable();
    this.getclassroomtimetable();
    this.getMaxCodetimetable();
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