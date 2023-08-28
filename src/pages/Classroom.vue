<template>
  <div class="classroom">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý lớp học" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
            </div>
            <div class="filter_item">
              <Dropdown text="Chọn điều kiện lọc" :options="grade" />
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
          <div class="table-wrapper" style="height: auto">
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
                    Mã lớp học
                  </th>
                  <th style="min-width: 155px">Tên lớp học</th>
                  <th style="min-width: 170px">Khối lớp</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in classroom" :key="data.EmployeeId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="delItemCheck(data.ClassRoomId)"
                    />
                    {{ data.ClassRoomCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.ClassRoomName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.ClassRoomName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.GradeName">
                      {{ data.GradeName }}
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
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Classroom",
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "classroom",
      "checkAll",
      "checkAmount",
      "trueChecked",
      "grade",
    ]),
  },
  methods: {
    ...mapActions(["getClassRoom", "toggleAllSelection", "getGrade"]),
    ...mapMutations(["SELECTCHECKED"]),
    delItemCheck(id) {
      try {
        this.SELECTCHECKED(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    Dropdown,
  },
  mounted() {
    this.getClassRoom();
    this.getGrade();
  },
};
</script>

<style>
</style>