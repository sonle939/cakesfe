<template>
  <div class="account">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý tài khoản" />
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
          <div class="table-wrapper mg-bot">
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
                      v-model="checkAll"
                      @change="toggleAllSelection"
                    />
                    Mã tài khoản
                  </th>
                  <th style="min-width: 155px">Mật khẩu</th>
                  <th style="min-width: 80px">Loại tài khoản</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in account" :key="data.AccountId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="delItemCheck(data.AccountId)"
                    />
                    {{ data.AccountCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.PassWord"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.PassWord }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Role">
                      {{ data.Role }}
                    </tippy>
                  </td>
                  <td style="width: 100px">
                    <div class="control_table">
                      <span
                        content="Cập nhật"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span content="Xóa" v-tippy
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <AdminPaginnation
            :showIsHide="showIsHideaccount"
            :totalRecords="totalRecordsaccount"
            :pageNumber="pageNumberaccount"
            :pageSize="pageSizeaccount"
            :totalPages="totalPagesaccount"
            :setPageNumber="setPageNumberaccount"
            :setSize="setSizeaccount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/components/content/Header.vue";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Dropdown from "../components/Dropdown/Dropdown.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  data() {},
  computed: {
    ...mapGetters([
      "account",
      "allAccount",
      "showIsHideaccount",
      "totalRecordsaccount",
      "pageSizeaccount",
      "hasMoreItems",
      "pageNumberaccount",
      "totalPagesaccount",
      "checkAll",
      "checkAmount",
      "trueChecked",
    ]),
  },
  methods: {
    handleOptionSelected(optionValue) {
      console.log("Selected option:", optionValue);
      // Xử lý sự kiện khi một tùy chọn được chọn
    },
    ...mapMutations(["SET_PAGE", "HIDE", "SELECTCHECKED"]),
    ...mapActions([
      "setPageNumberaccount",
      "setSizeaccount",
      "getaccount",
      "toggleAllSelection",
    ]),
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    Dropdown,
    AdminPaginnation,
  },
  mounted() {
    this.getaccount();
  },
};
</script>

<style>
</style>