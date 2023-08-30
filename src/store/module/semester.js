import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const semestermodule = {
    state: {
        semester: [],
        getById: [],
        loading: false,
        checkAll: false,
        selectedItems: [],
    },
    getters: {
        getById: state => state.getById,
        semester: state => state.semester,
        loading: state => state.loading,
        checkAll: state => state.checkAll,
        isChecked: state => state.semester.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmount: state => state.semester.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueChecked: state => state.semester.some((item) => item.isChecked == true),
        selectedItems: state => state.selectedItems,
    },
    actions: {
        async addsemester({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Semesters/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_SEMESTER', newStaff)
                dispatch("getsemester");
                console.log('aaa', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletesemester({ commit, dispatch }, SemesterId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Semesters/${SemesterId}`)
                commit('DELETE_SEMESTER', SemesterId);
                dispatch('getsemester');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplesemester({ commit, dispatch }, SemesterIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Semesters`, { data: SemesterIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_SEMESTER', SemesterIds);
                    dispatch('getsemester');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemsemester({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Semesters/${updateChild.SemesterId}`,
                        updateChild);
                commit('UPDATE_SEMESTER', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getsemester');
            } catch (error) {
                console.log(error);
            }
        },
        async getsemester({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Semesters`)
                commit('SET_SEMESTER', res.data)
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
        DELETE_SEMESTER(state, id) {
            try {
                state.semester = state.semester.filter(item => item.SemesterId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_SEMESTER(state, updateItem) {
            try {
                const index = state.semester.findIndex(item => item.SemesterId === updateItem.SemesterId);
                if (index !== -1) {
                    state.semester.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_SEMESTER(state, newSemester) {
            try {
                state.semester.unshift(newSemester)
            } catch (error) {
                console.log(error);
            }

        },
        SET_SEMESTER(state, semester) {
            try {
                state.semester = semester;
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
                state.semester.map((item) => {
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
export default semestermodule;