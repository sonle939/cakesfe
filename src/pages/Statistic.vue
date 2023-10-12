<template>
  <div class="point">
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
        <div class="chart_container">
          <div class="chart_item">bieu do 1</div>
          <div class="chart_item">bieu do 2</div>
          <div class="chart_item">bieu do 3</div>
        </div>
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
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingpoint
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
            style="width: 750px; height: 360px"
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
                    Mã học sinh
                  </th>
                  <th style="min-width: 155px">Tên học sinh</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 155px">Ngày sinh</th>
                  <th style="min-width: 155px">Email</th>
                  <th style="min-width: 185px">Điểm trung bình môn cả năm</th>
                  <th style="min-width: 185px">Hạnh kiểm cả năm</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in point" :key="data.PointId">
                  <td>
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
                    <tippy :content="data.ĐĐGTX3">
                      {{ data.ĐĐGTX3 }}
                    </tippy>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="point.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingpoint" style="margin-top: -350px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import Loading from "../components/Loading.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Statistic",
  setup() {
    const isOpenclassroom = ref(false);
    const selectedOptionclassroom = ref("Lớp 6A");
    const isOpensubject = ref(false);
    const selectedOptionsubject = ref("Toán học");
    const isOpenschoolyear = ref(false);
    const selectedOptionschoolyear = ref("2021-2022");
    return {
      isOpenclassroom,
      selectedOptionclassroom,
      isOpenschoolyear,
      isOpensubject,
      selectedOptionschoolyear,
      selectedOptionsubject,
    };
  },
  computed: {
    ...mapGetters([
      "gradeclassroom",
      "classroom",
      "subject",
      "schoolyear",
      "loadingpoint",
      "point",
      "backgroundWeb",
      "directiondiv",
    ]),
  },
  methods: {
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
    ...mapActions([
      "getGradeclassroom",
      "getClassRoom",
      "getsubject",
      "getschoolyear",
      "getIDpoint",
      "getpoint",
      //phan trnag
      "setFilterschoolyearpoint",
      "setFiltersemesterpoint",
      "setFiltersubjectidpoint",
      "setFilterclassroomidpoint",
    ]),
  },
  mounted() {
    this.getpoint();
    this.getClassRoom();
    this.getGradeclassroom();
    this.getsubject();
    this.getschoolyear();
  },
  components: {
    Navbar,
    Sidebar,
    Loading,
  },
};
</script>

<style scoped>
@import "../style/components/Statistic.css";
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