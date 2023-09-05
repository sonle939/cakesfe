<template>
  <div class="form_container" v-if="isshowstudent">
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
      class="student_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModestudent === true"
    >
      <div class="info_title" style="margin-bottom: 0px">
        <div class="title_left">
          <h1>Thêm mới học sinh</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_STUDENT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã học sinh
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="mã học sinh"
            v-model="formData.StudentCode"
          />
        </label>
        <label class="slabel"
          >Tên học sinh
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="tên học sinh"
            v-model="formData.StudentName"
          />
        </label>
        <label class="slabel"
          >Ngày sinh
          <input
            type="date"
            class="sinput"
            style="width: 315px"
            v-model="formData.DateOfBirth"
          />
        </label>
        <label class="slabel"
          >Địa chỉ email
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="email..."
            v-model="formData.Email"
          />
        </label>
        <div class="sex_wrapper" style="margin-left: 26px">
          <p>Giới tính</p>
          <div class="sex_input">
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="nam"
                v-model="formData.Gender"
                @click="formData.Gender = 1"
              />
              <label for="nam" @click="formData.Gender = 1">Nam</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="women"
                v-model="formData.Gender"
                @click="formData.Gender = 0"
              />
              <label for="women" @click="formData.Gender = 0">Nữ</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="khac"
                v-model="formData.Gender"
                @click="formData.Gender = 2"
              />
              <label for="khac" @click="formData.Gender = 2">Khác</label>
            </div>
          </div>
        </div>
        <label
          class="slabel"
          @click="toggleDropdown"
          style="margin-left: 110px"
        >
          Thông tin lớp học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="selectedOption"
              placeholder="Chọn lớp học"
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
                  v-for="data in classroomstudent"
                  :key="data.ClassRoomId"
                  @click="selectOption(data.ClassRoomId, data.ClassRoomName)"
                >
                  {{ data.ClassRoomName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <label class="slabel" style="width: 100%"
          >Địa chỉ học sinh
          <input
            type="text"
            class="sinput"
            style="width: 100%"
            placeholder="địa chỉ học sinh"
            v-model="formData.Address"
          />
        </label>
      </div>
      <div class="info_btn" style="margin-bottom: 20px">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_STUDENT" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="student_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModestudent === false"
    >
      <div class="info_title" style="margin-bottom: 0px">
        <div class="title_left">
          <h1>Cập nhật học sinh</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_STUDENT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã học sinh
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="mã học sinh"
            v-model="getByIdstudent.StudentCode"
          />
        </label>
        <label class="slabel"
          >Tên học sinh
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="tên học sinh"
            v-model="getByIdstudent.StudentName"
          />
        </label>
        <label class="slabel"
          >Ngày sinh
          <input
            type="date"
            class="sinput"
            style="width: 315px"
            v-model="formattedDateOfBirth"
          />
        </label>
        <label class="slabel"
          >Địa chỉ email
          <input
            type="text"
            class="sinput"
            style="width: 315px"
            placeholder="email..."
            v-model="getByIdstudent.Email"
          />
        </label>
        <div class="sex_wrapper" style="margin-left: 26px">
          <p>Giới tính</p>
          <div class="sex_input">
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="nam"
                @click="getByIdstudent.Gender = 1"
                :checked="getByIdstudent.Gender == 1"
              />
              <label for="nam" @click="getByIdstudent.Gender = 1">Nam</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="women"
                @click="getByIdstudent.Gender = 0"
                :checked="getByIdstudent.Gender == 0"
              />
              <label for="women" @click="getByIdstudent.Gender = 0">Nữ</label>
            </div>
            <div class="sex_item">
              <VRadio
                name="sex"
                class="mr-6"
                id="khac"
                @click="getByIdstudent.Gender = 2"
                :checked="getByIdstudent.Gender == 2"
              />
              <label for="khac" @click="getByIdstudent.Gender = 2">Khác</label>
            </div>
          </div>
        </div>
        <label
          class="slabel"
          @click="toggleDropdownUpdate"
          style="margin-left: 110px"
        >
          Thông tin lớp học
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getByIdstudent.ClassRoomName"
              placeholder="Chọn lớp học"
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
                  v-for="data in classroomstudent"
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
        <label class="slabel" style="width: 100%"
          >Địa chỉ học sinh
          <input
            type="text"
            class="sinput"
            style="width: 100%"
            placeholder="địa chỉ học sinh"
            v-model="getByIdstudent.Address"
          />
        </label>
      </div>
      <div class="info_btn" style="margin-bottom: 20px">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_STUDENT" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
  </div>
</template>
    
    <script>
import { reactive, ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import VRadio from "../Input/VRadio.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "FClassroom",
  setup() {
    const isOpen = ref(false);
    const selectedOption = ref("");
    const isOpenUpdate = ref(false);
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const formData = reactive({
      StudentCode: "",
      StudentName: "",
      DateOfBirth: new Date(),
      Email: "",
      Gender: "",
      Address: "",
      ClassRoomId: "",
    });
    return {
      isOpen,
      isOpenUpdate,
      selectedOption,
      formData,
      checkForm,
      error,
      build,
    };
  },
  computed: {
    ...mapGetters([
      "classroomstudent",
      "isshowstudent",
      "getByIdstudent",
      "formModestudent",
      "studentmaxcode",
      "student",
    ]),
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        StudentCode: this.studentmaxcode,
      });
    },
    StudentList() {
      return this.student
        .filter((item) => item.StudentId !== this.getByIdstudent.StudentId)
        .map((employee) => {
          return employee.StudentCode;
        });
    },
    formattedDateOfBirth: {
      get() {
        // Chuyển đổi từ ISO 8601 sang "yyyy-MM-dd"
        const isoDate = new Date(this.getByIdstudent.DateOfBirth);
        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      set(value) {
        // Khi người dùng thay đổi giá trị trong input, chuyển đổi lại định dạng
        this.getByIdstudent.DateOfBirth = value;
      },
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.formData.ClassRoomId = id;
      this.selectedOption = options;
      this.isOpen = false;
    },
    toggleDropdownUpdate() {
      this.isOpenUpdate = !this.isOpenUpdate;
    },
    selectOptionUpdate(id, options) {
      this.getByIdstudent.ClassRoomId = id;
      this.getByIdstudent.ClassRoomName = options;
      this.isOpenUpdate = false;
    },
    checkCodeStudent(code) {
      try {
        if (this.StudentList.includes(code)) {
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
          case this.student.findIndex(
            (ele) => ele.StudentCode === this.formData.StudentCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã học sinh nhập bị trùng");
            break;
          case this.formData.StudentCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã học sinh");
            break;
          case this.formData.StudentName.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập tên học sinh");
            break;
          case this.formData.StudentName.length < 5:
            isValid = false;
            this.error.push("Tên học sinh phải lớn hơn 5 kí tự");
            break;
          case this.selectedOption == null:
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
          case this.checkCodeStudent(this.getByIdstudent.StudentCode):
            isValid = false;
            this.error.push("Mã học sinh bị trùng");
            break;
          case this.getByIdstudent.StudentCode.trim() === "":
            isValid = false;
            this.error.push("Mã học sinh không được để trống");
            break;
          case this.getByIdstudent.StudentName.trim() === "":
            isValid = false;
            this.error.push("Tên học sinh không được để trống");
            break;
          case this.getByIdstudent.StudentName.length < 5:
            isValid = false;
            this.error.push("Tên học sinh phải lớn hơn 5 kí tự");
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
          this.addstudent({
            StudentId: uuidv4(),
            StudentName: this.formData.StudentName,
            StudentCode: this.formData.StudentCode,
            DateOfBirth: this.formData.DateOfBirth,
            Email: this.formData.Email,
            Gender: this.formData.Gender,
            Address: this.formData.Address,
            ClassRoomId: this.formData.ClassRoomId,
            isChecked: false,
          });
          // reset formData
          this.formData = { StudentCode: this.studentmaxcode };
          this.selectedOption = null;
          this.SHOW_FORM_STUDENT();
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
          this.getByIdstudent.IsChecked = false;
          this.updateItemstudent(this.getByIdstudent);
          this.SHOW_FORM_STUDENT();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getclassroomstudent",
      "getMaxCodestudent",
      "addstudent",
      "updateItemstudent",
    ]),
    ...mapMutations(["SHOW_FORM_STUDENT"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getclassroomstudent();
    this.getMaxCodestudent();
  },
  components: {
    VButton,
    VRadio,
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
.student_form {
  height: 50%;
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
/**radio button */

.sex_wrapper {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sex_wrapper p {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}
.sex_input {
  display: flex;
  align-items: center;
}
.sex_item {
  display: flex;
  align-items: center;
  margin-right: 30px;
  height: 36px;
}
</style>