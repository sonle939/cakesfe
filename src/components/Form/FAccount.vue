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
            placeholder="mã tài khoản"
            v-model="formData.AccountCode"
          />
        </label>
        <label class="slabel"
          >Mật khẩu
          <input
            type="text"
            class="sinput"
            placeholder="mật khẩu"
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
                  :key="data.id"
                  @click="selectOption(data.name)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <!--hoc sinh-->
        <label
          :class="
            selectedOption === 'teacher' ||
            selectedOption === 'admin' ||
            selectedOption === ''
              ? 'slabel click_none'
              : 'slabel'
          "
          @click="toggleDropdownstudent"
        >
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
                  @click="
                    selectOptionstudent(data, data.StudentId, data.StudentName)
                  "
                >
                  {{ data.StudentName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <!--giao vien-->
        <label
          :class="
            selectedOption === 'student' || selectedOption === ''
              ? 'slabel click_none'
              : 'slabel'
          "
          @click="toggleDropdownteacher"
        >
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
                  @click="
                    selectOptionteacher(data, data.TeacherId, data.TeacherName)
                  "
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <div class="isShowInfoaccount" v-if="isShowInfo">
          <label class="slabel"
            >Mã thông tin
            <input
              type="text"
              class="sinput click_none"
              style="width: 215px"
              placeholder="mã thông tin"
              :value="
                selectedOption === 'student'
                  ? getByIdstudent.StudentCode
                  : getByIdteacher.TeacherCode
              "
              disabled
            />
          </label>
          <label class="slabel"
            >Tên tài khoản
            <input
              type="text"
              class="sinput click_none"
              style="width: 215px"
              placeholder="tên tài khoản"
              :value="
                selectedOption === 'student'
                  ? getByIdstudent.StudentName
                  : getByIdteacher.TeacherName
              "
              disabled
            />
          </label>
          <label class="slabel"
            >Ngày sinh chủ tài khoản
            <input
              type="text"
              class="sinput click_none"
              style="width: 150px"
              placeholder="ngày sinh"
              :value="
                selectedOption === 'student'
                  ? formattedDateOfBirthStudent
                  : formattedDateOfBirthTeacher
              "
              disabled
            />
          </label>
          <label class="slabel"
            >Địa chỉ
            <input
              type="text"
              class="sinput click_none"
              style="width: 280px"
              placeholder="địa chỉ"
              :value="
                selectedOption === 'student'
                  ? getByIdstudent.Address
                  : getByIdteacher.Address
              "
              disabled
            />
          </label>
        </div>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_ACCOUNT" />
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
            v-model="getById.PassWord"
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
        <label
          :class="
            getById.Role == 'teacher' || getById.Role == 'admin'
              ? 'slabel click_none'
              : 'slabel'
          "
          @click="toggleDropdownstudentUpdate"
        >
          Thông tin học sinh
          <div class="dropdown" style="margin-top: 8px; width: 475px">
            <input
              type="text"
              v-model="getById.StudentName"
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
                  @click="
                    selectOptionstudentUpdate(
                      data,
                      data.StudentId,
                      data.StudentName
                    )
                  "
                >
                  {{ data.StudentName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <!--giao vien-->
        <label
          :class="getById.Role === 'student' ? 'slabel click_none' : 'slabel'"
          @click="toggleDropdownteacherUpdate"
        >
          Thông tin giáo viên
          <div class="dropdown" style="margin-top: 8px; width: 475px">
            <input
              type="text"
              v-model="getById.TeacherName"
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
                  @click="
                    selectOptionteacherUpdate(
                      data,
                      data.TeacherId,
                      data.TeacherName
                    )
                  "
                >
                  {{ data.TeacherName }}
                </li>
              </ul>
            </div>
          </div>
        </label>
        <div class="isShowInfoaccount" v-if="isShowInfo">
          <label class="slabel"
            >Mã thông tin
            <input
              type="text"
              class="sinput click_none"
              style="width: 215px"
              placeholder="mã thông tin"
              :value="
                getById.Role === 'student'
                  ? getByIdstudent.StudentCode
                  : getByIdteacher.TeacherCode
              "
              disabled
            />
          </label>
          <label class="slabel"
            >Tên tài khoản
            <input
              type="text"
              class="sinput click_none"
              style="width: 215px"
              placeholder="tên tài khoản"
              :value="
                getById.Role === 'student'
                  ? getByIdstudent.StudentName
                  : getByIdteacher.TeacherName
              "
              disabled
            />
          </label>
          <label class="slabel"
            >Ngày sinh chủ tài khoản
            <input
              type="text"
              class="sinput click_none"
              style="width: 150px"
              placeholder="ngày sinh"
              :value="
                getById.Role === 'student'
                  ? formattedDateOfBirthStudent
                  : formattedDateOfBirthTeacher
              "
              disabled
            />
          </label>
          <label class="slabel"
            >Địa chỉ
            <input
              type="text"
              class="sinput click_none"
              style="width: 280px"
              placeholder="địa chỉ"
              :value="
                getById.Role === 'student'
                  ? getByIdstudent.Address
                  : getByIdteacher.Address
              "
              disabled
            />
          </label>
        </div>
      </div>
      <div class="info_btn">
        <VButton text="Hủy" class="btn_phu" @click="SHOW_FORM_ACCOUNT" />
        <div class="btn_wp">
          <VButton text="Cập nhật" @click="this.toastUpdate()" />
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
import { createToast } from "mosha-vue-toastify";
export default {
  name: "FClassroom",
  setup() {
    const isShowInfo = ref(false);
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
    const checkForm = ref(false);
    const error = ref([]);
    const build = ref(false);
    const toast = () => {
      createToast(
        {
          title: "Tài khoản",
          description: "Thêm mới thành công",
        },
        {
          type: "success",
          timeout: 2000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Tài khoản",
          description: "Cập nhât thành công",
        },
        {
          type: "warning",
          timeout: 2000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    return {
      toast,
      toastUpdate,
      isShowInfo,
      checkForm,
      error,
      build,
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
    // filteredTeacher() {
    //   const keyword = this.selectedOptionteacher.toLowerCase();
    //   return this.teacherAll.filter((data) =>
    //     data.TeacherName.toLowerCase().includes(keyword)
    //   );
    // },
    // filteredStudent() {
    //   const keyword = this.selectedOptionstudent.toLowerCase();
    //   return this.studentAll.filter((data) =>
    //     data.StudentName.toLowerCase().includes(keyword)
    //   );
    // },
    filteredTeacher() {
      if (this.selectedOptionteacher) {
        const keyword = this.selectedOptionteacher.toLowerCase();
        return this.teacherAll.filter((data) =>
          data.TeacherName.toLowerCase().includes(keyword)
        );
      } else {
        // Trả về toàn bộ danh sách giáo viên nếu selectedOptionteacher là null
        return this.teacherAll;
      }
    },
    filteredStudent() {
      if (this.selectedOptionstudent) {
        const keyword = this.selectedOptionstudent.toLowerCase();
        return this.studentAll.filter((data) =>
          data.StudentName.toLowerCase().includes(keyword)
        );
      } else {
        // Trả về toàn bộ danh sách sinh viên nếu selectedOptionstudent là null
        return this.studentAll;
      }
    },
    formattedDateOfBirthStudent: {
      get() {
        // Chuyển đổi từ ISO 8601 sang "yyyy-MM-dd"
        const isoDate = new Date(this.getByIdstudent.DateOfBirth);
        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
      },
      set(value) {
        // Khi người dùng thay đổi giá trị trong input, chuyển đổi lại định dạng
        this.getByIdstudent.DateOfBirth = value;
      },
    },
    formattedDateOfBirthTeacher: {
      get() {
        // Chuyển đổi từ ISO 8601 sang "yyyy-MM-dd"
        const isoDate = new Date(this.getByIdteacher.DateOfBirth);
        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
      },
      set(value) {
        // Khi người dùng thay đổi giá trị trong input, chuyển đổi lại định dạng
        this.getByIdteacher.DateOfBirth = value;
      },
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
      "getByIdteacher",
      "getByIdstudent",
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
      this.getById.Role = options;
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
    selectOptionstudent(data, id, options) {
      this.getIDstudent(data);
      this.formData.StudentId = id;
      this.selectedOptionstudent = options;
      this.isOpenstudent = false;
      this.isShowInfo = !this.isShowInfo;
    },
    selectOptionstudentUpdate(data, id, options) {
      this.getIDstudent(data);
      this.getById.StudentId = id;
      this.getById.StudentName = options;
      this.isOpenstudentUpdate = false;
      this.isShowInfo = true;
    },
    selectOptionteacher(data, id, options) {
      this.getIDteacher(data);
      this.formData.TeacherId = id;
      this.selectedOptionteacher = options;
      this.isOpensteacher = false;
      this.isShowInfo = !this.isShowInfo;
    },
    selectOptionteacherUpdate(data, id, options) {
      this.getIDteacher(data);
      this.getById.TeacherId = id;
      this.getById.TeacherName = options;
      this.isOpensteacherUpdate = false;
      this.isShowInfo = true;
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
    checkAndToggleInfo() {
      if (this.selectedOptionteacher.trim() === "") {
        this.isShowInfo = false;
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
          case this.account.findIndex(
            (ele) => ele.StudentId === this.formData.StudentId
          ) !== -1:
            isValid = false;
            this.error.push("Mỗi người chỉ có một tài khoản");
            break;
          case this.account.findIndex(
            (ele) => ele.TeacherId === this.formData.TeacherId
          ) !== -1:
            isValid = false;
            this.error.push("Mỗi người chỉ có một tài khoản");
            break;
          case this.formData.AccountCode.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mã tài khoản");
            break;
          case this.formData.PassWord.trim() === "":
            isValid = false;
            this.error.push("Vui lòng nhập mật khẩu");
            break;
          case this.selectedOption === "":
            isValid = false;
            this.error.push("Vui lòng chọn quyền tài khoản");
            break;
          case this.formData.PassWord.length <= 8:
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
          case this.getById.PassWord.trim() === "":
            isValid = false;
            this.error.push("Mật khẩu không được để trống");
            break;
          case this.getById.PassWord.length < 9:
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
          if (this.formData.StudentId !== "") {
            this.formData.TeacherId = null;
          } else if (this.formData.TeacherId !== "") {
            this.formData.StudentId = null;
          }
          this.addaccount({
            AccountId: uuidv4(),
            AccountCode: this.formData.AccountCode,
            PassWord: this.formData.PassWord,
            StudentId: this.formData.StudentId,
            TeacherId: this.formData.TeacherId,
            Role: this.selectedOption,
            isChecked: false,
          });
          this.toast();
          // reset formData
          this.formData = { AccountCode: this.accountmaxcode };
          this.isShowInfo = false;
          this.selectedOption = null;
          this.selectedOptionstudent = null;
          this.selectedOptionteacher = null;
          if (this.build === true) {
            this.SHOW_FORM_ACCOUNT();
            this.formData = { AccountCode: this.accountmaxcode };
          }
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
      "getIDstudent",
      "getIDteacher",
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
  watch: {
    //theo dõi nếu hai biến thành null thì lập tức cho ẩn đi phần thông tin cá nhân
    selectedOptionteacher(newValue) {
      if (newValue === null || newValue.trim() === "") {
        this.isShowInfo = false;
      }
    },
    selectedOptionstudent(newValue) {
      if (newValue === null || newValue.trim() === "") {
        this.isShowInfo = false;
      }
    },
    "getById.TeacherName"(newValue) {
      if (newValue === "") {
        this.isShowInfo = false;
      }
    },
    "getById.StudentName"(newValue) {
      if (newValue === "") {
        this.isShowInfo = false;
      }
    },
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
  height: auto;
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
.isShowInfoaccount {
  display: flex;
  align-items: center;
}
</style>