import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const schoolyearmodule = {
    state: {
        schoolyear: [],
        getById: [],
        loading: false,
        checkAll: false,
        selectedItems: [],
    },
    getters: {
        getById: state => state.getById,
        schoolyear: state => state.schoolyear,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.schoolyear.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.schoolyear.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.schoolyear.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
    },
    actions: {
        async addschoolyear({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}SchoolYear/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_SCHOOLYEAR', newStaff)
                dispatch("getschoolyear");
                console.log('aaa', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteschoolyear({ commit, dispatch }, SchoolYearId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}SchoolYear/${SchoolYearId}`)
                commit('DELETE_SCHOOLYEAR', SchoolYearId);
                dispatch('getschoolyear');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleschoolyear({ commit, dispatch }, SchoolYearIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}SchoolYear`, { data: SchoolYearIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_SCHOOLYEAR', SchoolYearIds);
                    dispatch('getschoolyear');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemschoolyear({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}SchoolYear/${updateChild.SchoolYearId}`,
                        updateChild);
                commit('UPDATE_SCHOOLYEAR', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getschoolyear');
            } catch (error) {
                console.log(error);
            }
        },
        async getschoolyear({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}SchoolYear`)
                commit('SET_SCHOOLYEAR', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelection({ commit }) {
            try {
                commit('SELECT_ALL')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        GETBYID(state, data) {
            try {
                state.getById = data
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
        //SET THỜI GIAN HIỂN THỊ LOADING DỮ LIỆU
        SET_LOADING(state) {
            try {
                state.loading = true;
                setTimeout(() => {
                    state.loading = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL(state) {
            try {
                state.schoolyear.map((item) => {
                    if (item.isChecked == false) {
                        item.isChecked = true;
                        state.checkAll = true
                    }
                    else {
                        item.isChecked = false;
                        state.checkAll = false
                    }
                });
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKED(state, id) {
            try {
                state.selectedItems.push(id);
            } catch (error) {
                console.log(error);
            }

        },
    }
}
export default schoolyearmodule;