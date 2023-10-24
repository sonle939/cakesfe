<template>
  <div class="barmultip">
    <div class="dropdown dropdownbar" style="width: 90px; height: 24px">
      <input
        type="text"
        v-model="selectedYear"
        placeholder="Chọn giá trị lọc"
        @click="toggleDropdownschoolyear"
        style="width: 100%"
      />
      <div
        class="overlaylist"
        v-show="isOpenschoolyear"
        style="width: 90px; height: auto; top: 27px"
      >
        <ul ref="list" style="overflow: hidden">
          <li
            v-for="data in schoolyear"
            :key="data.SchoolYearId"
            @click="
              selectOptionschoolyear(data.SchoolYearId, data.SchoolYearName)
            "
          >
            {{ data.SchoolYearName }}
          </li>
        </ul>
      </div>
    </div>
    <Bar id="my-chart-id" :options="chartOptions" :data="computedChartData" />
  </div>
</template>

<script>
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
import { Bar } from "vue-chartjs";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
);
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BarMultuip",
  setup() {
    const selectedYear = ref("2021-2022");
    const isOpenschoolyear = ref(false);
    const chartOptions = ref({
      responsive: true,
      indexAxis: "x",
      chartWidth: "100%",
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    });
    return {
      selectedYear,
      chartOptions,
      isOpenschoolyear,
    };
  },
  computed: {
    ...mapGetters(["pointBarMultip", "schoolyear"]),
    CountGioi() {
      const gioi6a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh giỏi" &&
          item.ClassRoomName === "Lớp 6A"
      ).length;

      const gioi6b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh giỏi" &&
          item.ClassRoomName === "Lớp 6B"
      ).length;
      const gioi7 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh giỏi" && item.ClassRoomName === "Lớp 7"
      ).length;
      const gioi8a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh giỏi" &&
          item.ClassRoomName === "Lớp 8A"
      ).length;
      const gioi8b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh giỏi" &&
          item.ClassRoomName === "Lớp 8B"
      ).length;
      const gioi9 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh giỏi" && item.ClassRoomName === "Lớp 9"
      ).length;
      return [gioi6a, gioi6b, gioi7, gioi8a, gioi8b, gioi9];
    },
    CountKha() {
      const gioi6a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh tiến tiến" &&
          item.ClassRoomName === "Lớp 6A"
      ).length;

      const gioi6b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh tiến tiến" &&
          item.ClassRoomName === "Lớp 6B"
      ).length;
      const gioi7 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh tiến tiến" &&
          item.ClassRoomName === "Lớp 7"
      ).length;
      const gioi8a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh tiến tiến" &&
          item.ClassRoomName === "Lớp 8A"
      ).length;
      const gioi8b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh tiến tiến" &&
          item.ClassRoomName === "Lớp 8B"
      ).length;
      const gioi9 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh tiến tiến" &&
          item.ClassRoomName === "Lớp 9"
      ).length;
      return [gioi6a, gioi6b, gioi7, gioi8a, gioi8b, gioi9];
    },
    CountTrungbinh() {
      const gioi6a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh trung bình" &&
          item.ClassRoomName === "Lớp 6A"
      ).length;

      const gioi6b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh trung bình" &&
          item.ClassRoomName === "Lớp 6B"
      ).length;
      const gioi7 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh trung bình" &&
          item.ClassRoomName === "Lớp 7"
      ).length;
      const gioi8a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh trung bình" &&
          item.ClassRoomName === "Lớp 8A"
      ).length;
      const gioi8b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh trung bình" &&
          item.ClassRoomName === "Lớp 8B"
      ).length;
      const gioi9 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh trung bình" &&
          item.ClassRoomName === "Lớp 9"
      ).length;
      return [gioi6a, gioi6b, gioi7, gioi8a, gioi8b, gioi9];
    },
    CountYeu() {
      const gioi6a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh yếu" && item.ClassRoomName === "Lớp 6A"
      ).length;

      const gioi6b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh yếu" && item.ClassRoomName === "Lớp 6B"
      ).length;
      const gioi7 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh yếu" && item.ClassRoomName === "Lớp 7"
      ).length;
      const gioi8a = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh yếu" && item.ClassRoomName === "Lớp 8A"
      ).length;
      const gioi8b = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh yếu" && item.ClassRoomName === "Lớp 8B"
      ).length;
      const gioi9 = this.pointBarMultip.filter(
        (item) =>
          item.LoaiHocSinh === "Học sinh yếu" && item.ClassRoomName === "Lớp 9"
      ).length;
      return [gioi6a, gioi6b, gioi7, gioi8a, gioi8b, gioi9];
    },
    computedChartData() {
      return {
        labels: ["Lớp 6A", "Lớp 6B", "Lớp 7", "Lớp 8A", "Lớp 8B", "Lớp 9"],
        datasets: [
          {
            label: "Học sinh Giỏi",
            data: this.CountGioi, // Sử dụng CountGioi để cập nhật dữ liệu
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Học sinh Khá",
            data: this.CountKha, // Sử dụng CountKha để cập nhật dữ liệu
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Học sinh Trung bình",
            data: this.CountTrungbinh, // Sử dụng CountTrungbinh để cập nhật dữ liệu
            backgroundColor: "rgba(100, 200, 10, 0.5)",
            borderColor: "rgba(100, 200, 10, 0.5)",
            borderWidth: 1,
          },
          {
            label: "Học sinh Yếu",
            data: this.CountYeu, // Sử dụng CountYeu để cập nhật dữ liệu
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
  },
  methods: {
    toggleDropdownschoolyear() {
      this.isOpenschoolyear = !this.isOpenschoolyear;
    },
    ...mapActions([
      "getpointbarmultip",
      "setFilterbarschoolyear",
      "getschoolyear",
    ]),
    selectOptionschoolyear(id, option) {
      this.selectedYear = option;
      this.setFilterbarschoolyear(id);
      this.isOpenschoolyear = false;
    },
    updateChartData() {
      // Tạo hàm để cập nhật dữ liệu biểu đồ dựa trên selectedYear
      if (this.selectedYear === "2021-2022") {
        this.chartData = {
          labels: ["Lớp 6A", "Lớp 6B", "Lớp 7", "Lớp 8A", "Lớp 8B", "Lớp 9"],
          datasets: [
            {
              label: "Học sinh Giỏi",
              data: this.CountGioi,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Học sinh Khá",
              data: this.CountKha,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Học sinh Trung bình",
              data: this.CountTrungbinh,
              backgroundColor: "#000",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Học sinh Yếu",
              data: this.CountYeu, // Dữ liệu cho học sinh yếu
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
          ],
        };
      } else if (this.selectedYear === "2022-2023") {
        this.chartData = {
          labels: ["Lớp 6A", "Lớp 6B", "Lớp 7", "Lớp 8A", "Lớp 8B", "Lớp 9"],
          datasets: [
            {
              label: "Học sinh Giỏi",
              data: this.CountGioi,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Học sinh Khá",
              data: this.CountKha,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Học sinh Trung bình",
              data: this.CountTrungbinh,
              backgroundColor: "#000",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Học sinh Yếu",
              data: this.CountYeu, // Dữ liệu cho học sinh yếu
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
          ],
        };
      }
    },
  },
  components: {
    Bar,
  },
  mounted() {
    this.getpointbarmultip();
    this.getschoolyear();
  },
  watch: {},
};
</script>

<style scoped>
.barmultip {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>