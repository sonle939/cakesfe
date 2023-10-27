<template>
  <div class="grade">
    <Navbar />
    <div
      :class="[
        backgroundWeb ? 'background-black d-flex' : 'background-white d-flex',
        directiondiv && 'navigate_div',
      ]"
    >
      <Sidebar />
      <div
        :class="directiondiv ? 'page_content border_design' : 'page_content '"
      >
        <HeaderContent text="Quản lý khối lớp" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input type="text" placeholder="Tìm kiếm trong danh sách" />
              </div>
              <div class="checked_data" v-show="trueCheckedgrade">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountgrade }}</p>
                </h3>
                <h3 @click="uncheckItemsgrade">Bỏ chọn</h3>
                <VButton
                  text="Xác nhận thông tin"
                  class="btn_info"
                  leftIcon="bx bx-check-circle remove_icon"
                />
                <VButton
                  text="Xóa"
                  leftIcon="fa fa-times remove_icon"
                  class="remove_btn"
                  @click="deleteOrAuthenMultip()"
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>

            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelGrade"></div>
              </div>
              <div class="wrapper__i">
                <div
                  class="filter"
                  @click="getGrade()"
                  style="height: 20px"
                ></div>
              </div>
              <div class="wrapper__i">
                <div class="setting" style="height: 24px"></div>
              </div>
            </div>
          </div>
          <div
            :class="loadinggrade ? 'table-wrapper active' : 'table-wrapper'"
            style="height: 750px; width: 100%"
          >
            <table style="width: 100%; height: auto">
              <thead>
                <tr>
                  <th
                    style="
                      min-width: 170px;
                      border-top: 0px solid;
                      border-left: 0px solid;
                    "
                  >
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="checkAllgrade"
                      @change="toggleAllSelectiongrade"
                    />
                    Mã khối lớp
                  </th>
                  <th style="min-width: 155px">Tên khối lớp</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in grade" :key="data.GradeId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDGRADE(data.GradeId)"
                    />
                    {{ data.GradeCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.GradeName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.GradeName }}
                    </tippy>
                  </td>
                  <td>
                    <div class="control_table">
                      <span
                        content="Cập nhật"
                        @click="modeFormUpdate(data)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bxs-pencil"></i>
                      </span>
                      <span content="Xóa" v-tippy @click="messageDel(data)"
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="grade.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadinggrade" />
          </div>
        </div>
      </div>
    </div>
    <FGrade />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import FGrade from "../components/Form/FGrade.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Grade",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Khối lớp",
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
          title: "Khối lớp",
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
          title: "Khối lớp",
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
    };
  },
  computed: {
    ...mapGetters([
      "checkAllgrade",
      "checkAmountgrade",
      "trueCheckedgrade",
      "grade",
      "loadinggrade",
      "selectedItemsgrade",
      "backgroundWeb",
      "directiondiv",
      "statusCodeKL",
    ]),
  },
  methods: {
    async messageDel(data) {
      try {
        await this.deletegrade(data.GradeId);
        if (this.statusCodeKL === 200) {
          this.toast();
          console.log(this.statusCodeKL.status);
        } else if (this.statusCodeKL === 280) {
          this.toastWarning();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteOrAuthenMultip() {
      try {
        await this.deleteMultiplegrade(this.selectedItemsgrade);
        if (this.statusCode === 200) {
          this.toast();
          console.log(this.statusCode.status);
        } else if (this.statusCode === 280) {
          this.toastWarning();
        }
      } catch (error) {
        console.log(error);
      }
    },
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_GRADE();
        this.getIDgrade(data);
        this.SHOW_FORM_GRADE();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_GRADE();
        this.SHOW_FORM_GRADE();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([
      "toggleAllSelectiongrade",
      "getGrade",
      "getIDgrade",
      "uncheckItemsgrade",
      "deleteMultiplegrade",
      "deletegrade",
      "exportExcelGrade",
    ]),
    ...mapMutations([
      "SELECTCHECKEDGRADE",
      "SHOW_FORM_GRADE",
      "ADD_MODE_GRADE",
      "UPDATE_MODE_GRADE",
    ]),
  },
  mounted() {
    this.getGrade();
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FGrade,
    Loading,
    VButton,
  },
};
</script>

<style>
</style>