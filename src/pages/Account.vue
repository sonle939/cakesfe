<template>
  <div class="account">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý tài khoản" :showform="SHOW_FORM_ACCOUNT" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input
                type="text"
                placeholder="Tìm kiếm trong danh sách"
                v-model="searchCode"
                @keydown.enter="setFilteraccountcode(searchCode)"
              />
            </div>
            <div class="filter_item">
              <div class="dropdown">
                <input
                  type="text"
                  v-model="selectedOption"
                  placeholder="Chọn giá trị lọc"
                  @click="toggleDropdown"
                />
                <i
                  @click="toggleDropdown"
                  :class="
                    isOpen ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'
                  "
                ></i>
                <div class="overlaylist" v-show="isOpen">
                  <ul ref="list">
                    <li
                      v-for="data in selectedRoles"
                      :key="data.id"
                      @click="selectOption(data.name)"
                    >
                      {{ data.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="clearFilterCondition()"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingaccount
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
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
            <div class="noData" v-if="account.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingaccount" />
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
    <FAccountVue />
  </div>
</template>

<script>
import HeaderContent from "@/components/content/Header.vue";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FAccountVue from "../components/Form/FAccount.vue";
import Loading from "../components/Loading.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      selectedRoles: [
        { id: 1, name: "admin" },
        { id: 2, name: "teacher" },
        { id: 3, name: "student" },
      ],
      searchCode: "",
    };
  },
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
      "checkAllaccount",
      "checkAmount",
      "trueChecked",
      "loadingaccount",
    ]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.setFilterrole(options);
      this.isOpen = false;
    },
    clearFilterCondition() {
      try {
        this.getaccount();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE",
      "HIDE",
      "SELECTCHECKED",
      "SHOW_FORM_ACCOUNT",
      "SET_FILTER_ROLE",
      "SET_FILTER_ACCOUNTCODE",
      "SET_LOADING_ACCOUNT",
    ]),
    ...mapActions([
      "setPageNumberaccount",
      "setSizeaccount",
      "getaccount",
      "toggleAllSelection",
      "setFilterrole",
      "setFilteraccountcode",
    ]),
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FAccountVue,
    Loading,
  },
  mounted() {
    this.getaccount();
  },
};
</script>

<style>
</style>