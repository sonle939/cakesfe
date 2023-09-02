<template>
  <div class="ttimetable">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent
          text="Quản lý lịch học"
          :showform="SHOW_FORM_TIMETABLE"
        />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <SInput type="text" placeholder="testthu" v-model="text" />
          <button class="sbutton">Cập nhật</button>
          <AdminPaginnation />
        </div>
      </div>
    </div>
    <FTimetableVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import SInput from "../components/Input/SInput.vue";
import FTimetableVue from "../components/Form/FTimetable.vue";
import { mapMutations } from "vuex";
export default {
  name: "TimeTable",
  data() {
    return {
      text: "le xuan sonáasasdasd",
    };
  },
  methods: {
    ...mapMutations(["SHOW_FORM_TIMETABLE"]),
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    SInput,
    FTimetableVue,
  },
};
</script>

<style>
</style>