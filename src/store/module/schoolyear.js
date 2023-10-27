import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const schoolyearmodule = {
    state: {
        schoolyear: [],
        getByIdschoolyear: [],
        loadingschoolyear: false,
        checkAllschoolyear: false,
        isshowschoolyear: false,
        selectedItemsschoolyear: [],
        formModeschoolyear: false,
        schoolyearmaxcode: null,
        statusCodeNH: 0
    },
    getters: {
        getByIdschoolyear: state => state.getByIdschoolyear,
        schoolyear: state => state.schoolyear,
        isshowschoolyear: state => state.isshowschoolyear,
        loadingschoolyear: state => state.loadingschoolyear,
        checkAllschoolyear: state => state.checkAllschoolyear,
        isCheckedschoolyear: state => state.schoolyear.isChecked,
        formModeschoolyear: state => state.formModeschoolyear,
        schoolyearmaxcode: state => state.schoolyearmaxcode,
        //dùng để đển số checkbox đã được chọn 
        checkAmountschoolyear: state => state.schoolyear.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedschoolyear: state => state.schoolyear.some((item) => item.isChecked == true),
        selectedItemsschoolyear: state => state.selectedItemsschoolyear,
        statusCodeNH: state => state.statusCodeNH
    },
    actions: {
        async addschoolyear({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Schoolyears/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_SCHOOLYEAR', newStaff)
                dispatch("getschoolyear");
                dispatch('getMaxCodeschoolyear')
                console.log('aaa', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async exportExcelSchoolyear() {
            try {
                const response = await axios.get(`${API_BASE_URL}Schoolyears/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Schoolyears.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteschoolyear({ commit, dispatch }, SchoolYearId) {
            //commit('DELETE_TODO', id)
            try {
                const response = await axios.delete(`${API_BASE_URL}Schoolyears/${SchoolYearId}`)
                if (response.status === 200) {
                    commit('DELETE_SCHOOLYEAR', SchoolYearId);
                    dispatch('getschoolyear');
                    dispatch('getMaxCodeschoolyear')
                    commit('HANDLE_STATUSNH', response.status)
                } else if (response.status === 280) {
                    commit('HANDLE_STATUSNH', response.status)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleschoolyear({ commit, dispatch }, SchoolYearIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Schoolyears`, { data: SchoolYearIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_SCHOOLYEAR', SchoolYearIds);
                    dispatch('getschoolyear');
                    dispatch('getMaxCodeschoolyear');
                    commit('HANDLE_STATUSNH', response.status);
                } else if (response.status === 280) {
                    commit('HANDLE_STATUSNH', response.status)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemschoolyear({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Schoolyears/${updateChild.SchoolYearId}`,
                        updateChild);
                commit('UPDATE_SCHOOLYEAR', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getschoolyear');
                dispatch('getMaxCodeschoolyear')
            } catch (error) {
                console.log(error);
            }
        },
        async getschoolyear({ commit }) {
            try {
                commit('SET_LOADING_SCHOOLYEAR')
                const res = await axios.get(`${API_BASE_URL}Schoolyears`)
                commit('SET_SCHOOLYEAR', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        //TẠO 1 HÀM ĐỂ LẤY DỮ LIỆU THEO id
        /**
         * 
         * @param {CREATE BY: LXSON-MF1589
         * CREATE DATE: 17/04/2023} param0 
         * @param {*} object 
         */
        async getIDschoolyear({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Schoolyears/${object.SchoolYearId}`)
                commit('GETBYIDSCHOOLYEAR', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionschoolyear({ commit }) {
            try {
                commit('SELECT_ALL_SCHOOLYEAR')
            } catch (error) {
                console.log(error);
            }

        },
        async getMaxCodeschoolyear({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Schoolyears/SchoolyearCodeMax`)
                commit('SET_MAXCODE_SCHOOLYEAR', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsschoolyear({ commit }) {
            try {
                commit('UN_CHECK_SCHOOLYEAR')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        HANDLE_STATUSNH(state, data) {
            try {
                state.statusCodeNH = data
            } catch (error) {
                console.log(error);
            }
        },
        GETBYIDSCHOOLYEAR(state, data) {
            try {
                state.getByIdschoolyear = data
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_SCHOOLYEAR(state, id) {
            try {
                state.schoolyear = state.schoolyear.filter(item => item.SchoolYearId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_SCHOOLYEAR(state, updateItem) {
            try {
                const index = state.schoolyear.findIndex(item => item.SchoolYearId === updateItem.SchoolYearId);
                if (index !== -1) {
                    state.schoolyear.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_SCHOOLYEAR(state, newGrade) {
            try {
                state.schoolyear.unshift(newGrade)
            } catch (error) {
                console.log(error);
            }

        },
        SET_SCHOOLYEAR(state, schoolyear) {
            try {
                state.schoolyear = schoolyear;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingschoolyear DỮ LIỆU
        SET_LOADING_SCHOOLYEAR(state) {
            try {
                state.loadingschoolyear = true;
                setTimeout(() => {
                    state.loadingschoolyear = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_SCHOOLYEAR(state) {
            try {
                const allChecked = state.schoolyear.every(item => item.isChecked);
                state.schoolyear.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllschoolyear = !allChecked;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDSCHOOLYEAR(state, id) {
            try {
                state.selectedItemsschoolyear.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_SCHOOLYEAR(state) {
            try {
                state.isshowschoolyear = !state.isshowschoolyear;
            } catch (error) {
                console.log(error);
            }
        },
        UPDATE_MODE_SCHOOLYEAR(state) {
            try {
                state.formModeschoolyear = false;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_SCHOOLYEAR(state) {
            try {
                state.formModeschoolyear = true
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_SCHOOLYEAR(state) {
            try {
                state.schoolyear.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_SCHOOLYEAR(state, schoolyearmaxcode) {
            try {
                state.schoolyearmaxcode = schoolyearmaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default schoolyearmodule;