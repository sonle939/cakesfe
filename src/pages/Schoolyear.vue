<template>
  <div class="schoolyear">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý năm học" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input type="text" placeholder="Tìm kiếm trong danh sách" />
              </div>
              <div class="checked_data" v-show="trueCheckedschoolyear">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountschoolyear }}</p>
                </h3>
                <h3 @click="uncheckItemsschoolyear">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="
                    deleteMultipleschoolyear(selectedItemsschoolyear);
                    toast();
                  "
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel"></div>
              </div>
              <div class="wrapper__i">
                <div
                  class="filter"
                  @click="getschoolyear()"
                  style="height: 20px"
                ></div>
              </div>
              <div class="wrapper__i">
                <div class="setting" style="height: 24px"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingschoolyear ? 'table-wrapper active' : 'table-wrapper'
            "
            style="height: auto"
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
                      v-model="checkAllschoolyear"
                      @change="toggleAllSelectionschoolyear"
                    />
                    Mã năm học
                  </th>
                  <th style="min-width: 155px">Tên năm học</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in schoolyear" :key="data.SchoolYearId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDSCHOOLYEAR(data.SchoolYearId)"
                    />
                    {{ data.SchoolYearCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.SchoolYearName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.SchoolYearName }}
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
                          deleteschoolyear(data.SchoolYearId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="schoolyear.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingschoolyear" style="margin-top: -430px" />
          </div>
        </div>
      </div>
    </div>
    <FSchoolyearVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FSchoolyearVue from "../components/Form/FSchoolyear.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Schoolyear",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Năm học",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    return {
      toast,
    };
  },
  computed: {
    ...mapGetters([
      "schoolyear",
      "checkAllschoolyear",
      "checkAmountschoolyear",
      "trueCheckedschoolyear",
      "loadingschoolyear",
      "selectedItemsschoolyear",
    ]),
  },
  methods: {
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_SCHOOLYEAR();
        this.getIDschoolyear(data);
        this.SHOW_FORM_SCHOOLYEAR();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_SCHOOLYEAR();
        this.SHOW_FORM_SCHOOLYEAR();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "getschoolyear",
      "toggleAllSelectionschoolyear",
      "isshowschoolyear",
      "deleteMultipleschoolyear",
      "deleteschoolyear",
      "getIDschoolyear",
      "uncheckItemsschoolyear",
    ]),
    ...mapMutations([
      "SELECTCHECKEDSCHOOLYEAR",
      "SHOW_FORM_SCHOOLYEAR",
      "UPDATE_MODE_SCHOOLYEAR",
      "ADD_MODE_SCHOOLYEAR",
    ]),
  },
  mounted() {
    this.getschoolyear();
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FSchoolyearVue,
    Loading,
    VButton,
  },
};
</script>

<style>
</style>