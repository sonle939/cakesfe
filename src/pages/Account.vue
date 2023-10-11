<template>
  <div class="account">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý tài khoản" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách"
                  v-model="searchCode"
                  @keydown.enter="setFilteraccountcode(searchCode)"
                />
              </div>
              <div class="checked_data" v-show="trueChecked">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmount }}</p>
                </h3>
                <h3 @click="uncheckItemsaccount">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="deleteMultipleaccount(selectedItems)"
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
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
                <div class="excel" @click="exportExcelAccount"></div>
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
                      @click="SELECTCHECKED(data.AccountId)"
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
                        @click="modeFormUpdate(data)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span
                        content="Xóa"
                        v-tippy
                        @click="
                          deleteaccount(data.AccountId);
                          toast();
                        "
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
import { createToast } from "mosha-vue-toastify";
import VButton from "../components/Button/VButton.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  data() {
    const toast = () => {
      createToast(
        {
          title: "Tài khoản",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastWarning = () => {
      createToast(
        {
          title: "Tài khoản",
          description: "Không thể xóa bản ghi này vì có dữ liệu liên quan.",
        },
        {
          type: "warning",
          transition: "bounce",
          showIcon: "true",
          timeout: 3000,
        }
      );
    };
    const toastWarningMultip = () => {
      createToast(
        {
          title: "Tài khoản",
          description: "Không thể xóa các bản ghi này vì có dữ liệu liên quan.",
        },
        {
          type: "warning",
          transition: "bounce",
          showIcon: "true",
          timeout: 3000,
        }
      );
    };
    return {
      toast,
      toastWarning,
      toastWarningMultip,
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
      "selectedItems",
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
    // messageDel(data) {
    //   try {
    //     this.deleteaccount(data)
    //       .then((response) => {
    //         if (response && response.status === 200) {
    //           this.toast();
    //           console.log(response.status);
    //         } else {
    //           this.toastWarning();
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // messageDelMultip() {
    //   try {
    //     this.deleteMultipleaccount(this.selectedItems)
    //       .then((response) => {
    //         if (response && response.status === 200) {
    //           this.toast();
    //         } else {
    //           this.toastWarningMultip();
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    ...mapMutations([
      "SET_PAGE",
      "HIDE",
      "SELECTCHECKED",
      "SHOW_FORM_ACCOUNT",
      "SET_FILTER_ROLE",
      "SET_FILTER_ACCOUNTCODE",
      "SET_LOADING_ACCOUNT",
      "UPDATE_MODE_ACCOUNT",
      "ADD_MODE_ACCOUNT",
    ]),
    ...mapActions([
      "setPageNumberaccount",
      "setSizeaccount",
      "getaccount",
      "toggleAllSelection",
      "setFilterrole",
      "setFilteraccountcode",
      "getIDaccount",
      "uncheckItemsaccount",
      "deleteaccount",
      "deleteMultipleaccount",
      "getteacherAll",
      "getStudentAll",
      "exportExcelAccount",
    ]),
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_ACCOUNT();
        this.getIDaccount(data);
        this.SHOW_FORM_ACCOUNT();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_ACCOUNT();
        this.SHOW_FORM_ACCOUNT();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    AdminPaginnation,
    FAccountVue,
    Loading,
    VButton,
  },
  mounted() {
    this.getaccount();
    this.getStudentAll();
    this.getteacherAll();
  },
};
</script>

<style>
</style>