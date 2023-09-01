<template>
  <div class="classroom">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <HeaderContent text="Quản lý lớp học" :showform="SHOW_FORM_CLASSROOM" />
        <div class="search_table">
          <div class="search_filter">
            <div class="search_list">
              <i class="bx bx-search-alt-2"></i>
              <input type="text" placeholder="Tìm kiếm trong danh sách" />
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
                      v-for="data in gradeclassroom"
                      :key="data.GradeId"
                      @click="selectOption(data.GradeName)"
                    >
                      {{ data.GradeName }}
                    </li>
                  </ul>
                </div>
              </div>
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
                      v-model="checkAllclassroom"
                      @change="toggleAllSelectionclassroom"
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
                      @click="SELECTCHECKEDCLASSROOM(data.ClassRoomId)"
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
    <FClassroom />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import HeaderContent from "@/components/content/Header.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FClassroom from "../components/Form/FClassroom.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Classroom",
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  computed: {
    ...mapGetters([
      "classroom",
      "checkAllclassroom",
      "checkAmountclassroom",
      "trueCheckedclassroom",
      "gradeclassroom",
    ]),
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.isOpen = false;
    },
    ...mapActions([
      "getClassRoom",
      "toggleAllSelectionclassroom",
      "getGradeclassroom",
    ]),
    ...mapMutations(["SELECTCHECKEDCLASSROOM", "SHOW_FORM_CLASSROOM"]),
    delItemCheck(id) {
      try {
        this.SELECTCHECKEDCLASSROOM(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    HeaderContent,
    FClassroom,
  },
  mounted() {
    this.getClassRoom();
    this.getGradeclassroom();
  },
};
</script>

<style scoped>
</style>