<template>
  <div class="subject">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý môn học" :showform="SHOW_FORM_SUBJECT" />
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
                  @click="getsubject()"
                  style="height: 20px"
                ></div>
              </div>
              <div class="wrapper__i">
                <div class="setting" style="height: 24px"></div>
              </div>
            </div>
          </div>
          <div
            :class="loadingsubject ? 'table-wrapper active' : 'table-wrapper'"
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
                      v-model="checkAllsubject"
                      @change="toggleAllSelectionsubject"
                    />
                    Mã môn học
                  </th>
                  <th style="min-width: 155px">Tên môn học</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in subject" :key="data.SubjectId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDSUBJECT(data.SubjectId)"
                    />
                    {{ data.SubjectCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.SubjectName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.SubjectName }}
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
            <div class="noData" v-if="subject.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingsubject" style="margin-top: -300px" />
          </div>
        </div>
      </div>
    </div>
    <FSubjectVue />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FSubjectVue from "../components/Form/FSubject.vue";
import Loading from "../components/Loading.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Subject",
  data() {},
  computed: {
    ...mapGetters([
      "subject",
      "checkAllsubject",
      "checkAmountsubject",
      "trueCheckedsubject",
      "loadingsubject",
    ]),
  },
  methods: {
    ...mapActions(["getsubject", "toggleAllSelectionsubject"]),
    ...mapMutations(["SELECTCHECKEDSUBJECT", "SHOW_FORM_SUBJECT"]),
    delItemCheck(id) {
      try {
        this.SELECTCHECKEDSUBJECT(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getsubject();
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FSubjectVue,
    Loading,
  },
};
</script>

<style>
</style>