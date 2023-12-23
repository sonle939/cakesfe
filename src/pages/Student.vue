<template>
  <div class="student">
    <Navbar />
    <div
      :class="[
        backgroundWeb ? 'background-black d-flex' : 'background-white d-flex',
        directiondiv && 'navigate_div',
      ]"
    >
      <Sidebar />
      <div
        :class="directiondiv ? 'page_content border_design' : 'page_content '"
      >
        <HeaderContent text="Quản lý học sinh" :showform="authenClickInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách"
                  v-model="valueCode"
                  @keydown.enter="getfilterEmployeeCode(valueCode)"
                />
              </div>
              <div class="checked_data" v-show="trueCheckedstudent">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountstudent }}</p>
                </h3>
                <h3 @click="uncheckItemsstudent">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="deleteStudentOrAuthenMultip()"
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="dropdown">
                <input
                  type="text"
                  v-model="selectedOption"
                  placeholder="Chọn giá trị lọc"
                  @click="toggleDropdown"
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
                      @click="
                        selectOption(data.ClassRoomId, data.ClassRoomName)
                      "
                    >
                      {{ data.ClassRoomName }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelStudent"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="reloadPage()"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingstudent
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
          >
            <table style="width: 100%; height: auto">
              <thead>
                <tr>
                  <th
                    style="
                      min-width: 150px;
                      border-top: 0px solid;
                      border-left: 0px solid;
                    "
                  >
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="checkAllstudent"
                      @change="toggleAllSelectionstudent"
                    />
                    Mã học sinh
                  </th>
                  <th style="min-width: 155px">Tên học sinh</th>
                  <th style="min-width: 170px">Ngày sinh</th>
                  <th style="min-width: 155px">Email</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 155px">Địa chỉ</th>
                  <th style="min-width: 170px">Thuộc về lớp</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in student" :key="data.StudentId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDSTUDENT(data.StudentId)"
                    />
                    {{ data.StudentCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.StudentName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.StudentName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="formattedDate(data.DateOfBirth)">
                      {{ formattedDate(data.DateOfBirth) }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Email">
                      {{ data.Email }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="
                        data.Gender == 1
                          ? 'Nam'
                          : data.Gender == 2
                          ? 'Khác'
                          : 'Nữ'
                      "
                    >
                      {{
                        data.Gender == 1
                          ? "Nam"
                          : data.Gender == 2
                          ? "Khác"
                          : "Nữ"
                      }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Address">
                      {{ data.Address }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ClassRoomName">
                      {{ data.ClassRoomName }}
                    </tippy>
                  </td>
                  <td style="width: 100px">
                    <div class="control_table">
                      <span
                        content="Cập nhật"
                        @click="authenClickUpdate(data)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span
                        content="Xóa"
                        v-tippy
                        @click="deleteStudentOrAuthen(data)"
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="student.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingstudent" />
          </div>
          <AdminPaginnation
            :showIsHide="showIsHidestudent"
            :totalRecords="totalRecordsstudent"
            :pageNumber="pageNumberstudent"
            :pageSize="pageSizestudent"
            :totalPages="totalPagesstudent"
            :setPageNumber="setPageNumberstudent"
            :setSize="setSizestudent"
            :HIDE="HIDESTUDENT"
          />
        </div>
      </div>
    </div>
    <FStudentVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { format } from "date-fns";
import FStudentVue from "../components/Form/FStudent.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Student",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Học sinh",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
          timeout: 2000,
        }
      );
    };
    const toastWarning = () => {
      createToast(
        {
          title: "Học sinh",
          description: "Không thể xóa bản ghi này vì có dữ liệu liên quan.",
        },
        {
          type: "warning",
          transition: "bounce",
          showIcon: "true",
          timeout: 3000,
        }
      );
    };
    const toastWarningMultip = () => {
      createToast(
        {
          title: "Học sinh",
          description: "Không thể xóa các bản ghi này vì có dữ liệu liên quan.",
        },
        {
          type: "warning",
          transition: "bounce",
          showIcon: "true",
          timeout: 3000,
        }
      );
    };
    const toastAuthen = () => {
      createToast(
        {
          title: "Quyền hạn",
          description: "Bạn không đủ quyền để chỉnh sửa",
        },
        {
          type: "warning",
          transition: "bounce",
          showIcon: "true",
          timeout: 2000,
        }
      );
    };
    const selectedOption = ref("");
    const searchtext = ref("");
    const isOpen = ref(false);
    const teaadmin = ref([]);
    const isDisabled = ref(false);
    const regex = /^[A-Z a-z 0-9]+-\d{0,9}$/;
    const valueCode = ref("");
    return {
      toast,
      isOpen,
      regex,
      valueCode,
      selectedOption,
      searchtext,
      teaadmin,
      isDisabled,
      toastAuthen,
      toastWarning,
      toastWarningMultip,
    };
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FStudentVue,
    Loading,
    VButton,
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    getfilterEmployeeCode(value) {
      try {
        if (value.match(/^[0-9]+$/) || this.regex.test(value)) {
          this.setFilterstudentcodestudent(value);
          this.valueCode = "";
        } else {
          this.setFilterStudentName(value);
          this.valueCode = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.selectedOption = options;
      this.setFilterclassroomidstudent(id);
      this.isOpen = false;
    },
    clearFilterCondition() {
      try {
        this.getstudent();
      } catch (error) {
        console.log(error);
      }
    },
    async loadAdminAndTeacher() {
      const userDataString = sessionStorage.getItem("idloginteacherData");
      const userDataString1 = sessionStorage.getItem("roleData");
      console.log(userDataString);
      console.log(userDataString1);

      if (userDataString) {
        try {
          this.teaadmin = JSON.parse(userDataString);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi dữ liệu từ sessionStorage:", error);
        }
      }
    },
    async messageDel(data) {
      try {
        await this.deletestudent(data.StudentId);
        if (this.statusCodeHS === 200) {
          this.toast();
          console.log(this.statusCodeHS.status);
        } else if (this.statusCodeHS === 280) {
          this.toastWarning();
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE_STUDENT",
      "HIDESTUDENT",
      "SELECTCHECKEDSTUDENT",
      "SHOW_FORM_STUDENT",
      "UPDATE_MODE_STUDENT",
      "ADD_MODE_STUDENT",
    ]),
    ...mapActions([
      "setPageNumberstudent",
      "setSizestudent",
      "getstudent",
      "toggleAllSelectionstudent",
      "getclassroomstudent",
      "setFilterstudentcodestudent",
      "setFilterclassroomidstudent",
      "getIDstudent",
      "uncheckItemsstudent",
      "deleteMultiplestudent",
      "deletestudent",
      "exportExcelStudent",
      "setFilterStudentName",
    ]),
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
    },
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_STUDENT();
        this.getIDstudent(data);
        this.SHOW_FORM_STUDENT();
      } catch (error) {
        console.log(error);
      }
    },
    authenClickUpdate(data) {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.modeFormUpdate(data);
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    authenClickDel(data) {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.deletestudent(data.StudentId);
          this.toast();
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStudentOrAuthen(data) {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          await this.deletestudent(data.StudentId);
          if (this.statusCodeHS === 200) {
            this.toast();
            console.log(this.statusCodeHS.status);
          } else if (this.statusCodeHS === 280) {
            this.toastWarning();
          }
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStudentOrAuthenMultip() {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          await this.deleteMultiplestudent(this.selectedItemsstudent);
          if (this.statusCodeHS === 200) {
            this.toast();
            console.log(this.statusCodeHS.status);
          } else if (this.statusCodeHS === 280) {
            this.toastWarning();
          }
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    authenClickDelMulp() {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.deleteMultiplestudent(this.selectedItemsstudent);
          this.toast();
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async messageDelMultip() {
      try {
        await this.deleteMultiplestudent(this.selectedItemsstudent);
        if (this.statusCodeHS === 200) {
          this.toast();
          console.log(this.statusCodeHS.status);
        } else if (this.statusCodeHS === 280) {
          this.toastWarning();
        }
      } catch (error) {
        console.log(error);
      }
    },
    authenClickInsert() {
      try {
        if (this.teaadmin.Duty === "Giáo viên chủ nhiệm") {
          this.modeFormInsert();
        } else {
          this.toastAuthen();
        }
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_STUDENT();
        this.SHOW_FORM_STUDENT();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters([
      "student",
      "allStudent",
      "showIsHidestudent",
      "totalRecordsstudent",
      "pageSizestudent",
      "pageNumberstudent",
      "totalPagesstudent",
      "checkAllstudent",
      "checkAmountstudent",
      "trueCheckedstudent",
      "classroomstudent",
      "loadingstudent",
      "selectedItemsstudent",
      "idloginteacher",
      "backgroundWeb",
      "directiondiv",
      "statusCodeHS",
    ]),
    filteredClassroom() {
      const keyword = this.selectedOption.toLowerCase();
      return this.classroomstudent.filter((data) =>
        data.ClassRoomName.toLowerCase().includes(keyword)
      );
    },
  },
  mounted() {
    this.getclassroomstudent();
    this.loadAdminAndTeacher();
    this.getstudent();
  },
  watch: {
    idloginteacher(newVal) {
      if (newVal && newVal.length !== null) {
        const idloginteacherData = newVal;
        sessionStorage.setItem(
          "idloginteacherData",
          JSON.stringify(idloginteacherData)
        );
      }
      this.loadAdminAndTeacher();
    },
  },
};
</script>

<style>
.navigate_div {
  flex-direction: row-reverse;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>