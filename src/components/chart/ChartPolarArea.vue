<template>
  <div class="pie-chart">
    <Pie :options="chartPieOptions" :data="chartPieData" />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

ChartJS.register(Title, Tooltip, Legend, CategoryScale);

export default {
  name: "ChartPolarArea",
  setup() {
    const chartPieOptions = ref({
      responsive: true,
    });
    return {
      chartPieOptions,
    };
  },
  computed: {
    ...mapGetters(["studentAll"]),
    AmountStudent() {
      const amount6a = this.studentAll.filter(
        (item) => item.ClassRoomName === "Lớp 6A"
      ).length;

      const amount6b = this.studentAll.filter(
        (item) => item.ClassRoomName === "Lớp 6B"
      ).length;
      const amount7 = this.studentAll.filter(
        (item) => item.ClassRoomName === "Lớp 7"
      ).length;
      const amount8a = this.studentAll.filter(
        (item) => item.ClassRoomName === "Lớp 8A"
      ).length;
      const amount8b = this.studentAll.filter(
        (item) => item.ClassRoomName === "Lớp 8B"
      ).length;
      const amount9 = this.studentAll.filter(
        (item) => item.ClassRoomName === "Lớp 9"
      ).length;
      return [amount6a, amount6b, amount7, amount8a, amount8b, amount9];
    },
    chartPieData() {
      return {
        labels: ["Lớp 6A", "Lớp 6B", "Lớp 7", "Lớp 8A", "Lớp 8B", "Lớp 9"],
        datasets: [
          {
            label: "Số lượng học sinh của các lớp",
            backgroundColor: [
              "rgba(75, 192, 192, 0.5)", // Đậm hơn một chút
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(100, 200, 10, 0.5)", // Đậm hơn một chút
              "rgba(153, 102, 255, 0.2)",
            ],
            data: this.AmountStudent,
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions(["getStudentAll"]),
  },
  components: { Pie },
  mounted() {
    this.getStudentAll();
  },
};
</script>

<style>
.pie-chart {
  width: 85%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
