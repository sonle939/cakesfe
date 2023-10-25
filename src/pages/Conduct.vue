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
        <HeaderContent text="Quản lý hạnh kiểm" :showform="authenClickInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="filter_condition">
                <p>Lớp học</p>
                <div class="dropdown" style="width: 150px">
                  <input
                    type="text"
                    v-model="selectedOption"
                    placeholder="Chọn giá trị lọc"
                    @click="toggleDropdown"
                  />
                  <i
                    @click="toggleDropdown"
                    :class="
                      isOpen
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div class="overlaylist" v-show="isOpen" style="width: 150px">
                    <ul ref="list">
                      <li
                        v-for="data in classroom"
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
              </div>
              <div class="filter_condition">
                <p>Học kỳ</p>
                <div class="dropdown" style="width: 150px">
                  <input
                    type="text"
                    v-model="selectedOptionsemester"
                    placeholder="Chọn giá trị lọc"
                    @click="toggleDropdownsemester"
                  />
                  <i
                    @click="toggleDropdownsemester"
                    :class="
                      isOpensemester
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div
                    class="overlaylist"
                    v-show="isOpensemester"
                    style="width: 150px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in filteredSemester"
                        :key="data.SemesterId"
                        @click="
                          selectOptionsemester(
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
              </div>
              <div class="filter_condition">
                <p>Năm học</p>
                <div class="dropdown" style="width: 150px">
                  <input
                    type="text"
                    v-model="selectedOptionschoolyear"
                    placeholder="Chọn giá trị lọc"
                    @click="toggleDropdownschoolyear"
                  />
                  <i
                    @click="toggleDropdownschoolyear"
                    :class="
                      isOpenschoolyear
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div
                    class="overlaylist"
                    v-show="isOpenschoolyear"
                    style="width: 150px"
                  >
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
              </div>
              <div class="checked_data" v-show="trueCheckedconduct">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountconduct }}</p>
                </h3>
                <h3 @click="uncheckItemsconduct">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="authenClickDelMulp()"
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelConduct"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="clearFilterCondition()"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingconduct
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
          >
            <table style="width: 100%; height: auto">
              <thead>
                <tr>
                  <th
                    style="
                      min-width: 170px;
                      border-top: 0px solid;
                      border-left: 0px solid;
                    "
                  >
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="checkAllconduct"
                      @change="toggleAllSelectionconduct"
                    />
                    Mã hạnh kiểm
                  </th>
                  <th style="min-width: 155px">Tên học sinh</th>
                  <th style="min-width: 170px">Ngày sinh</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 170px">Điểm hạnh kiểm</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in conduct" :key="data.ConductId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDCONDUCT(data.ConductId)"
                    />
                    {{ data.ConductCode }}
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
                    <tippy :content="data.ConductGrade">
                      {{ data.ConductGrade }}
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
                      <span content="Xóa" v-tippy @click="authenClickDel(data)"
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="conduct.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingconduct" />
          </div>
          <AdminPaginnation
            :showIsHide="showIsHideconduct"
            :totalRecords="totalRecordsconduct"
            :pageNumber="pageNumberconduct"
            :pageSize="pageSizeconduct"
            :totalPages="totalPagesconduct"
            :setPageNumber="setPageNumberconduct"
            :setSize="setSizeconduct"
            :HIDE="HIDECONDUCT"
          />
        </div>
      </div>
    </div>
    <FConduct />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { format } from "date-fns";
import FConduct from "../components/Form/FConduct.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Conduct",
  setup() {
    const isOpen = ref(false);
    const selectedOption = ref("Lớp 6A");
    const isOpensemester = ref("");
    const selectedOptionsemester = ref("Học kì 1");
    const isOpenschoolyear = ref("");
    const selectedOptionschoolyear = ref("2021-2022");
    const toast = () => {
      createToast(
        {
          title: "Hạnh kiểm",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
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
    const teaadmin = ref([]);
    return {
      toast,
      toastAuthen,
      teaadmin,
      isOpen,
      selectedOption,
      isOpensemester,
      selectedOptionsemester,
      isOpenschoolyear,
      selectedOptionschoolyear,
    };
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FConduct,
    Loading,
    VButton,
  },
  methods: {
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
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.selectedOption = options;
      this.setFilterconductclassroom(id);
      this.isOpen = false;
    },
    toggleDropdownsemester() {
      this.isOpensemester = !this.isOpensemester;
    },
    selectOptionsemester(id, options) {
      this.selectedOptionsemester = options;
      this.setFilterconductsemester(id);
      this.isOpensemester = false;
    },
    toggleDropdownschoolyear() {
      this.isOpenschoolyear = !this.isOpenschoolyear;
    },
    selectOptionschoolyear(id, options) {
      this.selectedOptionschoolyear = options;
      this.setFilterconductschoolyear(id);
      this.isOpenschoolyear = false;
    },
    clearFilterCondition() {
      try {
        this.getConduct();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE_CONDUCT",
      "HIDECONDUCT",
      "SELECTCHECKEDCONDUCT",
      "SHOW_FORM_CONDUCT",
      "UPDATE_MODE_CONDUCT",
      "ADD_MODE_CONDUCT",
    ]),
    ...mapActions([
      "setPageNumberconduct",
      "setSizeconduct",
      "getConduct",
      "toggleAllSelectionconduct",
      "setFilterconductstudent",
      "setFilterconductclassroom",
      "setFilterconductsemester",
      "setFilterconductschoolyear",
      "getIDconduct",
      "uncheckItemsconduct",
      "deleteMultipleconduct",
      "deleteconduct",
      "getStudentAll",
      "getsemester",
      "getschoolyear",
      "getClassRoom",
      "exportExcelConduct",
    ]),
    formattedDate(data) {
      try {
        return format(new Date(data), "dd/MM/yyyy");
      } catch (error) {
        console.log(error);
      }
    },
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_CONDUCT();
        this.getIDconduct(data);
        this.SHOW_FORM_CONDUCT();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_CONDUCT();
        this.SHOW_FORM_CONDUCT();
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
          this.deleteconduct(data.ConductId);
          this.toast();
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
          this.deleteMultipleconduct(this.selectedItemsconduct);
          this.toast();
        } else {
          this.toastAuthen();
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
  },
  computed: {
    ...mapGetters([
      "conduct",
      "allConduct",
      "showIsHideconduct",
      "totalRecordsconduct",
      "pageSizeconduct",
      "pageNumberconduct",
      "totalPagesconduct",
      "checkAllconduct",
      "checkAmountconduct",
      "trueCheckedconduct",
      "semester",
      "studentAll",
      "schoolyear",
      "classroom",
      "loadingconduct",
      "selectedItemsconduct",
      "idloginteacher",
      "backgroundWeb",
      "directiondiv",
    ]),
    filteredSemester() {
      return this.semester.filter((data) => data.SemesterName !== "Cả năm");
    },
  },
  mounted() {
    this.getConduct();
    this.getStudentAll();
    this.getsemester();
    this.getschoolyear();
    this.getClassRoom();
    this.loadAdminAndTeacher();
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

<style scoped>
.filter_condition {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.filter_condition p {
  font-weight: 700;
  margin-right: 10px;
}
</style>