<template>
  <div class="form_container" v-if="isshowconduct">
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
      v-if="formModeconduct === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới điểm hạnh kiểm</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_CONDUCT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã hạnh kiểm
          <input
            type="text"
            class="sinput"
            placeholder="mã thời khóa biểu"
            v-model="formData.ConductCode"
            style="width: 150px"
          />
        </label>
        <label class="slabel" @click="toggleDropdownconductGrade">
          Điểm hạnh kiểm
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="selectedOptionconductgrade"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownconductGrade"
              :class="
                isOpenconductGrade
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenconductGrade"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in optionConductGrade"
                  :key="data.id"
                  @click="selectOptionconductgrade(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>

        <label class="slabel" @click="toggleDropdownsemester">
          Chọn học kỳ
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="selectedOptionsemester"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownsemester"
              :class="
                isOpenSemester
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenSemester"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in semester"
                  :key="data.SemesterId"
                  @click="
                    selectOptionsemester(data.SemesterId, data.SemesterName)
                  "
                >
                  {{ data.SemesterName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownschoolyear">
          Chọn năm học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionschoolyear"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownschoolyear"
              :class="
                isOpenSchoolyear
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenSchoolyear">
              <ul ref="list">
                <li
                  v-for="data in schoolyear"
                  :key="data.SchoolYearId"
                  @click="
                    selectOptionschoolyear(
                      data.SchoolYearId,
                      data.SchoolYearName
                    )
                  "
                >
                  {{ data.SchoolYearName }}
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
          <div class="dropdown" style="margin-top: 8px; width: 475px">
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
              style="width: 470px"
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
        <label class="slabel" @click="toggleDropdownstudent">
          Thông tin học sinh
          <div class="dropdown" style="margin-top: 8px; width: 475px">
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
            <div
              class="overlaylist"
              v-show="isOpenstudent"
              style="width: 470px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredStudent"
                  :key="data.StudentId"
                  @click="selectOptionstudent(data.StudentId, data.StudentName)"
                >
                  {{ data.StudentName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_CONDUCT" />
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
      v-if="formModeconduct === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật điểm hạnh kiểm</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_CONDUCT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã hạnh kiểm
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="getByIdconduct.ConductCode"
            style="width: 150px"
          />
        </label>
        <label class="slabel" @click="toggleDropdownconductGradeUpdate">
          Điểm hạnh kiểm
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="getByIdconduct.ConductGrade"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownconductGradeUpdate"
              :class="
                isOpenconductGradeUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenconductGradeUpdate"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in optionConductGrade"
                  :key="data.id"
                  @click="selectOptionconductgradeUpdate(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>

        <label class="slabel" @click="toggleDropdownsemesterUpdate">
          Chọn học kỳ
          <div class="dropdown" style="margin-top: 8px; width: 200px">
            <input
              type="text"
              v-model="getByIdconduct.SemesterName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownsemesterUpdate"
              :class="
                isOpenSemesterUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenSemesterUpdate"
              style="width: 200px"
            >
              <ul ref="list">
                <li
                  v-for="data in semester"
                  :key="data.SemesterId"
                  @click="
                    selectOptionsemesterUpdate(
                      data.SemesterId,
                      data.SemesterName
                    )
                  "
                >
                  {{ data.SemesterName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownschoolyearUpdate">
          Chọn năm học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdconduct.SchoolYearName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownschoolyearUpdate"
              :class="
                isOpenSchoolyearUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenSchoolyearUpdate">
              <ul ref="list">
                <li
                  v-for="data in schoolyear"
                  :key="data.SchoolYearId"
                  @click="
                    selectOptionschoolyearUpdate(
                      data.SchoolYearId,
                      data.SchoolYearName
                    )
                  "
                >
                  {{ data.SchoolYearName }}
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
          <div class="dropdown" style="margin-top: 8px; width: 470px">
            <input
              type="text"
              v-model="getByIdconduct.ClassRoomName"
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
              style="width: 470px"
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
        <label class="slabel" @click="toggleDropdownstudentUpdate">
          Thông tin học sinh
          <div class="dropdown" style="margin-top: 8px; width: 475px">
            <input
              type="text"
              v-model="getByIdconduct.StudentName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownstudentUpdate"
              :class="
                isOpenstudentUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div
              class="overlaylist"
              v-show="isOpenstudentUpdate"
              style="width: 470px"
            >
              <ul ref="list">
                <li
                  v-for="data in filteredStudent"
                  :key="data.StudentId"
                  @click="
                    selectOptionteacherUpdate(data.StudentId, data.StudentName)
                  "
                >
                  {{ data.StudentName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_CONDUCT" />
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
  name: "FConduct",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Hạnh kiểm",
          description: "Thêm mới thành công",
        },
        {
          type: "success",
          timeout: 3000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Hạnh kiểm",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 3000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const formData = reactive({
      ConductCode: "",
      StudentId: "",
      SemesterId: "",
      SchoolYearId: "",
      ConductGrade: "",
      ClassRoomId: "",
    });
    //diem hanh kiem
    const isOpenconductGrade = ref(false);
    const isOpenconductGradeUpdate = ref(false);
    //lop hoc
    const isOpenclassroom = ref(false);
    const isOpenclassroomUpdate = ref(false);
    //hoc ki
    const isOpenSemester = ref(false);
    const isOpenSemesterUpdate = ref(false);
    //nam hoc
    const isOpenSchoolyear = ref(false);
    const isOpenSchoolyearUpdate = ref(false);
    //hoc sinh
    const isOpenstudent = ref(false);
    const isOpenstudentUpdate = ref(false);
    const selectedOptionclassroom = ref("");
    const selectedOptionstudent = ref("");
    const selectedOptionsemester = ref("");
    const selectedOptionschoolyear = ref("");
    const selectedOptionconductgrade = ref("");
    const optionConductGrade = ref([
      { id: 1, name: "T" },
      { id: 2, name: "K" },
      { id: 3, name: "TB" },
      { id: 4, name: "Y" },
    ]);
    return {
      toast,
      toastUpdate,
      checkForm,
      optionConductGrade,
      error,
      build,
      formData,
      isOpenclassroom,
      isOpenclassroomUpdate,
      isOpenstudent,
      isOpenstudentUpdate,
      isOpenconductGrade,
      isOpenconductGradeUpdate,
      isOpenSchoolyear,
      isOpenSchoolyearUpdate,
      isOpenSemester,
      isOpenSemesterUpdate,
      selectedOptionclassroom,
      selectedOptionstudent,
      selectedOptionsemester,
      selectedOptionschoolyear,
      selectedOptionconductgrade,
    };
  },
  computed: {
    filteredStudent() {
      if (this.selectedOptionstudent) {
        const teacherKeyword = this.selectedOptionstudent.toLowerCase();
        return this.studentAll.filter((data) =>
          data.StudentName.toLowerCase().includes(teacherKeyword)
        );
      } else if (this.selectedOptionclassroom) {
        const subjectKeyword = this.selectedOptionclassroom.toLowerCase();
        return this.studentAll.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(subjectKeyword)
        );
      } else {
        // Trả về toàn bộ danh sách sinh viên nếu cả hai selectedOptionteacher và selectedOptionsubject đều là null
        return this.studentAll;
      }
    },
    filteredClassroom() {
      if (this.selectedOptionclassroom) {
        const keyword = this.selectedOptionclassroom.toLowerCase();
        return this.classroom.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroom;
      }
    },
    ...mapGetters([
      "semester",
      "schoolyear",
      "classroom",
      "isshowconduct",
      "studentAll",
      "conduct",
      "conductmaxcode",
      "formModeconduct",
      "getByIdconduct",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        ConductCode: this.conductmaxcode,
      });
    },
    ConductList() {
      return this.conduct
        .filter((item) => item.ConductId !== this.getByIdconduct.ConductId)
        .map((employee) => {
          return employee.ConductCode;
        });
    },
  },
  methods: {
    toggleDropdownstudent() {
      this.isOpenstudent = !this.isOpenstudent;
    },
    toggleDropdownstudentUpdate() {
      this.isOpenstudentUpdate = !this.isOpenstudentUpdate;
    },
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    toggleDropdownclassroomUpdate() {
      this.isOpenclassroomUpdate = !this.isOpenclassroomUpdate;
    },
    toggleDropdownconductGrade() {
      this.isOpenconductGrade = !this.isOpenconductGrade;
    },
    toggleDropdownconductGradeUpdate() {
      this.isOpenconductGradeUpdate = !this.isOpenconductGradeUpdate;
    },
    toggleDropdownsemester() {
      this.isOpenSemester = !this.isOpenSemester;
    },
    toggleDropdownsemesterUpdate() {
      this.isOpenSemesterUpdate = !this.isOpenSemesterUpdate;
    },
    toggleDropdownschoolyear() {
      this.isOpenSchoolyear = !this.isOpenSchoolyear;
    },
    toggleDropdownschoolyearUpdate() {
      this.isOpenSchoolyearUpdate = !this.isOpenSchoolyearUpdate;
    },
    selectOptionconductgrade(options) {
      this.formData.ConductGrade = options;
      this.selectedOptionconductgrade = options;
      this.isOpenconductGrade = false;
    },
    selectOptionconductgradeUpdate(options) {
      this.getByIdconduct.ConductGrade = options;
      this.isOpenconductGradeUpdate = false;
    },
    selectOptionsemester(id, options) {
      this.formData.SemesterId = id;
      this.selectedOptionsemester = options;
      this.isOpenSemester = false;
    },
    selectOptionsemesterUpdate(id, options) {
      this.getByIdconduct.SemesterId = id;
      this.getByIdconduct.SemesterName = options;
      this.isOpenSemesterUpdate = false;
    },
    selectOptionschoolyear(id, options) {
      this.formData.SchoolYearId = id;
      this.selectedOptionschoolyear = options;
      this.isOpenSchoolyear = false;
    },
    selectOptionschoolyearUpdate(id, options) {
      this.getByIdconduct.SchoolYearId = id;
      this.getByIdconduct.SchoolYearName = options;
      this.isOpenSchoolyearUpdate = false;
    },
    selectOptionstudent(id, options) {
      this.formData.StudentId = id;
      this.selectedOptionstudent = options;
      this.isOpenstudent = false;
    },
    selectOptionstudentUpdate(id, options) {
      this.getByIdconduct.StudentId = id;
      this.getByIdconduct.StudentName = options;
      this.isOpenstudentUpdate = false;
    },
    selectOptionclassroom(id, options) {
      this.formData.ClassRoomId = id;
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    selectOptionclassroomUpdate(id, options) {
      this.getByIdconduct.ClassRoomId = id;
      this.getByIdconduct.ClassRoomName = options;
      this.isOpenclassroomUpdate = false;
    },
    checkCodeConduct(code) {
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
          case this.conduct.findIndex(
            (ele) => ele.ConductCode === this.formData.ConductCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã hạnh kiểm nhập bị trùng");
            break;
          case this.formData.ConductCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã hạnh kiểm");
            break;
          case this.selectedOptionconductgrade === "":
            isValid = false;
            this.error.push("Vui lòng chọn điểm hạnh kiểm");
            break;
          case this.selectedOptionschoolyear === "":
            isValid = false;
            this.error.push("Vui lòng chọn năm học");
            break;
          case this.selectedOptionsemester === "":
            isValid = false;
            this.error.push("Vui lòng chọn học kỳ");
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
          case this.checkCodeConduct(this.getByIdconduct.ConductCode):
            isValid = false;
            this.error.push("Mã hạnh kiểm bị trùng");
            break;
          case this.getByIdconduct.ConductCode.trim() === "":
            isValid = false;
            this.error.push("Mã hạnh kiểm không được để trống");
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
          this.addconduct({
            ConductId: uuidv4(),
            ConductCode: this.formData.ConductCode,
            StudentId: this.formData.StudentId,
            SemesterId: this.formData.SemesterId,
            SchoolYearId: this.formData.SchoolYearId,
            ConductGrade: this.formData.ConductGrade,
            isChecked: false,
          });
          // reset formData
          this.formData = { ConductCode: this.conductmaxcode };
          this.selectedOptionsemester = null;
          this.selectedOptionschoolyear = null;
          this.selectedOptionconductgrade = null;
          this.selectedOptionstudent = null;
          this.SHOW_FORM_CONDUCT();
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
          this.getByIdconduct.IsChecked = false;
          this.updateItemconduct(this.getByIdconduct);
          this.SHOW_FORM_CONDUCT();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getStudentAll",
      "getClassRoom",
      "getMaxCodeconduct",
      "updateItemconduct",
      "addconduct",
      "getsemester",
      "getschoolyear",
    ]),
    ...mapMutations(["SHOW_FORM_CONDUCT"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getschoolyear();
    this.getsemester();
    this.getStudentAll();
    this.getClassRoom();
    this.getMaxCodeconduct();
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
  width: 58%;
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