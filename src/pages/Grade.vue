<template>
  <div class="grade">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý khối lớp" :showform="SHOW_FORM_GRADE" />
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
            style="height: auto"
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
            <div class="noData" v-if="grade.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadinggrade" style="margin-top: -385px" />
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Grade",
  data() {},
  computed: {
    ...mapGetters([
      "checkAllgrade",
      "checkAmountgrade",
      "trueCheckedgrade",
      "grade",
      "loadinggrade",
    ]),
  },
  methods: {
    ...mapActions(["toggleAllSelectiongrade", "getGrade"]),
    ...mapMutations(["SELECTCHECKEDGRADE", "SHOW_FORM_GRADE"]),
    delItemCheck(id) {
      try {
        this.SELECTCHECKED(id);
      } catch (error) {
        console.log(error);
      }
    },
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
  },
};
</script>

<style>
</style>