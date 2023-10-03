import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const pointModule = {
    state: {
        point: [],
        pointStudentId: [],
        pointAll: [],
        getByIdpoint: [],
        loadingpoint: false,
        checkAllpoint: false,
        isHidepoint: false,
        isshowpoint: false,
        selectedItemspoint: [],
        formModepoint: false,
        pointmaxcode: null,

        //phan trang
        pageSizespoint: 15, // số lượng item trên một trang
        pageNumberpoint: 1, // số trang đang hiển thị
        subjectId: '4e4dd06a-1a04-681f-29dc-88a3ac8a3bba',
        classroomid: '677132b4-2a33-68d1-26c2-579daad24557',
        semesterId: '3f7bb059-6c87-1b53-7f6a-e0860b0602ba',
        schoolyearId: '17ae2be6-2c6a-5cab-3bcb-6f55ff55ddab',
        totalRecordspoint: 1,
        totalPagespoint: null,
        //ket thuc khai bao bien phan trang
    },
    getters: {
        point: state => state.point,
        pointStudentId: state => state.pointStudentId,
        pointAll: state => state.pointAll,
        isshowpoint: state => state.isshowpoint,
        getByIdpoint: state => state.getByIdpoint,
        loadingpoint: state => state.loadingpoint,
        checkAllpoint: state => state.checkAllpoint,
        isCheckedpoint: state => state.point.isChecked,
        pointmaxcode: state => state.pointmaxcode,
        formModepoint: state => state.formModepoint,
        //dùng để đếm số lượng dữ liệu (phân trang)
        allPoint: state => state.point.length,
        showIsHidepoint: state => state.isHidepoint,
        //dùng để đển số checkbox đã được chọn 
        checkAmountpoint: state => state.point.filter((item) => item.isChecked == true).length,
        //dùng để làm điều khiện ân hiển chức năng xóa nhiều bản ghi
        trueCheckedpoint: state => state.point.some((item) => item.isChecked == true),
        selectedItemspoint: state => state.selectedItemspoint,
        //khai bao getter phan trang
        totalRecordspoint: state => state.totalRecordspoint,
        pageNumberpoint: state => state.pageNumberpoint,
        totalPagespoint: state => state.totalPagespoint,
        pageSizespoint: state => state.pageSizespoint,
        //ket thuc getter phan trang

    },
    actions: {
        async getpoint({ commit, state }) {
            try {
                commit('SET_LOADING_POINT')
                const res = await
                    axios.get(`${API_BASE_URL}Points/Paging?pageSize=${state.pageSizespoint}&pageNumber=${state.pageNumberpoint}&subjectId=${state.subjectId}&semesterId=${state.semesterId}&schoolyearId=${state.schoolyearId}&ClassRoomId=${state.classroomid}`)
                commit('SET_POINT', res.data.data)
                commit('SET_TOTAL_PAGES_POINT', res.data.totalRecords)
                commit('SET_ALLPAGE_POINT', res.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcelPoint() {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Points.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async getMaxCodepoint({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/PointMaxcode`)
                commit('SET_MAXCODE_POINT', response.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getIDpoint({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/${object.PointId}`)
                commit('GETBYIDPOINT', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getpointstudentid({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/StudentId?recordId=${object.StudentId}`)
                commit('GETSTUDENTIDPOINT', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async addpoint({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Points/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_POINT', newStaff)
                dispatch('getpoint');
                dispatch('getMaxCodepoint')
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deletepoint({ commit, dispatch }, PointId) {
            //commit('DELETE_TODO', id)
            try {
                await axios.delete(`${API_BASE_URL}Points/${PointId}`)
                commit('DELETE_POINT', PointId);
                dispatch('getpoint');
                dispatch('getMaxCodepoint')
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultiplepoint({ commit, dispatch }, PointIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Points`, { data: PointIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_POINT', PointIds);
                    dispatch('getMaxCodepoint')
                    dispatch('getpoint');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateItempoint({ commit, dispatch }, updateChild) {
            try {
                const response =
                    await axios.put(`${API_BASE_URL}Points/${updateChild.PointId}`,
                        updateChild);
                commit('UPDATE_POINT', response.data);
                //  commit('SETUPDATECHECK', response.data.message)
                dispatch('getpoint');
                dispatch('getMaxCodepoint')
                console.log('update', response.data.message);
            } catch (error) {
                console.log(error);
            }
        },
        async getAllpoint({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Points`)
                commit('SET_POINT_ALL', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        toggleAllSelectionpoint({ commit }) {
            try {
                commit('SELECT_ALL_POINT')
            } catch (error) {
                console.log(error);
            }

        },
        setSizepoint({ commit, dispatch }, name) {
            try {
                commit('SET_PAGE_POINT', name);
                dispatch('getpoint')

            } catch (error) {
                console.log(error);
            }
        },
        setPageNumberpoint({ commit, dispatch }, currentPage) {
            commit('SET_PAGE_NUMBER_POINT', currentPage)
            dispatch('getpoint')
        },
        uncheckItemspoint({ commit }) {
            try {
                commit('UN_CHECK_POINT')
            } catch (error) {
                console.log(error);
            }

        },

        async setFilterclassroomidpoint({ commit, dispatch }, filter) {
            try {
                commit('FILTER_CLASSROOMID_POINT', filter);
                dispatch('getpoint');
            } catch (error) {
                console.error(error)
            }
        },
        async setFiltersubjectidpoint({ commit, dispatch }, filter) {
            try {
                commit('FILTER_SUBJECTID_POINT', filter);
                dispatch('getpoint');
            } catch (error) {
                console.error(error)
            }
        },
        async setFiltersemesterpoint({ commit, dispatch }, filter) {
            try {
                commit('FILTER_SEMESTER_POINT', filter);
                dispatch('getpoint');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterschoolyearpoint({ commit, dispatch }, filter) {
            try {
                commit('FILTER_SCHOOLYEAR_POINT', filter);
                dispatch('getpoint');
            } catch (error) {
                console.error(error)
            }
        },
    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        GETBYIDPOINT(state, data) {
            try {
                state.getByIdpoint = data
            } catch (error) {
                console.log(error);
            }

        },
        GETSTUDENTIDPOINT(state, data) {
            try {
                state.pointStudentId = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_POINT(state, point) {
            try {
                state.point = point;
            } catch (error) {
                console.log(error);
            }
        },
        SET_POINT_ALL(state, pointAll) {
            try {
                state.pointAll = pointAll;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_POINT(state, id) {
            try {
                state.point = state.point.filter(item => item.PointId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_POINT(state, updateItem) {
            try {
                const index = state.point.findIndex(item => item.PointId === updateItem.PointId);
                if (index !== -1) {
                    state.point.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_POINT(state, newTeacher) {
            try {
                state.point.unshift(newTeacher)
            } catch (error) {
                console.log(error);
            }

        },
        //SET THỜI GIAN HIỂN THỊ loadingpoint DỮ LIỆU
        SET_LOADING_POINT(state) {
            try {
                state.loadingpoint = true;
                setTimeout(() => {
                    state.loadingpoint = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ KIỂM TRA CÁC CHECKBOX XEM ĐƯỢC CHỌN HAY CHƯA
        SELECT_ALL_POINT(state) {
            try {
                const allChecked = state.point.every(item => item.isChecked);

                state.point.forEach(item => {
                    item.isChecked = !allChecked;
                });

                state.checkAllpoint = !allChecked;
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ TRUYỀN CÁC ID VÀO 1 MẢNG PHỤC VỤ VIỆC XÓA NHIỀU BẢN GHI
        SELECTCHECKEDPOINT(state, id) {
            try {
                state.selectedItemspoint.push(id);
            } catch (error) {
                console.log(error);
            }

        },
        //phan trang
        SET_TOTAL_PAGES_POINT(state, totalRecordspoint) {
            try {
                state.totalRecordspoint = totalRecordspoint
            } catch (error) {
                console.log(error);
            }

        },
        SET_ALLPAGE_POINT(state, total) {
            try {
                state.totalPagespoint = total
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_NUMBER_POINT(state, pageNumberpoint) {
            try {
                state.pageNumberpoint = pageNumberpoint
            } catch (error) {
                console.log(error);
            }

        },
        SET_PAGE_POINT(state, newPage) {
            try {
                state.isHidepoint = !state.isHidepoint;
                state.pageSizespoint = newPage
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ ĐÓNG MỞ COMPONENTS
        HIDEPOINT(state) {
            try {
                state.isHidepoint = !state.isHidepoint
            } catch (error) {
                console.log(error);
            }

        },
        SHOW_FORM_POINT(state) {
            try {
                state.isshowpoint = !state.isshowpoint
            } catch (error) {
                console.log(error);
            }
        },
        ADD_MODE_POINT(state) {
            try {
                state.formModepoint = true
            } catch (error) {
                console.log(error);
            }

        },
        UPDATE_MODE_POINT(state) {
            try {
                state.formModepoint = false;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ UN CHECK CÁC CHECKBOX ĐÃ ĐƯỢC CLICK
        UN_CHECK_POINT(state) {
            try {
                state.point.map((item) => {
                    if (item.isChecked === true) {
                        item.isChecked = false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        SET_MAXCODE_POINT(state, pointmaxcode) {
            try {
                state.pointmaxcode = pointmaxcode
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_SUBJECTID_POINT(state, subjectId) {
            try {
                state.subjectId = subjectId;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_CLASSROOMID_POINT(state, classroomid) {
            try {
                state.classroomid = classroomid;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_SEMESTER_POINT(state, semesterId) {
            try {
                state.semesterId = semesterId;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_SCHOOLYEAR_POINT(state, schoolyearId) {
            try {
                state.schoolyearId = schoolyearId;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default pointModule;