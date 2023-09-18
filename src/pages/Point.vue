<template>
  <div class="point">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý bảng điểm" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
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
            <div class="dropdown_wrapper">
              <div class="dropdown_item">
                <p>Khối lớp</p>
                <div class="dropdown" style="width: 130px">
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
                  <div class="overlaylist" v-show="isOpen" style="width: 130px">
                    <ul ref="list">
                      <li
                        v-for="data in gradeclassroom"
                        :key="data.GradeId"
                        @click="selectOption(data.GradeId, data.GradeName)"
                      >
                        {{ data.GradeName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                        v-for="data in filteredGradeClass"
                        :key="data.ClassRoomId"
                        @click="selectOptionclassroom(data.ClassRoomName)"
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
                        @click="
                          selectOptionsubject(data.SubjectId, data.SubjectName)
                        "
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
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel"></div>
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
                <tr v-for="data in pointAll" :key="data.PointId">
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="pointAll.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingpoint" />
          </div>
          <div class="score">
            <div class="score_left">
              <p>
                Sổ điểm năm học: <b>{{ selectedOptionschoolyear }}</b>
              </p>
            </div>
            <div class="score_right">
              <p>Chọn năm học:</p>
              <div class="dropdown" style="width: 130px">
                <input
                  type="text"
                  v-model="selectedOptionschoolyear"
                  placeholder="Chọn giá trị"
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
                  style="width: 130px; top: -100px; height: 90px"
                >
                  <ul ref="list" style="overflow: hidden">
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
          </div>
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
import { reactive, ref } from "vue";
import { format } from "date-fns";
import Loading from "../components/Loading.vue";
import { createToast } from "mosha-vue-toastify";
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
    const isOpen = ref(false);
    const selectedOption = ref("");
    const isOpenclassroom = ref(false);
    const selectedOptionclassroom = ref("");
    const isOpensubject = ref(false);
    const selectedOptionsubject = ref("");
    const isOpensemester = ref(false);
    const selectedOptionsemester = ref("");
    const isOpenschoolyear = ref(false);
    const selectedOptionschoolyear = ref("");
    const idData = reactive({
      ClassRoomId: "",
      GradeId: "",
    });
    return {
      toast,
      idData,
      isOpen,
      selectedOption,
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
    filteredGradeClass() {
      if (this.selectedOption) {
        const keyword = this.selectedOption.toLowerCase();
        return this.classroom.filter((data) =>
          data.GradeName.toLowerCase().includes(keyword)
        );
      } else {
        // Trả về toàn bộ danh sách sinh viên nếu selectedOptionstudent là null
        return this.classroom;
      }
    },
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
      "pointAll",
    ]),
  },
  methods: {
    formattedDate(data) {
      return format(new Date(data), "dd/MM/yyyy");
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(id, options) {
      this.idData.GradeId = id;
      this.selectedOption = options;
      this.isOpen = false;
    },
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    selectOptionclassroom(options) {
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    toggleDropdownsubject() {
      this.isOpensubject = !this.isOpensubject;
    },
    selectOptionsubject(id, options) {
      this.selectedOptionsubject = options;
      this.isOpensubject = false;
    },
    toggleDropdownsemester() {
      this.isOpensemester = !this.isOpensemester;
    },
    selectOptionsemester(id, options) {
      this.selectedOptionsemester = options;
      this.isOpensemester = false;
    },
    toggleDropdownschoolyear() {
      this.isOpenschoolyear = !this.isOpenschoolyear;
    },
    selectOptionschoolyear(id, options) {
      this.selectedOptionschoolyear = options;
      this.isOpenschoolyear = false;
    },
    showValueDrop() {
      if (this.gradeclassroom.length > 0) {
        this.selectedOption =
          this.gradeclassroom[this.gradeclassroom.length - 1].GradeName;
      }
    },
    showValueDropSubject() {
      if (this.subject.length > 0) {
        this.selectedOptionsubject =
          this.subject[this.subject.length - 1].SubjectName;
      }
    },
    showValueDropSemester() {
      if (this.semester.length > 0) {
        this.selectedOptionsemester =
          this.semester[this.semester.length - 1].SemesterName;
      }
    },
    showValueDropSchoolyear() {
      if (this.schoolyear.length > 0) {
        this.selectedOptionschoolyear =
          this.schoolyear[this.schoolyear.length - 1].SchoolYearName;
      }
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
      "getAllpoint",
      "getIDpoint",
      "deletepoint",
      "deleteMultiplepoint",
      "toggleAllSelectionpoint",
      "uncheckItemspoint",
    ]),
    ...mapMutations([
      "SHOW_FORM_POINT",
      "UPDATE_MODE_POINT",
      "ADD_MODE_POINT",
      "HIDEPOINT",
      "SELECTCHECKEDPOINT",
    ]),
  },
  beforeUpdate() {
    this.showValueDropSemester();
    this.showValueDropSchoolyear();
    this.showValueDropSubject();
    this.showValueDrop();
  },
  mounted() {
    //this.getAllpoint();
    this.getClassRoom();
    this.getGradeclassroom();
    this.getsubject();
    this.getschoolyear();
    this.getsemester();
  },
  watch: {
    selectedOptionsemester(newValue) {
      if (newValue === "") {
        this.selectedOptionsemester =
          this.semester[this.semester.length - 1].SemesterName;
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FPointVue,
    Loading,
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