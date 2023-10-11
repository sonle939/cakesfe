<template>
  <div class="feedback">
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="page_content">
        <h3
          style="
            color: #1f1f20;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
          "
        >
          Quản lý phản hồi
        </h3>
        <div class="search_table">
          <div class="search_filter">
            <div class="search_check">
              <div class="search_list">
                <i class="bx bx-search-alt-2"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách"
                  v-model="searchText"
                  @keydown.enter="filterfeedbackstudentName(searchText)"
                />
              </div>
              <div class="checked_data" v-show="trueCheckedfeedback">
                <h3>
                  Đã chọn tất cả
                  <p>{{ checkAmountfeedback }}</p>
                </h3>
                <h3 @click="uncheckItemsfeedback">Bỏ chọn</h3>
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
                    deleteMultiplefeedback(selectedItemsfeedback);
                    toast();
                  "
                />
                <VButtonicon oneIcon="bx bx-dots-horizontal-rounded" />
              </div>
            </div>
            <div class="filter_item">
              <div class="dropdown">
                <input
                  type="text"
                  v-model="selectedOption"
                  placeholder="Đang chờ xử lý"
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
                      v-for="data in filteredHandle"
                      :key="data.id"
                      @click="selectOption(data.name)"
                    >
                      {{ data.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrapper__i">
                <div class="excel" @click="exportExcelFeedback"></div>
              </div>
              <div class="wrapper__i">
                <div class="filter" @click="clearFilterCondition"></div>
              </div>
              <div class="wrapper__i">
                <div class="setting"></div>
              </div>
            </div>
          </div>
          <div
            :class="
              loadingfeedback
                ? 'table-wrapper active mg-bot'
                : 'table-wrapper mg-bot'
            "
            style="width: 750px"
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
                      v-model="checkAllfeedback"
                      @change="toggleAllSelectionfeedback"
                    />
                    Mã phản hồi
                  </th>
                  <th style="min-width: 155px">Tên người phản hồi</th>
                  <th style="min-width: 170px">Ngày sinh</th>
                  <th style="min-width: 155px">Email</th>
                  <th style="min-width: 170px">Giới tính</th>
                  <th style="min-width: 155px">Chủ đề phản hồi</th>
                  <th style="min-width: 155px">Nội dung phản hồi</th>
                  <th style="min-width: 100px">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in feedback" :key="data.FeedbackId">
                  <td>
                    <input
                      type="checkbox"
                      class="option-input"
                      v-model="data.isChecked"
                      @click="SELECTCHECKEDFEEDBACK(data.FeedbackId)"
                    />
                    {{ data.FeedbackCode }}
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="data.StudentName"
                      v-tippy="{ interactive: true }"
                    >
                      {{ data.StudentName }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="formattedDate(data.DateOfBirth)">
                      {{ formattedDate(data.DateOfBirth) }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Email">
                      {{ data.Email }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy
                      :content="
                        data.Gender == 1
                          ? 'Nam'
                          : data.Gender == 2
                          ? 'Khác'
                          : 'Nữ'
                      "
                    >
                      {{
                        data.Gender == 1
                          ? "Nam"
                          : data.Gender == 2
                          ? "Khác"
                          : "Nữ"
                      }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Subject">
                      {{ data.Subject }}
                    </tippy>
                  </td>
                  <td class="text_left">
                    <tippy :content="data.Content">
                      {{ data.Content }}
                    </tippy>
                  </td>
                  <td style="width: 100px">
                    <div class="control_table">
                      <span
                        v-if="data.Handle === 'Đang chờ xử lý'"
                        content="Xác nhận xử lý"
                        @click="onSubmitUpdate(data.FeedbackId)"
                        v-tippy="{ arrow: true, arrowType: 'round' }"
                      >
                        <i class="bx bx-check-circle"></i>
                      </span>
                      <span
                        content="Hủy Yêu cầu"
                        v-tippy
                        @click="
                          deletefeedback(data.FeedbackId);
                          toast();
                        "
                        ><i class="bx bxs-message-rounded-x"></i
                      ></span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="noData" v-if="feedback.length == 0">
              <img src="../assets/nodata.svg" alt="" />
              <h3>Không có dữ liệu</h3>
            </div>
            <Loading v-show="loadingfeedback" />
          </div>
          <AdminPaginnation
            :HIDE="HIDEFEEDBACK"
            :showIsHide="showIsHidefeedback"
            :totalRecords="totalRecordsfeedback"
            :pageNumber="pageNumberfeedback"
            :pageSize="pageSizefeedback"
            :totalPages="totalPagesfeedback"
            :setPageNumber="setPageNumberfeedback"
            :setSize="setSizefeedback"
          />
        </div>
      </div>
    </div>
    <FTeacher />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import AdminPaginnation from "../components/Paginnation/AdminPaginnation.vue";
import { format } from "date-fns";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FTeacher from "../components/Form/FTeacher.vue";
import Loading from "../components/Loading.vue";
import VButton from "../components/Button/VButton.vue";
import { createToast } from "mosha-vue-toastify";
import { reactive, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Feedback",
  setup() {
    const toast = () => {
      createToast(
        {
          title: "Phản hồi",
          description: "Xóa bỏ thành công",
        },
        {
          type: "danger",
          timeout: 2000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const toastUpdate = () => {
      createToast(
        {
          title: "Phản hồi",
          description: "Xử lý yêu cầu hoàn tất",
        },
        {
          type: "success",
          timeout: 2000,
          transition: "bounce",
          showIcon: "true",
        }
      );
    };
    const selectedOption = ref("");
    const searchText = ref("");
    const isOpen = ref(false);
    const dataHandle = ref([
      { id: 1, name: "Đang chờ xử lý" },
      { id: 2, name: "Đã được xử lý" },
    ]);
    const formData = reactive({
      InformId: "",
      Title: "Yêu cầu của bạn đã được xử lý",
      Message: "",
      Student: "",
    });
    return {
      toast,
      toastUpdate,
      isOpen,
      selectedOption,
      searchText,
      dataHandle,
      formData,
    };
  },
  computed: {
    ...mapGetters([
      "feedback",
      "showIsHidefeedback",
      "totalRecordsfeedback",
      "pageSizefeedback",
      "pageNumberfeedback",
      "totalPagesfeedback",
      "checkAllfeedback",
      "checkAmountfeedback",
      "trueCheckedfeedback",
      "loadingfeedback",
      "selectedItemsfeedback",
      "getByIdFeedback",
    ]),
    filteredHandle() {
      const keyword = this.selectedOption.toLowerCase();
      return this.dataHandle.filter((data) =>
        data.name.toLowerCase().includes(keyword)
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(options) {
      this.selectedOption = options;
      this.filterfeedbackhandle(options);
      this.isOpen = false;
    },
    clearFilterCondition() {
      try {
        this.getFeedback();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      "SET_PAGE_FEEDBACK",
      "SELECTCHECKEDFEEDBACK",
      "HIDEFEEDBACK",
    ]),
    ...mapActions([
      "setPageNumberfeedback",
      "setSizefeedback",
      "getFeedback",
      "toggleAllSelectionfeedback",
      "filterfeedbackhandle",
      "filterfeedbackstudentName",
      "uncheckItemsfeedback",
      "deleteMultiplefeedback",
      "deletefeedback",
      "getIDfeedback",
      "exportExcelFeedback",
      "updateItemfeedback",
      "addinform",
    ]),
    formattedDate(data) {
      try {
        return format(new Date(data), "dd/MM/yyyy");
      } catch (error) {
        console.log(error);
      }
    },
    onSubmitUpdate(data) {
      try {
        const itemToUpdate = this.feedback.find(
          (item) => item.FeedbackId === data
        );
        if (itemToUpdate) {
          // Cập nhật dữ liệu cho phần tử cụ thể
          itemToUpdate.IsChecked = false;
          itemToUpdate.Handle = "Đã được xử lý";

          // Gọi hàm cập nhật phần tử
          this.updateItemfeedback(itemToUpdate);
          this.addinform({
            InformId: uuidv4(),
            Title: this.formData.Title,
            Message: itemToUpdate.Subject,
            Isread: false,
            StudentId: itemToUpdate.StudentId,
          });
          console.log(itemToUpdate.StudentId);
          // Hiển thị thông báo hoặc thực hiện các thao tác khác tùy ý
          this.toastUpdate();
        } else {
          // Trường hợp không tìm thấy phần tử, xử lý lỗi hoặc thông báo lỗi
          console.error("Không tìm thấy phần tử với ID: ", data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Navbar,
    Sidebar,
    AdminPaginnation,
    FTeacher,
    Loading,
    VButton,
  },
  mounted() {
    this.getFeedback();
  },
};
</script>

<style>
</style>