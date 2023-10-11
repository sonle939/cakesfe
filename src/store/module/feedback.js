import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const feedbackModule = {
    state: {
        feedback: [],
        getByIdFeedback: [],
        loadingfeedback: false,
        checkAllfeedback: false,
        selectedItemsfeedback: [],
        isshowfeedback: false,
        formModefeedback: false,
        feedbackmaxcode: null,
        isHidefeedback: false,

        //phan trang
        pageSizefeedback: 15, // số lượng item trên một trang
        pageNumberfeedback: 1, // số trang đang hiển thị
        handle: 'Đang chờ xử lý',
        studentName: '',
        totalRecordsfeedback: 1,
        totalPagesfeedback: null,
    },
    getters: {
        feedback: state => state.feedback,
        getByIdFeedback: state => state.getByIdFeedback,
        gradefeedback: state => state.gradefeedback,
        loadingfeedback: state => state.loadingfeedback,
        checkAllfeedback: state => state.checkAllfeedback,
        isChecked: state => state.feedback.isChecked,
        isshowfeedback: state => state.isshowfeedback,
        formModefeedback: state => state.formModefeedback,
        feedbackmaxcode: state => state.feedbackmaxcode,
        showIsHidefeedback: state => state.isHidefeedback,
        //dùng để đển số checkbox đã được chọn 
        checkAmountfeedback: state => state.feedback.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedfeedback: state => state.feedback.some((item) => item.isChecked == true),
        selectedItemsfeedback: state => state.selectedItemsfeedback,

        //khai bao getter phan trang
        totalRecordsfeedback: state => state.totalRecordsfeedback,
        pageNumberfeedback: state => state.pageNumberfeedback,
        totalPagesfeedback: state => state.totalPagesfeedback,
        pageSizefeedback: state => state.pageSizefeedback,
    },
    actions: {
        async getFeedback({ commit, state }) {
            try {
                commit('SET_LOADING_FEEDBACK')
                const res = await
                    axios.get(`${API_BASE_URL}Feedback/Paging?pageSize=${state.pageSizefeedback}&pageNumber=${state.pageNumberfeedback}&handle=${state.handle}&studentName=${state.studentName}`)
                commit('SET_FEEDBACK', res.data.data)
                commit('SET_TOTAL_PAGES_FEEDBACK', res.data.totalRecords)
                commit('SET_ALLPAGE_FEEDBACK', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcelFeedback() {
            try {
                const response = await axios.get(`${API_BASE_URL}Feedback/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Feedback.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async addfeedback({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Feedback/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_FEEDBACK', newStaff)
                dispatch('getFeedback');
                dispatch('getMaxCodefeedback')
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletefeedback({ commit, dispatch }, FeedbackId) {
            //commit('DELETE_TODO', id)
            try {
                const response = await axios.delete(`${API_BASE_URL}Feedback/${FeedbackId}`)
                if (response.status === 200) {
                    commit('DELETE_FEEDBACK', FeedbackId);
                    dispatch('getFeedback');
                    dispatch('getMaxCodefeedback');
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplefeedback({ commit, dispatch }, FeedbackIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Feedback`, { data: FeedbackIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_FEEDBACK', FeedbackIds);
                    dispatch('getFeedback');
                    dispatch('getMaxCodefeedback');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemfeedback({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Feedback/${updateChild.FeedbackId}`,
                        updateChild);
                commit('UPDATE_FEEDBACK', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getFeedback');
                dispatch('getMaxCodefeedback');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getIDfeedback({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Feedback/${object.FeedbackId}`)
                commit('getByIdFeedback', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionfeedback({ commit }) {
            try {
                commit('SELECT_ALL_FEEDBACK')
            } catch (error) {
                console.log(error);
            }

        },
        setSizefeedback({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_FEEDBACK', name);
                dispatch('getFeedback')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberfeedback({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_FEEDBACK', currentPage)
            dispatch('getFeedback')
        },
        async filterfeedbackhandle({ commit, dispatch }, filter) {
            try {
                commit('FILTER_FEEDBACK_HANDLE', filter);
                dispatch('getFeedback');
            } catch (error) {
                console.error(error)
            }
        },
        async filterfeedbackstudentName({ commit, dispatch }, filter) {
            try {
                commit('FILTER_FEEDBACK_STUDENTNAME', filter);
                dispatch('getFeedback');
            } catch (error) {
                console.error(error)
            }
        },
        async getMaxCodefeedback({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Feedback/FeedbackCodeMax`)
                commit('SET_MAXCODE_FEEDBACK', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsfeedback({ commit }) {
            try {
                commit('UN_CHECK_FEEDBACK')
            } catch (error) {
                console.log(error);
            }

        },
    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        getByIdFeedback(state, data) {
            try {
                state.getByIdFeedback = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_FEEDBACK(state, feedback) {
            try {
                state.feedback = feedback;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_FEEDBACK_HANDLE(state, handle) {
            try {
                state.handle = handle;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_FEEDBACK_STUDENTNAME(state, studentName) {
            try {
                state.studentName = studentName;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_FEEDBACK(state, id) {
            try {
                state.feedback = state.feedback.filter(item => item.FeedbackId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_FEEDBACK(state, updateItem) {
            try {
                const index = state.feedback.findIndex(item => item.FeedbackId === updateItem.FeedbackId);
                if (index !== -1) {
                    state.feedback.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_FEEDBACK(state, newFeedback) {
            try {
                state.feedback.unshift(newFeedback)
            } catch (error) {
                console.log(error);
            }

        },
        //SET THỜI GIAN HIỂN THỊ loadingfeedback DỮ LIỆU
        SET_LOADING_FEEDBACK(state) {
            try {
                state.loadingfeedback = true;
                setTimeout(() => {
                    state.loadingfeedback = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        SELECT_ALL_FEEDBACK(state) {
            try {
                const allChecked = state.feedback.every(item => item.isChecked);

                state.feedback.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllfeedback = !allChecked;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDFEEDBACK(state, id) {
            try {
                state.selectedItemsfeedback.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SET_TOTAL_PAGES_FEEDBACK(state, totalRecordsfeedback) {
            try {
                state.totalRecordsfeedback = totalRecordsfeedback
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_FEEDBACK(state, total) {
            try {
                state.totalPagesfeedback = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_FEEDBACK(state, pageNumberfeedback) {
            try {
                state.pageNumberfeedback = pageNumberfeedback
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDEFEEDBACK(state) {
            try {
                state.isHidefeedback = !state.isHidefeedback
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_FEEDBACK(state, newPage) {
            try {
                state.isHidefeedback = !state.isHidefeedback;
                state.pageSizefeedback = newPage
            } catch (error) {
                console.log(error);
            }
        },
        SHOW_FORM_FEEDBACK(state) {
            try {
                state.isshowfeedback = !state.isshowfeedback;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_FEEDBACK(state) {
            try {
                state.formModefeedback = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_FEEDBACK(state) {
            try {
                state.formModefeedback = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_FEEDBACK(state) {
            try {
                state.feedback.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_FEEDBACK(state, feedbackmaxcode) {
            try {
                state.feedbackmaxcode = feedbackmaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default feedbackModule;