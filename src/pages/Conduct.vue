<template>
  <div class="student">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý hạnh kiểm" :showform="modeFormInsert" />
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
                        v-for="data in semester"
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
                  @click="
                    deleteMultipleconduct(selectedItemsconduct);
                    toast();
                  "
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel"></div>
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
                  <th style="min-width: 170px">Thuộc về lớp</th>
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
                    <tippy :content="data.ClassRoomName">
                      {{ data.ClassRoomName }}
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
                        @click="modeFormUpdate(data)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span
                        content="Xóa"
                        v-tippy
                        @click="
                          deleteconduct(data.ConductId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                      <span
                        content="Phản hồi"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-send"></i>
                      </span>
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
    const selectedOption = ref("");
    const isOpensemester = ref("");
    const selectedOptionsemester = ref("");
    const isOpenschoolyear = ref("");
    const selectedOptionschoolyear = ref("");
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
    return {
      toast,
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
    ]),
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
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
    ]),
  },
  mounted() {
    this.getConduct();
    this.getStudentAll();
    this.getsemester();
    this.getschoolyear();
    this.getClassRoom();
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