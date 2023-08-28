<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="adminpagination">
    <div class="pagination_left">
      <p>
        Tổng số: <b>{{ totalRecords }}</b> bản ghi {{ text }}
      </p>
    </div>
    <div class="pagination_right">
      <p>Số bản ghi/trang:</p>
      <div class="amount_cb">
        <input
          type="text"
          :disabled="showIsHide"
          :v-model="pageSize"
          @focus="HIDE"
          style="color: black !important"
        />
        <i
          :class="
            showIsHide ? 'bx bx-chevron-down active' : 'bx bx-chevron-down'
          "
        ></i>
        <ul class="oveylay_amount" v-show="showIsHide">
          <li @click="setSize(15)">15</li>
          <li @click="setSize(20)">20</li>
          <li @click="setSize(30)">30</li>
          <li @click="setSize(50)">50</li>
        </ul>
      </div>
      <div class="page_amount">
        <span style="font-weight: bold">{{ pageNumber }}</span>
        <span>-</span>
        <span style="font-weight: bold">{{ totalPages }}</span>
        <span>bản ghi</span>
      </div>
      <div class="page_control">
        <button
          @click="
            // eslint-disable-next-line vue/no-mutating-props
            setPageNumber(pageNumber <= 1 ? (pageNumber = 1) : pageNumber - 1)
          "
        >
          <i
            :class="
              pageNumber <= 1
                ? 'bx bxs-chevron-left color_paging'
                : 'bx bxs-chevron-left'
            "
          ></i>
        </button>
        <button
          @click="
            setPageNumber(
              pageNumber == totalPages
                ? // eslint-disable-next-line vue/no-mutating-props
                  (pageNumber = totalPages)
                : pageNumber + 1
            )
          "
        >
          <i
            :class="
              pageNumber == totalPages
                ? 'bx bxs-chevron-right color_paging'
                : 'bx bxs-chevron-right'
            "
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AdminPaginnation",
  data() {
    return {};
  },
  props: {
    totalRecords: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    pageNumber: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    showIsHide: {
      type: Boolean,
      required: true,
    },
    setPageNumber: {
      type: Function,
      required: true,
    },
    setSize: {
      type: Function,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["HIDE"]),
  },
  components: {},
};
</script>

<style scoped>
@import "../../style/components/adminPaginnatiion.css";
.amount_cb {
  height: 36px;
  width: 75px;
  border-radius: 4px;
  background-color: var(--bg_content);
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px 0 12px;
  margin-right: 16px;
  position: relative;
  cursor: pointer;
}
.amount_cb i {
  font-size: 24px;
  transition: 0.4s linear;
  color: #212121;
}
.amount_cb i.active {
  transition: 0.4s ease-in;
  transform: rotate(180deg);
}
.oveylay_amount {
  position: absolute;
  top: -163px;
  left: 0;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  width: 75px;
  height: auto;
  padding: 8px 7px;
  animation: aniHeightOver 0.5s linear;
}
.oveylay_amount li {
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #212121;
}
.oveylay_amount li:hover {
  background-color: var(--btn_hover);
  color: #fff;
}
.amount_cb input {
  height: 16px;
  width: 17px;
  border: none;
  color: #212121;
  font-size: 14px;
  font-weight: 400;
}
</style>