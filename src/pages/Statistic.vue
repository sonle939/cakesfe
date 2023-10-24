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
        :class="
          directiondiv
            ? 'page_content page_hidden border_design'
            : 'page_content page_hidden'
        "
      >
        <div class="amount_statistical">
          <div class="amount_item">
            <div class="amount_number">
              <h3>Học sinh</h3>
              <b>{{ studentAll.length }}</b>
            </div>
            <div class="amount_image">
              <img src="../assets/studenticon.png" alt="" />
            </div>
          </div>
          <div class="amount_item">
            <div class="amount_number">
              <h3>Giáo viên</h3>
              <b>{{ teacherAll.length }}</b>
            </div>
            <div class="amount_image">
              <img src="../assets/teachericon.png" alt="" />
            </div>
          </div>
          <div class="amount_item">
            <div class="amount_number">
              <h3>Lớp học</h3>
              <b>{{ classroom.length }}</b>
            </div>
            <div class="amount_image">
              <img src="../assets/classroomicon.png" alt="" />
            </div>
          </div>
          <div class="amount_item">
            <div class="amount_number">
              <h3>Môn học</h3>
              <b>{{ subject.length }}</b>
            </div>
            <div class="amount_image">
              <img src="../assets/subjecticon.png" alt="" />
            </div>
          </div>
        </div>
        <div class="chart_container">
          <div class="chart_item">
            <div class="chart_wrapper">
              <Doughnut :data="data" :options="options" ref="chart" />
              <div
                class="year-switch"
                style="width: 100%; text-align: center; font-weight: 700"
              >
                Tổng số lượng danh hiệu học sinh theo năm học
              </div>
            </div>
            <div class="overlay_chart" @click="toggleOverlay()">
              <i class="bx bx-dots-horizontal-rounded"></i>
            </div>
            <div class="overlay_container" v-if="overlayShow">
              <div
                class="overlay_item"
                v-for="data in schoolyear"
                :key="data.SchoolYearId"
                @click="
                  toggleOverlay();
                  setFilterschoolyearResaultall(data.SchoolYearId);
                "
              >
                {{ data.SchoolYearName }}
              </div>
            </div>
          </div>
          <div class="chart_item">
            <BarMultuipVue />
          </div>
          <div class="chart_item">
            <ChartPolarAreaVue />
            <p>Số lượng học sinh của các lớp</p>
          </div>
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
              loadingstatistic
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
                  <th style="min-width: 185px">Điểm tổng kết</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in pointResaultAll" :key="data.StudentId">
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
                    <tippy :content="data.ĐIEMCANAM">
                      {{ data.ĐIEMCANAM }}
                    </tippy>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="pointResaultAll.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingstatistic" style="margin-top: -350px" />
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
import { format } from "date-fns";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "vue-chartjs";
import BarMultuipVue from "../components/chart/BarMultuip.vue";
import ChartPolarAreaVue from "../components/chart/ChartPolarArea.vue";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Statistic",
  setup() {
    const isOpenclassroom = ref(false);
    const selectedOptionclassroom = ref("Lớp 6A");
    const isOpenschoolyear = ref(false);
    const selectedOptionschoolyear = ref("2021-2022");
    const chart = ref(null); // Define chart as a ref
    const overlayShow = ref(false);
    const data2022 = ref({
      labels: ["HS giỏi", "HS khá", "HS trung bình", "HS yếu"],
      datasets: [
        {
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 1)",
            "dc2626",
          ],
          data: [],
        },
      ],
    });

    const data2023 = ref({
      labels: ["HS giỏi", "HS khá", "HS trung bình", "HS yếu"],
      datasets: [
        {
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 1)",
            "dc2626",
          ],
          data: [],
        },
      ],
    });
    const data = ref(data2022.value);
    const activeYear = ref("2022");
    const options = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    return {
      isOpenclassroom,
      selectedOptionclassroom,
      isOpenschoolyear,
      selectedOptionschoolyear,
      data,
      options,
      activeYear,
      chart,
      overlayShow,
      data2022,
      data2023,
    };
  },
  computed: {
    ...mapGetters([
      "gradeclassroom",
      "classroom",
      "schoolyear",
      "loadingstatistic",
      "backgroundWeb",
      "directiondiv",
      "pointResaultAll",
      "pointResaultSchoolyear",
      "studentAll",
      "subject",
      "teacherAll",
    ]),
    highScoreCounts() {
      const gioiCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM >= 8.0
      ).length;

      const khaCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM >= 6.5 && item.ĐIEMCANAM < 8.0
      ).length;

      const trungbinhCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM >= 5.0 && item.ĐIEMCANAM < 6.5
      ).length;

      const yeuCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM < 5.0
      ).length;

      return [gioiCount, khaCount, trungbinhCount, yeuCount];
    },
    highScoreCounts1() {
      const gioiCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM >= 8.0
      ).length;

      const khaCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM >= 6.5 && item.ĐIEMCANAM < 8.0
      ).length;

      const trungbinhCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM >= 5.0 && item.ĐIEMCANAM < 6.5
      ).length;

      const yeuCount = this.pointResaultSchoolyear.filter(
        (item) => item.ĐIEMCANAM < 5.0
      ).length;

      return [gioiCount, khaCount, trungbinhCount, yeuCount];
    },
    // updatedData() {
    //   const newData = { ...this.data };
    //   newData.datasets[0].data = this.highScoreCounts;
    //   return newData;
    // },
  },
  methods: {
    switchData(year, data) {
      try {
        this.data = data;
        this.activeYear = year;
        if (this.chart) {
          this.chart.render();
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleOverlay() {
      try {
        this.overlayShow = !this.overlayShow;
      } catch (error) {
        console.log(error);
      }
    },
    toggleDropdownclassroom() {
      this.isOpenclassroom = !this.isOpenclassroom;
    },
    selectOptionclassroom(options) {
      this.selectedOptionclassroom = options;
      this.isOpenclassroom = false;
    },
    handleClassroomClick(data) {
      this.selectOptionclassroom(data.ClassRoomName);
      this.setFilterclassroomResaultall(data.ClassRoomId);
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
      this.setFilterschoolyearResaultall(data.SchoolYearId);
    },
    formattedDate(data) {
      try {
        return format(new Date(data), "dd/MM/yyyy");
      } catch (error) {
        console.log(error);
      }
    },
    chartMouted() {
      try {
        this.chart.value.render();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getGradeclassroom",
      "getschoolyear",
      "getStudentAll",
      "getteacherAll",
      "getClassRoom",
      "getsubject",
      //phan trnag
      "setFilterschoolyearResaultall",
      "setFilterclassroomResaultall",
      "getpointresaultAll",
      "getpointresaultSchoolyear",
    ]),
  },
  mounted() {
    this.getClassRoom();
    this.getGradeclassroom();
    this.getteacherAll();
    this.getStudentAll();
    this.getschoolyear();
    this.getsubject();
    this.getpointresaultAll();
    this.getpointresaultSchoolyear();
    this.chartMouted();
  },
  watch: {
    highScoreCounts: {
      handler(newCounts) {
        // Tạo một bản sao của data hiện tại
        const newData = { ...this.data2022 };
        // Cập nhật dữ liệu của dataset trong newData
        newData.datasets[0].data = newCounts;
        // Gán newData cho data
        this.data = newData;
      },
      deep: true, // Đặt deep thành true nếu bạn muốn theo dõi thay đổi sâu hơn trong mảng pointResaultSchoolyear.
    },
    highScoreCounts1: {
      handler(newCounts) {
        // Tạo một bản sao của data hiện tại
        const newData = { ...this.data2023 };
        // Cập nhật dữ liệu của dataset trong newData
        newData.datasets[0].data = newCounts;
        // Gán newData cho data
        this.data = newData;
      },
      deep: true, // Đặt deep thành true nếu bạn muốn theo dõi thay đổi sâu hơn trong mảng pointResaultSchoolyear.
    },
  },

  components: {
    Navbar,
    Sidebar,
    Loading,
    Doughnut,
    BarMultuipVue,
    ChartPolarAreaVue,
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