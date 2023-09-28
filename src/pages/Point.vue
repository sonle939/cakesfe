<template>
  <div class="point">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý bảng điểm" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="dropdown_wrapper">
              <div class="dropdown_item" style="margin-left: 12px">
                <p>Lớp học</p>
                <div class="dropdown" style="width: 130px">
                  <input
                    type="text"
                    v-model="selectedOptionclassroom"
                    placeholder="Chọn lớp học"
                    @click="toggleDropdownclassroom"
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
                    style="width: 130px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in classroom"
                        :key="data.ClassRoomId"
                        @click="handleClassroomClick(data)"
                      >
                        {{ data.ClassRoomName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="dropdown_item" style="margin-left: 12px">
                <p>Môn học</p>
                <div class="dropdown" style="width: 130px">
                  <input
                    type="text"
                    v-model="selectedOptionsubject"
                    placeholder="Chọn giá trị"
                    @click="toggleDropdownsubject"
                  />
                  <i
                    @click="toggleDropdownsubject"
                    :class="
                      isOpensubject
                        ? 'bx bx-chevron-down active'
                        : 'bx bx-chevron-down'
                    "
                  ></i>
                  <div
                    class="overlaylist"
                    v-show="isOpensubject"
                    style="width: 130px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in subject"
                        :key="data.SubjectId"
                        @click="handleSubjectClick(data)"
                      >
                        {{ data.SubjectName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="dropdown_item" style="margin-left: 12px">
                <p>Học kì</p>
                <div class="dropdown" style="width: 130px">
                  <input
                    type="text"
                    v-model="selectedOptionsemester"
                    placeholder="Chọn giá trị"
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
                    style="width: 130px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in filteredSemester"
                        :key="data.SemesterId"
                        @click="handleSemesterClick(data)"
                      >
                        {{ data.SemesterName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="dropdown_item" style="margin-left: 12px">
                <p>Năm học</p>
                <div class="dropdown" style="width: 130px">
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
                    style="width: 130px"
                  >
                    <ul ref="list">
                      <li
                        v-for="data in schoolyear"
                        :key="data.SchoolYearId"
                        @click="handleschoolyearClick(data)"
                      >
                        {{ data.SchoolYearName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="checked_data" v-show="trueCheckedpoint">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountpoint }}</p>
                </h3>
                <h3 @click="uncheckItemspoint">Bỏ chọn</h3>
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
                    deleteMultiplepoint(selectedItemspoint);
                    toast();
                  "
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel" @click="exportExcel"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingpoint
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
            style="width: 750px"
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
                      v-model="checkAllpoint"
                      @change="toggleAllSelectionpoint"
                    />
                    Mã học sinh
                  </th>
                  <th style="min-width: 155px">Tên học sinh</th>
                  <th style="min-width: 170px">Ngày sinh</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 155px">ĐĐGTX1</th>
                  <th style="min-width: 155px">ĐĐGTX2</th>
                  <th style="min-width: 155px">ĐĐGTX3</th>
                  <th style="min-width: 155px">ĐĐGTX4</th>
                  <th style="min-width: 155px">ĐĐGGK</th>
                  <th style="min-width: 155px">ĐĐGCK</th>
                  <th style="min-width: 155px">ĐTBMK</th>
                  <th style="min-width: 200px">Nhận xét</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in point" :key="data.PointId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDPOINT(data.PointId)"
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
                    <tippy :content="data.ĐĐGTX1">
                      {{ data.ĐĐGTX1 }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ĐĐGTX2">
                      {{ data.ĐĐGTX2 }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ĐĐGTX3">
                      {{ data.ĐĐGTX3 }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ĐĐGTX4">
                      {{ data.ĐĐGTX4 }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ĐĐGGK">
                      {{ data.ĐĐGGK }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ĐĐGCK">
                      {{ data.ĐĐGCK }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.ĐTBMK">
                      {{ data.ĐTBMK }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Comment">
                      {{ data.Comment }}
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
                          deletepoint(data.PointId);
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
            <div class="noData" v-if="point.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingpoint" />
          </div>
          <AdminPaginnation
            :showIsHide="showIsHidepoint"
            :totalRecords="totalRecordspoint"
            :pageNumber="pageNumberpoint"
            :pageSize="pageSizespoint"
            :totalPages="totalPagespoint"
            :setPageNumber="setPageNumberpoint"
            :setSize="setSizepoint"
            :HIDE="HIDEPOINT"
          />
        </div>
      </div>
    </div>
    <FPointVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import FPointVue from "../components/Form/FPoint.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ref } from "vue";
import Loading from "../components/Loading.vue";
import { createToast } from "mosha-vue-toastify";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import VButton from "../components/Button/VButton.vue";
import { format } from "date-fns";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Point",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Thời khóa biểu",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const isOpenclassroom = ref(false);
    const selectedOptionclassroom = ref("Lớp 6A");
    const isOpensubject = ref(false);
    const selectedOptionsubject = ref("Toán học");
    const isOpensemester = ref(false);
    const selectedOptionsemester = ref("Học kì 1");
    const isOpenschoolyear = ref(false);
    const selectedOptionschoolyear = ref("2021-2022");
    return {
      toast,
      isOpenclassroom,
      selectedOptionclassroom,
      isOpenschoolyear,
      isOpensemester,
      isOpensubject,
      selectedOptionschoolyear,
      selectedOptionsemester,
      selectedOptionsubject,
    };
  },
  computed: {
    ...mapGetters([
      "gradeclassroom",
      "classroom",
      "subject",
      "semester",
      "schoolyear",
      "selectedItemspoint",
      "loadingpoint",
      "showIsHidepoint",
      "checkAllpoint",
      "checkAmountpoint",
      "trueCheckedpoint",
      "totalRecordspoint",
      "pageSizespoint",
      "pageNumberpoint",
      "totalPagespoint",
      "point",
      "semesterId",
    ]),
    filteredSemester() {
      return this.semester.filter((data) => data.SemesterName !== "Cả năm");
    },
  },
  methods: {
    formattedDate(data) {
      try {
        return format(new Date(data), "dd/MM/yyyy");
      } catch (error) {
        console.log(error);
      }
    },
    // calculateYearlyAverage(studentId) {
    //   // Initialize variables to store ĐTBMK values for both semesters
    //   let ĐTBMK1 = 0;
    //   let ĐTBMK2 = 0;

    //   // Loop through the points and sum the ĐTBMK values for both semesters
    //   for (const point of this.point) {
    //     if (point.StudentId === studentId) {
    //       if (point.SemesterName === "Học kì 1") {
    //         ĐTBMK1 = parseFloat(point.ĐTBMK);
    //         console.log("diem kì1", ĐTBMK1);
    //       } else if (point.SemesterName === "Học kì 2") {
    //         ĐTBMK2 = parseFloat(point.ĐTBMK);
    //         console.log("diem kì2", ĐTBMK2);
    //       }
    //     }
    //   }

    //   // Calculate the yearly average using the formula
    //   const yearlyAverage = (ĐTBMK1 + 2 * ĐTBMK2) / 3;
    //   console.log(yearlyAverage);

    //   // Round the yearly average (if needed)
    //   const roundedAverage = yearlyAverage.toFixed(2);

    //   return roundedAverage; // Return the yearly average
    // },
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    selectOptionclassroom(options) {
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    handleClassroomClick(data) {
      this.selectOptionclassroom(data.ClassRoomName);
      this.setFilterclassroomidpoint(data.ClassRoomId);
    },
    toggleDropdownsubject() {
      this.isOpensubject = !this.isOpensubject;
    },
    selectOptionsubject(options) {
      this.selectedOptionsubject = options;
      this.isOpensubject = false;
    },
    handleSubjectClick(data) {
      this.selectOptionsubject(data.SubjectName);
      this.setFiltersubjectidpoint(data.SubjectId);
    },
    toggleDropdownsemester() {
      this.isOpensemester = !this.isOpensemester;
    },
    selectOptionsemester(options) {
      this.selectedOptionsemester = options;
      this.isOpensemester = false;
    },
    handleSemesterClick(data) {
      this.selectOptionsemester(data.SemesterName);
      this.setFiltersemesterpoint(data.SemesterId);
    },
    toggleDropdownschoolyear() {
      this.isOpenschoolyear = !this.isOpenschoolyear;
    },
    selectOptionschoolyear(options) {
      this.selectedOptionschoolyear = options;
      this.isOpenschoolyear = false;
    },
    handleschoolyearClick(data) {
      this.selectOptionschoolyear(data.SchoolYearName);
      this.setFilterschoolyearpoint(data.SchoolYearId);
    },
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_POINT();
        this.getIDpoint(data);
        this.SHOW_FORM_POINT();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_POINT();
        this.SHOW_FORM_POINT();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getGradeclassroom",
      "getClassRoom",
      "getsubject",
      "getsemester",
      "getschoolyear",
      "getIDpoint",
      "getpoint",
      "deletepoint",
      "deleteMultiplepoint",
      "toggleAllSelectionpoint",
      "uncheckItemspoint",
      "setPageNumberpoint",
      "setSizepoint",
      //phan trnag
      "setFilterschoolyearpoint",
      "setFiltersemesterpoint",
      "setFiltersubjectidpoint",
      "setFilterclassroomidpoint",
      "exportExcel",
    ]),
    ...mapMutations([
      "SHOW_FORM_POINT",
      "UPDATE_MODE_POINT",
      "ADD_MODE_POINT",
      "HIDEPOINT",
      "SELECTCHECKEDPOINT",
    ]),
  },
  mounted() {
    this.getpoint();
    this.getClassRoom();
    this.getGradeclassroom();
    this.getsubject();
    this.getschoolyear();
    this.getsemester();
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FPointVue,
    Loading,
    AdminPaginnation,
    VButton,
  },
};
</script>

<style scoped>
.score {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.score_left b {
  margin-left: 5px;
}
.score_right {
  display: flex;
  align-items: center;
}
.score_right p {
  margin-right: 10px;
}
</style>