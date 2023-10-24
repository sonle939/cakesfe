<template>
  <div class="form_container" v-if="isshowassignment">
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
      class="classroom_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModeassignment === true"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Thêm mới phân công</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_ASSIGNMENT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã phân công
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="formData.AssignmentCode"
          />
        </label>
        <label class="slabel" @click="toggleDropdown">
          Lớp học
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
                  v-for="data in filteredClassroom"
                  :key="data.ClassRoomId"
                  @click="selectOption(data.ClassRoomId, data.ClassRoomName)"
                >
                  {{ data.ClassRoomName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownteacher">
          Giáo viên
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOptionTeacher"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownteacher"
              :class="
                isOpenTeacher
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenTeacher">
              <ul ref="list">
                <li
                  v-for="data in filteredTeacher"
                  :key="data.ClassRoomId"
                  @click="selectOptionteacher(data.TeacherId, data.TeacherName)"
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_ASSIGNMENT" />
        <div class="btn_wp">
          <VButton text="Cất" @click="build = true" class="btn_phu" />
          <VButton
            type="submit"
            @click="build = false"
            class="ml-8"
            text="Cất và thêm"
          />
        </div>
      </div>
    </form>
    <form
      class="classroom_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModeassignment === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật phân công</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_ASSIGNMENT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã phân công
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="getByIdAssignment.AssignmentCode"
          />
        </label>
        <label class="slabel" @click="toggleDropdownUpdate">
          Lớp học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdAssignment.ClassRoomName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownUpdate"
              :class="
                isOpenUpdate
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenUpdate">
              <ul ref="list">
                <li
                  v-for="data in filteredClassroomUpdate"
                  :key="data.ClassRoomId"
                  @click="
                    selectOptionUpdate(data.ClassRoomId, data.ClassRoomName)
                  "
                >
                  {{ data.ClassRoomName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" @click="toggleDropdownteacherupdate">
          Giáo viên
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdAssignment.TeacherName"
              placeholder="Chọn giá trị lọc"
            />
            <i
              @click="toggleDropdownteacherupdate"
              :class="
                isOpenUpdateTeacher
                  ? 'bx bx-chevron-down active'
                  : 'bx bx-chevron-down'
              "
            ></i>
            <div class="overlaylist" v-show="isOpenUpdateTeacher">
              <ul ref="list">
                <li
                  v-for="data in filteredTeacherUpdate"
                  :key="data.TeacherId"
                  @click="
                    selectOptionUpdateTeacher(data.TeacherId, data.TeacherName)
                  "
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_ASSIGNMENT" />
        <div class="btn_wp">
          <VButton text="Câp nhật " type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import { v4 as uuidv4 } from "uuid";
import { reactive, ref } from "vue";
import { createToast } from "mosha-vue-toastify";
export default {
  name: "FAssignment",
  setup() {
    const formData = reactive({
      AssignmentCode: "",
      ClassRoomId: "",
      TeacherId: "",
    });
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const isOpen = ref(false);
    const isOpenUpdate = ref(false);
    const selectedOption = ref(null);
    const isOpenTeacher = ref(false);
    const isOpenUpdateTeacher = ref(false);
    const selectedOptionTeacher = ref(null);
    const toast = () => {
      createToast(
        {
          title: "Phân công",
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
          title: "Phân công",
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
    return {
      isOpen,
      isOpenUpdate,
      selectedOption,
      isOpenTeacher,
      isOpenUpdateTeacher,
      selectedOptionTeacher,
      formData,
      checkForm,
      error,
      build,
      toast,
      toastUpdate,
    };
  },
  computed: {
    ...mapGetters([
      "assignment",
      "classroom",
      "isshowassignment",
      "assignmentmaxcode",
      "formModeassignment",
      "getByIdAssignment",
      "teacherAll",
    ]),
    filteredTeacher() {
      if (this.selectedOptionTeacher) {
        const keyword = this.selectedOptionTeacher.toLowerCase();
        return this.teacherAll.filter((data) =>
          data.TeacherName.toLowerCase().includes(keyword)
        );
      } else {
        return this.teacherAll;
      }
    },
    filteredClassroom() {
      if (this.selectedOption) {
        const keyword = this.selectedOption.toLowerCase();
        return this.classroom.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroom;
      }
    },
    filteredTeacherUpdate() {
      if (this.getByIdAssignment.TeacherName) {
        const keyword = this.getByIdAssignment.TeacherName.toLowerCase();
        return this.teacherAll.filter((data) =>
          data.TeacherName.toLowerCase().includes(keyword)
        );
      } else {
        return this.teacherAll;
      }
    },
    filteredClassroomUpdate() {
      if (this.getByIdAssignment.ClassRoomName) {
        const keyword = this.getByIdAssignment.ClassRoomName.toLowerCase();
        return this.classroom.filter((data) =>
          data.ClassRoomName.toLowerCase().includes(keyword)
        );
      } else {
        return this.classroom;
      }
    },
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        AssignmentCode: this.assignmentmaxcode,
      });
    },
    AssignmentList() {
      return this.assignment
        .filter(
          (item) => item.AssignmentId !== this.getByIdAssignment.AssignmentId
        )
        .map((employee) => {
          return employee.AssignmentCode;
        });
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdownteacher() {
      this.isOpenTeacher = !this.isOpenTeacher;
    },
    selectOption(id, options) {
      this.formData.ClassRoomId = id;
      this.selectedOption = options;
      this.isOpen = false;
    },
    selectOptionteacher(id, options) {
      this.formData.TeacherId = id;
      this.selectedOptionTeacher = options;
      this.isOpenTeacher = false;
    },
    toggleDropdownUpdate() {
      this.isOpenUpdate = !this.isOpenUpdate;
    },
    toggleDropdownteacherupdate() {
      this.isOpenUpdateTeacher = !this.isOpenUpdateTeacher;
    },
    selectOptionUpdate(id, options) {
      this.getByIdAssignment.ClassRoomId = id;
      this.getByIdAssignment.ClassRoomName = options;
      this.isOpenUpdate = false;
    },
    selectOptionUpdateTeacher(id, options) {
      this.getByIdAssignment.TeacherId = id;
      this.getByIdAssignment.TeacherName = options;
      this.isOpenUpdateTeacher = false;
    },
    checkCodeAssignment(code) {
      try {
        if (this.AssignmentList.includes(code)) {
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
          case this.assignment.findIndex(
            (ele) => ele.AssignmentCode === this.formData.AssignmentCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã phân phối nhập bị trùng");
            break;
          case this.formData.AssignmentCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã phân phối");
            break;
          case this.selectedOptionTeacher === "":
            isValid = false;
            this.error.push("Vui lòng chọn tên giáo viên");
            break;
          case this.selectedOption === "":
            isValid = false;
            this.error.push("Vui lòng chọn lớp học");
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
          case this.checkCodeAssignment(this.getByIdAssignment.AssignmentCode):
            isValid = false;
            this.error.push("Mã phân phối bị trùng");
            break;
          case this.getByIdAssignment.AssignmentCode.trim() === "":
            isValid = false;
            this.error.push("Mã phân phối không được để trống");
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
          this.addassignment({
            AssignmentId: uuidv4(),
            AssignmentCode: this.formData.AssignmentCode,
            ClassRoomId: this.formData.ClassRoomId,
            TeacherId: this.formData.TeacherId,
            IsChecked: false,
          });
          // reset formData
          this.formData = { AssignmentCode: this.assignmentmaxcode };
          this.selectedOption = null;
          this.selectedOptionTeacher = null;
          if (this.build === true) {
            this.formData = { AssignmentCode: this.assignmentmaxcode };
            this.SHOW_FORM_ASSIGNMENT();
          }

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
          this.getByIdAssignment.IsChecked = false;
          this.updateItemassignment(this.getByIdAssignment);
          this.SHOW_FORM_ASSIGNMENT();
          this.toastUpdate();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getMaxCodeassignment",
      "updateItemassignment",
      "addassignment",
      "getteacherAll",
      "getClassRoom",
      "getAssignment",
    ]),
    ...mapMutations(["SHOW_FORM_ASSIGNMENT"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getteacherAll();
    this.getAssignment();
    this.getMaxCodeassignment();
    this.getClassRoom();
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