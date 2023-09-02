import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const semestermodule = {
    state: {
        semester: [],
        getByIdsemester: [],
        loadingsemester: false,
        checkAllsemester: false,
        isshowsemester: false,
        selectedItemssemester: [],
    },
    getters: {
        getByIdsemester: state => state.getByIdsemester,
        isshowsemester: state => state.isshowsemester,
        semester: state => state.semester,
        loadingsemester: state => state.loadingsemester,
        checkAllsemester: state => state.checkAllsemester,
        isCheckedsemester: state => state.semester.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmountsemester: state => state.semester.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedsemester: state => state.semester.some((item) => item.isChecked == true),
        selectedItemssemester: state => state.selectedItemssemester,
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
                commit('SET_LOADING_SEMESTER')
                const res = await axios.get(`${API_BASE_URL}Semesters`)
                commit('SET_SEMESTER', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getIDsemester({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Semesters/${object.SemesterId}`)
                commit('getByIdsemester', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionsemester({ commit }) {
            try {
                commit('SELECT_ALL_SEMESTER')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        getByIdsemester(state, data) {
            try {
                state.getByIdsemester = data
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
        //SET THỜI GIAN HIỂN THỊ loadingsemester DỮ LIỆU
        SET_LOADING_SEMESTER(state) {
            try {
                state.loadingsemester = true;
                setTimeout(() => {
                    state.loadingsemester = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_SEMESTER(state) {
            try {
                const allChecked = state.semester.every(item => item.isChecked);

                state.semester.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllclassroom = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDSEMESTER(state, id) {
            try {
                state.selectedItemssemester.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_SEMESTER(state) {
            try {
                state.isshowsemester = !state.isshowsemester;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default semestermodule;