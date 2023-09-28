import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const conductModule = {
    state: {
        conduct: [],
        getByIdconduct: [],
        loadingconduct: false,
        checkAllconduct: false,
        isHideconduct: false,
        isshowconduct: false,
        selectedItemsconduct: [],
        formModeconduct: false,
        conductmaxcode: null,

        //phan trang
        pageSizeconduct: 15, // số lượng item trên một trang
        pageNumberconduct: 1, // số trang đang hiển thị
        semesterid: '3f7bb059-6c87-1b53-7f6a-e0860b0602ba',
        studentid: '',
        schoolyearid: '17ae2be6-2c6a-5cab-3bcb-6f55ff55ddab',
        classroomid: '677132b4-2a33-68d1-26c2-579daad24557',
        totalRecordsconduct: 1,
        totalPagesconduct: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        conduct: state => state.conduct,
        isshowconduct: state => state.isshowconduct,
        getByIdconduct: state => state.getByIdconduct,
        loadingconduct: state => state.loadingconduct,
        checkAllconduct: state => state.checkAllconduct,
        isCheckedconduct: state => state.conduct.isChecked,
        formModeconduct: state => state.formModeconduct,
        conductmaxcode: state => state.conductmaxcode,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allConduct: state => state.conduct.length,
        showIsHideconduct: state => state.isHideconduct,
        //dùng để đển số checkbox đã được chọn 
        checkAmountconduct: state => state.conduct.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedconduct: state => state.conduct.some((item) => item.isChecked == true),
        selectedItemsconduct: state => state.selectedItemsconduct,
        //khai bao getter phan trang
        totalRecordsconduct: state => state.totalRecordsconduct,
        pageNumberconduct: state => state.pageNumberconduct,
        totalPagesconduct: state => state.totalPagesconduct,
        pageSizeconduct: state => state.pageSizeconduct,
        //ket thuc getter phan trang

    },
    actions: {
        async getConduct({ commit, state }) {
            try {
                commit('SET_LOADING_CONDUCT')
                const res = await
                    axios.get(`${API_BASE_URL}Conduct/Paging?pageSize=${state.pageSizeconduct}
                    &pageNumber=${state.pageNumberconduct}&studentId=${state.studentid}
                    &semesterId=${state.semesterid}&schoolyearId=${state.schoolyearid}&ClassRoomId=${state.classroomid}`)
                commit('SET_CONDUCT', res.data.data)
                commit('SET_TOTAL_PAGES_CONDUCT', res.data.totalRecords)
                commit('SET_ALLPAGE_CONDUCT', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcel() {
            try {
                const response = await axios.get(`${API_BASE_URL}Conducts/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Conduct.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async getIDconduct({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Conduct/${object.ConductId}`)
                commit('GETBYIDCONDUCT', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addconduct({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Conduct/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_CONDUCT', newStaff)
                dispatch('getConduct');
                dispatch('getMaxCodeconduct');
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteconduct({ commit, dispatch }, ConductId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Conduct/${ConductId}`)
                commit('DELETE_CONDUCT', ConductId);
                dispatch('getConduct');
                dispatch('getMaxCodeconduct');
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleconduct({ commit, dispatch }, ConductIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Conduct`, { data: ConductIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_CONDUCT', ConductIds);
                    dispatch('getConduct');
                    dispatch('getMaxCodeconduct');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItemconduct({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Conduct/${updateChild.ConductId}`,
                        updateChild);
                commit('UPDATE_CONDUCT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getConduct');
                dispatch('getMaxCodeconduct');
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        toggleAllSelectionconduct({ commit }) {
            try {
                commit('SELECT_ALL_CONDUCT')
            } catch (error) {
                console.log(error);
            }

        },
        setSizeconduct({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_CONDUCT', name);
                dispatch('getConduct')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberconduct({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_CONDUCT', currentPage)
            dispatch('getConduct')
        },
        async setFilterconductstudent({ commit, dispatch }, filter) {
            try {
                commit('SET_FILTER_CONDUCTSTUDENTID', filter);
                dispatch('getConduct');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterconductsemester({ commit, dispatch }, filter) {
            try {
                commit('SET_FILTER_CONDUCTSEMESTERID', filter);
                dispatch('getConduct');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterconductschoolyear({ commit, dispatch }, filter) {
            try {
                commit('SET_FILTER_CONDUCTSCHOOLYEARID', filter);
                dispatch('getConduct');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterconductclassroom({ commit, dispatch }, filter) {
            try {
                commit('SET_FILTER_CONDUCTCLASSROOMID', filter);
                dispatch('getConduct');
            } catch (error) {
                console.error(error)
            }
        },
        async getMaxCodeconduct({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Conduct/ConductMaxcode`)
                commit('SET_MAXCODE_CONDUCT', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        uncheckItemsconduct({ commit }) {
            try {
                commit('UN_CHECK_CONDUCT')
            } catch (error) {
                console.log(error);
            }

        },

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        GETBYIDCONDUCT(state, data) {
            try {
                state.getByIdconduct = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_CONDUCT(state, conduct) {
            try {
                state.conduct = conduct;
            } catch (error) {
                console.log(error);
            }
        },
        SET_FILTER_CONDUCTSTUDENTID(state, studentId) {
            try {
                state.studentid = studentId;
            } catch (error) {
                console.log(error);
            }
        },
        SET_FILTER_CONDUCTSEMESTERID(state, semesterid) {
            try {
                state.semesterid = semesterid;
            } catch (error) {
                console.log(error);
            }
        },
        SET_FILTER_CONDUCTSCHOOLYEARID(state, schoolyearid) {
            try {
                state.schoolyearid = schoolyearid;
            } catch (error) {
                console.log(error);
            }
        },
        SET_FILTER_CONDUCTCLASSROOMID(state, classroomid) {
            try {
                state.classroomid = classroomid;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_CONDUCT(state, id) {
            try {
                state.conduct = state.conduct.filter(item => item.StudentId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_CONDUCT(state, updateItem) {
            try {
                const index = state.conduct.findIndex(item => item.ConductId === updateItem.ConductId);
                if (index !== -1) {
                    state.conduct.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_CONDUCT(state, newTeacher) {
            try {
                state.conduct.unshift(newTeacher)
            } catch (error) {
                console.log(error);
            }

        },
        //SET THỜI GIAN HIỂN THỊ loadingconduct DỮ LIỆU
        SET_LOADING_CONDUCT(state) {
            try {
                state.loadingconduct = true;
                setTimeout(() => {
                    state.loadingconduct = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_CONDUCT(state) {
            try {
                const allChecked = state.conduct.every(item => item.isChecked);

                state.conduct.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllconduct = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDCONDUCT(state, id) {
            try {
                state.selectedItemsconduct.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        //phan trang
        SET_TOTAL_PAGES_CONDUCT(state, totalRecordsconduct) {
            try {
                state.totalRecordsconduct = totalRecordsconduct
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_CONDUCT(state, total) {
            try {
                state.totalPagesconduct = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_CONDUCT(state, pageNumberconduct) {
            try {
                state.pageNumberconduct = pageNumberconduct
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_CONDUCT(state, newPage) {
            try {
                state.isHideconduct = !state.isHideconduct;
                state.pageSizeconduct = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDECONDUCT(state) {
            try {
                state.isHideconduct = !state.isHideconduct
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_CONDUCT(state) {
            try {
                state.isshowconduct = !state.isshowconduct
            } catch (error) {
                console.log(error);
            }
        },
        ADD_MODE_CONDUCT(state) {
            try {
                state.formModeconduct = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_CONDUCT(state) {
            try {
                state.formModeconduct = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_CONDUCT(state) {
            try {
                state.conduct.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_CONDUCT(state, conductmaxcode) {
            try {
                state.conductmaxcode = conductmaxcode
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default conductModule;