import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const timetableModule = {
    state: {
        timetable: [],
        subjecttimetable: [],
        teachertimetable: [],
        classroomtimetable: [],
        getByIdtimetable: [],
        loadingtimetable: false,
        checkAlltimetable: false,
        isHidetimetable: false,
        isshowtimetable: false,
        selectedItemstimetable: [],
        formModetimetable: false,
        timetablemaxcode: null,

        //phan trang
        pageSizestimetable: 15, // số lượng item trên một trang
        pageNumbertimetable: 1, // số trang đang hiển thị
        subjectId: '',
        teacherId: '',
        classroomId: '',
        totalRecordstimetable: 1,
        totalPagestimetable: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        timetable: state => state.timetable,
        isshowtimetable: state => state.isshowtimetable,
        getByIdtimetable: state => state.getByIdtimetable,
        subjecttimetable: state => state.subjecttimetable,
        teachertimetable: state => state.teachertimetable,
        classroomtimetable: state => state.classroomtimetable,
        loadingtimetable: state => state.loadingtimetable,
        checkAlltimetable: state => state.checkAlltimetable,
        isCheckedtimetable: state => state.timetable.isChecked,
        formModetimetable: state => state.formModetimetable,
        timetablemaxcode: state => state.timetablemaxcode,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allTimetable: state => state.timetable.length,
        showIsHidetimetable: state => state.isHidetimetable,
        //dùng để đển số checkbox đã được chọn 
        checkAmounttimetable: state => state.timetable.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedtimetable: state => state.timetable.some((item) => item.isChecked == true),
        selectedItemstimetable: state => state.selectedItemstimetable,
        //khai bao getter phan trang
        totalRecordstimetable: state => state.totalRecordstimetable,
        pageNumbertimetable: state => state.pageNumbertimetable,
        totalPagestimetable: state => state.totalPagestimetable,
        pageSizestimetable: state => state.pageSizestimetable,
        //ket thuc getter phan trang

    },
    actions: {
        async gettimetable({ commit, state }) {
            try {
                commit('SET_LOADING_TIMETABLE')
                const res = await
                    axios.get(`${API_BASE_URL}TimeTables/Paging?pageSize=${state.pageSizestimetable}&pageNumber=${state.pageNumbertimetable}&subjectId=${state.subjectId}&teacherId=${state.teacherId}&classroomId=${state.classroomId}`)
                commit('SET_TIMETABLE', res.data.data)
                commit('SET_TOTAL_PAGES_TIMETABLE', res.data.totalRecords)
                commit('SET_ALLPAGE_TIMETABLE', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcel() {
            try {
                const response = await axios.get(`${API_BASE_URL}TimeTables/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Timetable.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async getIDtimetable({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}TimeTables/${object.TimeTableId}`)
                commit('GETBYIDTIMETABLE', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addtimetable({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}TimeTables/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_TIMETABLE', newStaff)
                dispatch('gettimetable');
                dispatch('getMaxCodetimetable')
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletetimetable({ commit, dispatch }, TimeTableId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}TimeTables/${TimeTableId}`)
                commit('DELETE_TIMETABLE', TimeTableId);
                dispatch('gettimetable');
                dispatch('getMaxCodetimetable')
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipletimetable({ commit, dispatch }, TimeTableIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}TimeTables`, { data: TimeTableIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_TIMETABLE', TimeTableIds);
                    dispatch('gettimetable');
                    dispatch('getMaxCodetimetable')
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemtimetable({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}TimeTables/${updateChild.TimeTableId}`,
                        updateChild);
                commit('UPDATE_TIMETABLE', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('gettimetable');
                dispatch('getMaxCodetimetable')
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getclassroomtimetable({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}ClassRooms`)
                commit('SET_CLASSROOM_TIMETABLE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getteachertimetable({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Teachers`)
                commit('SET_TEACHER_TIMETABLE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getsubjecttimetable({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Subjects`)
                commit('SET_SUBJECT_TIMETABLE', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectiontimetable({ commit }) {
            try {
                commit('SELECT_ALL_TIMETABLE')
            } catch (error) {
                console.log(error);
            }

        },
        setSizetimetable({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_TIMETABLE', name);
                dispatch('gettimetable')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumbertimetable({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_TIMETABLE', currentPage)
            dispatch('gettimetable')
        },
        async getMaxCodetimetable({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}TimeTables/TimeTableCodeMax`)
                commit('SET_MAXCODE_TIMETABLE', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemstimetable({ commit }) {
            try {
                commit('UN_CHECK_TIMETABLE')
            } catch (error) {
                console.log(error);
            }

        },
        async setFilterclassroomidtimetable({ commit, dispatch }, filter) {
            try {
                commit('FILTER_CLASSROOMID_TIMETABLE', filter);
                dispatch('gettimetable');
            } catch (error) {
                console.error(error)
            }
        },
        async setFiltersubjectidtimetable({ commit, dispatch }, filter) {
            try {
                commit('FILTER_SUBJECTID_TIMETABLE', filter);
                dispatch('gettimetable');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterteacheridtimetable({ commit, dispatch }, filter) {
            try {
                commit('FILTER_TEACHERID_TIMETABLE', filter);
                dispatch('gettimetable');
            } catch (error) {
                console.error(error)
            }
        },

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        GETBYIDTIMETABLE(state, data) {
            try {
                state.getByIdtimetable = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_TIMETABLE(state, timetable) {
            try {
                state.timetable = timetable;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_TIMETABLE(state, id) {
            try {
                state.timetable = state.timetable.filter(item => item.TimeTableId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_TIMETABLE(state, updateItem) {
            try {
                const index = state.timetable.findIndex(item => item.TimeTableId === updateItem.TimeTableId);
                if (index !== -1) {
                    state.timetable.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_TIMETABLE(state, newTeacher) {
            try {
                state.timetable.unshift(newTeacher)
            } catch (error) {
                console.log(error);
            }

        },
        SET_CLASSROOM_TIMETABLE(state, classroomtimetable) {
            try {
                state.classroomtimetable = classroomtimetable;
            } catch (error) {
                console.log(error);
            }
        },
        SET_TEACHER_TIMETABLE(state, teachertimetable) {
            try {
                state.teachertimetable = teachertimetable;
            } catch (error) {
                console.log(error);
            }
        },
        SET_SUBJECT_TIMETABLE(state, subjecttimetable) {
            try {
                state.subjecttimetable = subjecttimetable;
            } catch (error) {
                console.log(error);
            }
        },
        //SET THỜI GIAN HIỂN THỊ loadingtimetable DỮ LIỆU
        SET_LOADING_TIMETABLE(state) {
            try {
                state.loadingtimetable = true;
                setTimeout(() => {
                    state.loadingtimetable = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_TIMETABLE(state) {
            try {
                const allChecked = state.timetable.every(item => item.isChecked);

                state.timetable.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAlltimetable = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDTIMETABLE(state, id) {
            try {
                state.selectedItemstimetable.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        //phan trang
        SET_TOTAL_PAGES_TIMETABLE(state, totalRecordstimetable) {
            try {
                state.totalRecordstimetable = totalRecordstimetable
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_TIMETABLE(state, total) {
            try {
                state.totalPagestimetable = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_TIMETABLE(state, pageNumbertimetable) {
            try {
                state.pageNumbertimetable = pageNumbertimetable
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_TIMETABLE(state, newPage) {
            try {
                state.isHidetimetable = !state.isHidetimetable;
                state.pageSizestimetable = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDETIMETABLE(state) {
            try {
                state.isHidetimetable = !state.isHidetimetable
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_TIMETABLE(state) {
            try {
                state.isshowtimetable = !state.isshowtimetable
            } catch (error) {
                console.log(error);
            }
        },
        ADD_MODE_TIMETABLE(state) {
            try {
                state.formModetimetable = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_TIMETABLE(state) {
            try {
                state.formModetimetable = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_TIMETABLE(state) {
            try {
                state.timetable.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_TIMETABLE(state, timetablemaxcode) {
            try {
                state.timetablemaxcode = timetablemaxcode
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_CLASSROOMID_TIMETABLE(state, classroomId) {
            try {
                state.classroomId = classroomId;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_SUBJECTID_TIMETABLE(state, subjectId) {
            try {
                state.subjectId = subjectId;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_TEACHERID_TIMETABLE(state, teacherId) {
            try {
                state.teacherId = teacherId;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default timetableModule;