import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const assignmentModule = {
    state: {
        assignment: [],
        assignmentAll: [],
        getByIdAssignment: [],
        loadingassignment: false,
        checkAllassignment: false,
        selectedItemsassignment: [],
        isshowassignment: false,
        formModeassignment: false,
        assignmentmaxcode: null,
        isHideassignment: false,

        //phan trang
        pageSizeassignment: 15, // số lượng item trên một trang
        pageNumberassignment: 1, // số trang đang hiển thị
        classroomId: '',
        assignmentCode: '',
        teacherName: '',
        totalRecordsassignment: 1,
        totalPagesassignment: null,
    },
    getters: {
        assignment: state => state.assignment,
        assignmentAll: state => state.assignmentAll,
        getByIdAssignment: state => state.getByIdAssignment,
        gradeassignment: state => state.gradeassignment,
        loadingassignment: state => state.loadingassignment,
        checkAllassignment: state => state.checkAllassignment,
        isChecked: state => state.assignment.isChecked,
        isshowassignment: state => state.isshowassignment,
        formModeassignment: state => state.formModeassignment,
        assignmentmaxcode: state => state.assignmentmaxcode,
        showIsHideassignment: state => state.isHideassignment,
        //dùng để đển số checkbox đã được chọn 
        checkAmountassignment: state => state.assignment.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedassignment: state => state.assignment.some((item) => item.isChecked == true),
        selectedItemsassignment: state => state.selectedItemsassignment,

        //khai bao getter phan trang
        totalRecordsassignment: state => state.totalRecordsassignment,
        pageNumberassignment: state => state.pageNumberassignment,
        totalPagesassignment: state => state.totalPagesassignment,
        pageSizeassignment: state => state.pageSizeassignment,
    },
    actions: {
        async getAssignment({ commit, state }) {
            try {
                commit('SET_LOADING_ASSIGNMENT')
                const res = await
                    axios.get(`${API_BASE_URL}Assignments/Paging?pageSize=${state.pageSizeassignment}&pageNumber=${state.pageNumberassignment}&recordId=${state.classroomId}&recordCode=${state.assignmentCode}&recordName=${state.teacherName}`)
                commit('SET_ASSIGNMENT', res.data.data)
                commit('SET_TOTAL_PAGES_ASSIGNMENT', res.data.totalRecords)
                commit('SET_ALLPAGE_ASSIGNMENT', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async getassignmentAll({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Assignments/`)
                commit('SET_ASSIGNMENT_ALL', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcelAssignment() {
            try {
                const response = await axios.get(`${API_BASE_URL}Assignments/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Assignments.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async addassignment({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Assignments/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_ASSIGNMENT', newStaff)
                dispatch('getAssignment');
                dispatch('getMaxCodeassignment')
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteassignment({ commit, dispatch }, AssignmentId) {
            //commit('DELETE_TODO', id)
            try {
                const response = await axios.delete(`${API_BASE_URL}Assignments/${AssignmentId}`)
                if (response.status === 200) {
                    commit('DELETE_ASSIGNMENT', AssignmentId);
                    dispatch('getAssignment');
                    dispatch('getMaxCodeassignment');
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleassignment({ commit, dispatch }, AssignmentIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Assignments`, { data: AssignmentIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_ASSIGNMENT', AssignmentIds);
                    dispatch('getAssignment');
                    dispatch('getMaxCodeassignment');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemassignment({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Assignments/${updateChild.AssignmentId}`,
                        updateChild);
                commit('UPDATE_ASSIGNMENT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getAssignment');
                dispatch('getMaxCodeassignment');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getIDassignment({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Assignments/${object.AssignmentId}`)
                commit('getByIdAssignment', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionassignment({ commit }) {
            try {
                commit('SELECT_ALL_ASSIGNMENT')
            } catch (error) {
                console.log(error);
            }

        },
        setSizeassignment({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_ASSIGNMENT', name);
                dispatch('getAssignment')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberassignment({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_ASSIGNMENT', currentPage)
            dispatch('getAssignment')
        },
        async filteridclassroomassignment({ commit, dispatch }, filter) {
            try {
                commit('FILTER_ASSIGNMENT_CLASSROOM', filter);
                dispatch('getAssignment');
            } catch (error) {
                console.error(error)
            }
        },
        async filterassignmentcode({ commit, dispatch }, filter) {
            try {
                commit('FILTER_ASSIGNMENT_ASSIGNMENTCODE', filter);
                dispatch('getAssignment');
            } catch (error) {
                console.error(error)
            }
        },
        async getMaxCodeassignment({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Assignments/AssignmentCodeMax`)
                commit('SET_MAXCODE_ASSIGNMENT', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsassignment({ commit }) {
            try {
                commit('UN_CHECK_ASSIGNMENT')
            } catch (error) {
                console.log(error);
            }

        },
        async setFilterAssignmentTeacherName({ commit, dispatch }, name) {
            try {
                commit('FILTER__ASIGNMENT_TEACHERNAME', name);
                dispatch('getAssignment');
            } catch (error) {
                console.error(error)
            }
        },
    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        FILTER__ASIGNMENT_TEACHERNAME(state, teacherName) {
            try {
                state.teacherName = teacherName
            } catch (error) {
                console.log(error);
            }

        },
        getByIdAssignment(state, data) {
            try {
                state.getByIdAssignment = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_ASSIGNMENT(state, assignment) {
            try {
                state.assignment = assignment;
            } catch (error) {
                console.log(error);
            }
        },
        SET_ASSIGNMENT_ALL(state, assignmentAll) {
            try {
                state.assignmentAll = assignmentAll;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_ASSIGNMENT_CLASSROOM(state, classroomId) {
            try {
                state.classroomId = classroomId;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_ASSIGNMENT_ASSIGNMENTCODE(state, assignmentCode) {
            try {
                state.assignmentCode = assignmentCode;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_ASSIGNMENT(state, id) {
            try {
                state.assignment = state.assignment.filter(item => item.AssignmentId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_ASSIGNMENT(state, updateItem) {
            try {
                const index = state.assignment.findIndex(item => item.AssignmentId === updateItem.AssignmentId);
                if (index !== -1) {
                    state.assignment.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_ASSIGNMENT(state, newAssignment) {
            try {
                state.assignment.unshift(newAssignment)
            } catch (error) {
                console.log(error);
            }

        },
        //SET THỜI GIAN HIỂN THỊ loadingassignment DỮ LIỆU
        SET_LOADING_ASSIGNMENT(state) {
            try {
                state.loadingassignment = true;
                setTimeout(() => {
                    state.loadingassignment = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        SELECT_ALL_ASSIGNMENT(state) {
            try {
                const allChecked = state.assignment.every(item => item.isChecked);

                state.assignment.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllassignment = !allChecked;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDASSIGNMENT(state, id) {
            try {
                state.selectedItemsassignment.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        SET_TOTAL_PAGES_ASSIGNMENT(state, totalRecordsassignment) {
            try {
                state.totalRecordsassignment = totalRecordsassignment
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_ASSIGNMENT(state, total) {
            try {
                state.totalPagesassignment = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_ASSIGNMENT(state, pageNumberassignment) {
            try {
                state.pageNumberassignment = pageNumberassignment
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDEASSIGNMENT(state) {
            try {
                state.isHideassignment = !state.isHideassignment
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_ASSIGNMENT(state, newPage) {
            try {
                state.isHideassignment = !state.isHideassignment;
                state.pageSizeassignment = newPage
            } catch (error) {
                console.log(error);
            }
        },
        SHOW_FORM_ASSIGNMENT(state) {
            try {
                state.isshowassignment = !state.isshowassignment;
            } catch (error) {
                console.log(error);
            }
        },
        //tạo một hàm dùng để chuyển đổi từ add sang update vầ nguwopjc lại
        ADD_MODE_ASSIGNMENT(state) {
            try {
                state.formModeassignment = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_ASSIGNMENT(state) {
            try {
                state.formModeassignment = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_ASSIGNMENT(state) {
            try {
                state.assignment.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_ASSIGNMENT(state, assignmentmaxcode) {
            try {
                state.assignmentmaxcode = assignmentmaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default assignmentModule;