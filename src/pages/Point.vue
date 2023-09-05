<template>
  <div class="point">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý bảng điểm" :showform="SHOW_FORM_POINT" />
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
          <AdminPaginnation />
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
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import FPointVue from "../components/Form/FPoint.vue";
import { mapMutations } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Point",
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations(["SHOW_FORM_POINT"]),
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FPointVue,
  },
};
</script>

<style>
</style>