import axios from "axios";
import { saveAs } from 'file-saver';
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const informModule = {
    state: {
        inform: [],
        getByIdInform: [],
        getstudentidinform: [],
        loadinginform: false,
        checkAllinform: false,
        isshowinform: false,
        isHideinform: false,
    },
    getters: {
        inform: state => state.inform,
        getByIdInform: state => state.getByIdInform,
        getstudentidinform: state => state.getstudentidinform,
        checkAllinform: state => state.checkAllinform,
        isshowinform: state => state.isshowinform,
    },
    actions: {
        async getInform({ commit }) {
            try {
                const res = await axios.get(`${API_BASE_URL}Infroms`)
                commit('SET_INFORM', res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async exportExcelInform() {
            try {
                const response = await axios.get(`${API_BASE_URL}Infroms/ExportData`, {
                    responseType: 'blob' // Bắt buộc thêm option responseType là 'blob' để server trả về kiểu dữ liệu blob
                });

                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tạo blob từ dữ liệu trả về và type là Excel
                console.log(response.status);
                saveAs(blob, 'Inform.xlsx'); // Lưu file Excel với tên employees.xlsx
            } catch (error) {
                console.log(error);
            }
        },
        async addinform({ commit, dispatch }, newStaff) {
            try {
                const res = await axios.post(`${API_BASE_URL}Infroms/`, newStaff)
                //commit('SETTEXTCHECK', res.data.notify)
                commit('ADD_INFORM', newStaff)
                dispatch('getInform');
                console.log('aaa', res.data.notify);
            } catch (error) {
                console.log(error);
            }
        },
        /**TẠO MỘT HÀM DÙNG ĐỂ XÓA DỮ LIỆU SỬ DỤNG ASYNC AWAIT VÀ AXIOS */
        async deleteinform({ commit, dispatch }, InformId) {
            //commit('DELETE_TODO', id)
            try {
                const response = await axios.delete(`${API_BASE_URL}Infroms/${InformId}`)
                if (response.status === 200) {
                    commit('DELETE_INFORM', InformId);
                    dispatch('getInform');
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMultipleinform({ commit, dispatch }, InformIds) {
            try {
                // Gọi API để xóa employees
                const response = await axios.delete(`${API_BASE_URL}Infroms`, { data: InformIds });

                // Nếu xóa thành công, commit mutation để xóa employees khỏi state
                if (response.status === 200) {
                    commit('DELETE_INFORM', InformIds);
                    dispatch('getInform');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateIteminform({ commit, dispatch }, updateChildren) {
            try {
                // Tạo một mảng chứa các promise của các yêu cầu PUT
                const updatePromises = updateChildren.map(updateChild => {
                    return axios.put(`${API_BASE_URL}Infroms/${updateChild.InformId}`, updateChild);
                });

                // Sử dụng Promise.all để đợi tất cả các yêu cầu PUT hoàn thành
                const responses = await Promise.all(updatePromises);

                // Lặp qua các response và cập nhật store hoặc thực hiện các công việc khác
                responses.forEach(response => {
                    commit('UPDATE_INFORM', response.data);
                });

                dispatch('getInform');
            } catch (error) {
                console.log(error);
            }
        },

        async getIDinform({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Infroms/${object.InformId}`)
                commit('getByIdInform', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getStudentIDinform({ commit }, object) {
            try {
                const response = await axios.get(`${API_BASE_URL}Infroms/StudentId?recordId=${object.studentId}`)
                commit('getstudentidinform', response.data)
            } catch (error) {
                console.log(error)
            }
        },
    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        getByIdInform(state, data) {
            try {
                state.getByIdInform = data
            } catch (error) {
                console.log(error);
            }

        },
        getstudentidinform(state, data) {
            try {
                state.getstudentidinform = data
            } catch (error) {
                console.log(error);
            }

        },
        SET_INFORM(state, inform) {
            try {
                state.inform = inform;
            } catch (error) {
                console.log(error);
            }
        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG XÓA DỮ LIỆU 
        DELETE_INFORM(state, id) {
            try {
                state.inform = state.inform.filter(item => item.InformId !== id)
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG CẬP NHẬT DỮ LIỆU MỚI
        UPDATE_INFORM(state, updateItem) {
            try {
                const index = state.inform.findIndex(item => item.InformId === updateItem.InformId);
                if (index !== -1) {
                    state.inform.splice(index, 1, updateItem);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //DÙNG ĐỂ THAO TÁC CHO CHỨC NĂNG THÊM DỮ LIỆU MỚI
        ADD_INFORM(state, newInform) {
            try {
                state.inform.unshift(newInform)
            } catch (error) {
                console.log(error);
            }

        }
    }
}
export default informModule;