<template>
  <div class="point">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý bảng điểm" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
            </div>
            <div class="filter_item">
              <Dropdown
                text="Chọn điều kiện lọc"
                :options="dropdownOptions"
                @option-selected="handleOptionSelected"
              />
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
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import Dropdown from "../components/Dropdown/Dropdown.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Point",
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    Dropdown,
    AdminPaginnation,
  },
};
</script>

<style>
</style>