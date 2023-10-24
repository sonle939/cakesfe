<template>
  <div class="semester">
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
        <HeaderContent text="Quản lý học kỳ" :showform="modeFormInsert" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input type="text" placeholder="Tìm kiếm trong danh sách" />
              </div>
              <div class="checked_data" v-show="trueCheckedsemester">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountsemester }}</p>
                </h3>
                <h3 @click="uncheckItemssemester">Bỏ chọn</h3>
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
                    deleteMultiplesemester(selectedItemssemester);
                    toast();
                  "
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelSemester"></div>
              </div>
              <div class="wrapper__i">
                <div
                  class="filter"
                  @click="getsemester()"
                  style="height: 20px"
                ></div>
              </div>
              <div class="wrapper__i">
                <div class="setting" style="height: 24px"></div>
              </div>
            </div>
          </div>
          <div
            :class="loadingsemester ? 'table-wrapper active' : 'table-wrapper'"
            style="height: 750px; width: 100%"
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
                      v-model="checkAllsemester"
                      @change="toggleAllSelectionsemester"
                    />
                    Mã học kỳ
                  </th>
                  <th style="min-width: 155px">Tên học kỳ</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in semester" :key="data.SemesterId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDSEMESTER(data.SemesterId)"
                    />
                    {{ data.SemesterCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.SemesterName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.SemesterName }}
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
                          deletesemester(data.SemesterId);
                          toast();
                        "
                        ><i class="bx bxs-trash-alt"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="semester.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingsemester" />
          </div>
        </div>
      </div>
    </div>
    <FSemesterVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FSemesterVue from "../components/Form/FSemester.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Semester",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Học kỳ",
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
      "semester",
      "checkAllsemester",
      "checkAmountsemester",
      "trueCheckedsemester",
      "loadingsemester",
      "selectedItemssemester",
      "backgroundWeb",
      "directiondiv",
    ]),
  },
  methods: {
    ...mapActions([
      "getsemester",
      "toggleAllSelectionsemester",
      "uncheckItemssemester",
      "getIDsemester",
      "deletesemester",
      "deleteMultiplesemester",
      "exportExcelSemester",
    ]),
    ...mapMutations([
      "SELECTCHECKEDSEMESTER",
      "SHOW_FORM_SEMESTER",
      "UPDATE_MODE_SEMESTER",
      "ADD_MODE_SEMESTER",
    ]),
    modeFormUpdate(data) {
      try {
        this.UPDATE_MODE_SEMESTER();
        this.getIDsemester(data);
        this.SHOW_FORM_SEMESTER();
      } catch (error) {
        console.log(error);
      }
    },
    modeFormInsert() {
      try {
        this.ADD_MODE_SEMESTER();
        this.SHOW_FORM_SEMESTER();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getsemester();
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FSemesterVue,
    Loading,
    VButton,
  },
};
</script>

<style>
</style>