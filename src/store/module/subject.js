import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const subjectmodule = {
    state: {
        subject: [],
        getByIdsubject: [],
        loadingsubject: false,
        checkAllsubject: false,
        //dung de chuyen doi tu form them sang form sua
        formModesubject: true,
        isshowsubject: false,
        selectedItemssubject: [],
        subjectmaxCode: null
    },
    getters: {
        getByIdsubject: state => state.getByIdsubject,
        isshowsubject: state => state.isshowsubject,
        subject: state => state.subject,
        subjectmaxCode: state => state.subjectmaxCode,
        loadingsubject: state => state.loadingsubject,
        formModesubject: state => state.formModesubject,
        checkAllsubject: state => state.checkAllsubject,
        isCheckedsubject: state => state.subject.isChecked,
        //dùng để đển số checkbox đã được chọn 
        checkAmountsubject: state => state.subject.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedsubject: state => state.subject.some((item) => item.isChecked == true),
        selectedItemssubject: state => state.selectedItemssubject,
    },
    actions: {
        async addsubject({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Subjects/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_SUBJECT', newStaff)
                dispatch("getsubject");
                dispatch('getMaxCodeSubject');
                console.log('aaa', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async exportExcel() {
            try {
                const response = await axios.get(`${API_BASE_URL}Subjects/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Subjects.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletesubject({ commit, dispatch }, SubjectId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Subjects/${SubjectId}`)
                commit('DELETE_SUBJECT', SubjectId);
                dispatch('getsubject');
                dispatch('getMaxCodeSubject');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplesubject({ commit, dispatch }, SubjectIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Subjects`, { data: SubjectIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_SUBJECT', SubjectIds);
                    dispatch('getsubject');
                    dispatch('getMaxCodeSubject');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemsubject({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Subjects/${updateChild.SubjectId}`,
                        updateChild);
                commit('UPDATE_SUBJECT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getsubject');
                dispatch('getMaxCodeSubject');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getsubject({ commit }) {
            try {
                commit('SET_LOADING_SUBJECT')
                const res = await axios.get(`${API_BASE_URL}Subjects`)
                commit('SET_SUBJECT', res.data)
            } catch (error) {
                console.log(error)
            }
        },

        async getIDsubject({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Subjects/${object.SubjectId}`)
                commit('getByIdsubject', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionsubject({ commit }) {
            try {
                commit('SELECT_ALL_SUBJECT')
            } catch (error) {
                console.log(error);
            }

        },
        async getMaxCodeSubject({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Subjects/SubjectCodeMax`)
                commit('SET_MAXCODE_SUBJECT', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsubject({ commit }) {
            try {
                commit('UN_CHECK_SUBJECT')
            } catch (error) {
                console.log(error);
            }

        },
    },
    mutations: {
        getByIdsubject(state, data) {
            try {
                state.getByIdsubject = data
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_SUBJECT(state, id) {
            try {
                state.subject = state.subject.filter(item => item.SubjectId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_SUBJECT(state, updateItem) {
            try {
                const index = state.subject.findIndex(item => item.SubjectId === updateItem.SubjectId);
                if (index !== -1) {
                    state.subject.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_SUBJECT(state, newSubject) {
            try {
                state.subject.unshift(newSubject)
            } catch (error) {
                console.log(error);
            }

        },
        SET_MAXCODE_SUBJECT(state, subjectmaxCode) {
            try {
                state.subjectmaxCode = subjectmaxCode
            } catch (error) {
                console.log(error);
            }
        },
        SET_SUBJECT(state, subject) {
            try {
                state.subject = subject;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingsubject DỮ LIỆU
        SET_LOADING_SUBJECT(state) {
            try {
                state.loadingsubject = true;
                setTimeout(() => {
                    state.loadingsubject = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_SUBJECT(state) {
            try {
                const allChecked = state.subject.every(item => item.isChecked);

                state.subject.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllclassroom = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDSUBJECT(state, id) {
            try {
                state.selectedItemssubject.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_SUBJECT(state) {
            try {
                state.isshowsubject = !state.isshowsubject;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        UPDATE_MODE_SUBJECT(state) {
            try {
                state.formModesubject = false;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_SUBJECT(state) {
            try {
                state.formModesubject = true
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_SUBJECT(state) {
            try {
                state.subject.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

    }
}
export default subjectmodule;