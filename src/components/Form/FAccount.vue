<template>
  <div class="form_container" v-if="isshowaccount">
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
      class="account_form"
      @submit.prevent="onSubmitAdd"
      novalidate="true"
      v-if="formModeaccount === true"
    >
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
          <input
            type="text"
            class="sinput"
            placeholder="mã lớp học"
            v-model="formData.AccountCode"
          />
        </label>
        <label class="slabel"
          >Mật khẩu
          <input
            type="text"
            class="sinput"
            placeholder="tên lớp học"
            v-model="formData.PassWord"
          />
        </label>
        <!--loai tai khoan-->
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
        <!--hoc sinh-->
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
              style="width: 475px"
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
        <!--giao vien-->
        <label class="slabel" @click="toggleDropdownteacher">
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 475px">
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
            <div
              class="overlaylist"
              v-show="isOpensteacher"
              style="width: 475px"
            >
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
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_ACCOUNT" />
        <div class="btn_wp">
          <VButton text="Cất" class="btn_phu" />
          <VButton type="submit" class="ml-8" text="Cất và thêm" />
        </div>
      </div>
    </form>
    <form
      class="account_form"
      @submit.prevent="onSubmitUpdate"
      novalidate="true"
      v-if="formModeaccount === false"
    >
      <div class="info_title">
        <div class="title_left">
          <h1>Cập nhật tài khoản</h1>
        </div>
        <div class="title_close">
          <i class="bx bx-help-circle"></i>
          <i class="bx bx-x" @click="SHOW_FORM_ACCOUNT"></i>
        </div>
      </div>
      <div class="info_property">
        <label class="slabel"
          >Mã tài khoản
          <input
            type="text"
            class="sinput"
            placeholder="mã tài khoản"
            v-model="getById.AccountCode"
          />
        </label>
        <label class="slabel"
          >Mật khẩu
          <input
            type="text"
            class="sinput"
            placeholder="mật khẩu"
            v-model="getById.Password"
          />
        </label>
        <!--loai tai khoan-->
        <label class="slabel" @click="toggleDropdownUpdate">
          Loại tài khoản
          <div class="dropdown" style="margin-top: 8px">
            <input
              type="text"
              v-model="getById.Role"
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
                  v-for="data in selectedRoles"
                  :key="data.id"
                  @click="selectOptionUpdate(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <!--hoc sinh-->
        <label class="slabel" @click="toggleDropdownstudentUpdate">
          Thông tin học sinh
          <div class="dropdown" style="margin-top: 8px; width: 475px">
            <input
              type="text"
              v-model="getById.StudentId"
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
              style="width: 475px"
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
        <!--giao vien-->
        <label class="slabel" @click="toggleDropdownteacherUpdate">
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 475px">
            <input
              type="text"
              v-model="getById.TeacherId"
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
            <div
              class="overlaylist"
              v-show="isOpensteacherUpdate"
              style="width: 475px"
            >
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
import { reactive, ref } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import VButton from "../Button/VButton.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "FClassroom",
  setup() {
    const isOpen = ref(false);
    const isOpenUpdate = ref(false);
    const isOpenstudent = ref(false);
    const isOpensteacher = ref(false);
    const isOpenstudentUpdate = ref(false);
    const isOpensteacherUpdate = ref(false);
    //hoc sinh
    const selectedOptionstudent = ref("");
    //teacher
    const selectedOptionteacher = ref("");
    //role
    const selectedOption = ref("");
    const formData = reactive({
      AccountCode: "",
      PassWord: "",
      StudentId: "",
      TeacherId: "",
      Role: "",
    });
    return {
      formData,
      isOpen,
      isOpenUpdate,
      isOpenstudent,
      isOpenstudentUpdate,
      isOpensteacher,
      isOpensteacherUpdate,
      selectedOptionstudent,
      selectedOptionteacher,
      selectedOption,
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
    maxId() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.formData = {
        ...this.formData,
        AccountCode: this.accountmaxcode,
      });
    },
    AccountList() {
      return this.account
        .filter((item) => item.AccountId !== this.getById.AccountId)
        .map((employee) => {
          return employee.AccountCode;
        });
    },
    ...mapGetters([
      "account",
      "studentAll",
      "teacherAll",
      "isshowaccount",
      "formModeaccount",
      "accountmaxcode",
      "getById",
    ]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdownUpdate() {
      this.isOpenUpdate = !this.isOpenUpdate;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    selectOptionUpdate(options) {
      this.selectedOption = options;
      this.isOpenUpdate = false;
    },
    toggleDropdownstudent() {
      this.isOpenstudent = !this.isOpenstudent;
    },
    toggleDropdownstudentUpdate() {
      this.isOpenstudentUpdate = !this.isOpenstudentUpdate;
    },
    toggleDropdownteacher() {
      this.isOpensteacher = !this.isOpensteacher;
    },
    toggleDropdownteacherUpdate() {
      this.isOpensteacherUpdate = !this.isOpensteacherUpdate;
    },
    selectOptionstudent(id, options) {
      this.formData.StudentId = id;
      this.selectedOptionstudent = options;
      this.isOpenstudent = false;
    },
    selectOptionteacher(id, options) {
      this.formData.TeacherId = id;
      this.selectedOptionteacher = options;
      this.isOpensteacher = false;
    },
    checkCodeAccount(code) {
      try {
        if (this.AccountList.includes(code)) {
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
          case this.account.findIndex(
            (ele) => ele.AccountCode === this.formData.AccountCode
          ) !== -1:
            isValid = false;
            this.error.push("Mã tài khoản nhập bị trùng");
            break;
          case this.formData.AccountCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã tài khoản");
            break;
          case this.formData.PassWord.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mật khẩu");
            break;
          case this.selectedOption == null:
            isValid = false;
            this.error.push("Vui lòng chọn quyền tài khoản");
            break;
          case this.formData.PassWord.length < 9:
            isValid = false;
            this.error.push("Mật khẩu phải lớn hơn 8 kí tự");
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
          case this.checkCodeAccount(this.getById.AccountCode):
            isValid = false;
            this.error.push("Mã tài khoản bị trùng");
            break;
          case this.getById.AccountCode.trim() === "":
            isValid = false;
            this.error.push("Mã tài khoản không được để trống");
            break;
          case this.getById.Password.trim() === "":
            isValid = false;
            this.error.push("Mật khẩu không được để trống");
            break;
          case this.getById.Password.length < 9:
            isValid = false;
            this.error.push("Mật khẩu phải lớn hơn 8 kí tự");
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
          this.addaccount({
            AccountId: uuidv4(),
            AccountCode: this.formData.AccountCode,
            PassWord: this.formData.PassWord,
            StudentId: this.formData.StudentId,
            TeacherId: this.formData.TeacherId,
            Role: this.selectedOption,
            isChecked: false,
          });
          // reset formData
          this.formData = { AccountCode: this.accountmaxcode };
          this.selectedOption = null;
          this.selectedOptionstudent = null;
          this.selectedOptionteacher = null;
          this.SHOW_FORM_ACCOUNT();
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
          this.getById.IsChecked = false;
          this.updateItemaccount(this.getById);
          this.SHOW_FORM_ACCOUNT();
          this.checkForm = false;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getaccount",
      "getStudentAll",
      "getteacherAll",
      "getMaxCodeaccount",
      "updateItemaccount",
      "addaccount",
    ]),
    ...mapMutations(["SHOW_FORM_ACCOUNT"]),
  },
  beforeUpdate() {
    this.maxId;
  },
  mounted() {
    this.maxId;
    this.getMaxCodeaccount();
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