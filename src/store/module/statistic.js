import axios from "axios";
const API_BASE_URL = 'https://localhost:7199/api/v2/';

const pointModule = {
    state: {
        pointResaultAll: [],
        pointResaultSchoolyear: [],
        pointBarMultip: [],
        loadingstatistic: false,
        classroomidResault: '677132b4-2a33-68d1-26c2-579daad24557',
        schoolyearIdResault: '17ae2be6-2c6a-5cab-3bcb-6f55ff55ddab',
        barschoolyear: '17ae2be6-2c6a-5cab-3bcb-6f55ff55ddab'
    },
    getters: {
        pointResaultAll: state => state.pointResaultAll,
        loadingstatistic: state => state.loadingstatistic,
        pointBarMultip: state => state.pointBarMultip,
        pointResaultSchoolyear: state => state.pointResaultSchoolyear
    },
    actions: {
        async getpointresaultAll({ commit, state }) {
            try {
                commit('SET_LOADING_POINTRESAULT')
                const response = await axios.get(`${API_BASE_URL}Points/ResaultAll?classRoomId=${state.classroomidResault}&schoolYearId=${state.schoolyearIdResault}`)
                commit('GETPOINTRESAULTALL', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getpointresaultSchoolyear({ commit, state }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/ResaultChoolYear?schoolYearId=${state.schoolyearIdResault}`)
                commit('GETPOINTRESAULTSCHOOLYEAR', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getpointbarmultip({ commit, state }) {
            try {
                const response = await axios.get(`${API_BASE_URL}Points/BarMultip?schoolYearId=${state.barschoolyear}`)
                commit('GETPOINTBAR', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async setFilterschoolyearResaultall({ commit, dispatch }, filter) {
            try {
                commit('FILTER_SCHOOLYEARID_RESAULTALL', filter);
                dispatch('getpointresaultSchoolyear');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterbarschoolyear({ commit, dispatch }, filter) {
            try {
                commit('FILTER_SCHOOLYEARID_BAR', filter);
                dispatch('getpointbarmultip');
            } catch (error) {
                console.error(error)
            }
        },
        async setFilterclassroomResaultall({ commit, dispatch }, filter) {
            try {
                commit('FILTER_CLASSROOMID_RESAULTALL', filter);
                dispatch('getpointresaultSchoolyear');
            } catch (error) {
                console.error(error)
            }
        },

    },
    //MUTATIONS DÙNG ĐỂ THAO TÁC(thay doi trang thai state) VỚI STATE TRONG STORE
    mutations: {
        //SET THỜI GIAN HIỂN THỊ loadingpoint DỮ LIỆU
        SET_LOADING_POINTRESAULT(state) {
            try {
                state.loadingstatistic = true;
                setTimeout(() => {
                    state.loadingstatistic = false
                }, 990)
            } catch (error) {
                console.log(error);
            }

        },
        GETPOINTRESAULTALL(state, data) {
            try {
                state.pointResaultAll = data
            } catch (error) {
                console.log(error);
            }

        },
        GETPOINTBAR(state, data) {
            try {
                state.pointBarMultip = data
            } catch (error) {
                console.log(error);
            }

        },
        GETPOINTRESAULTSCHOOLYEAR(state, data) {
            try {
                state.pointResaultSchoolyear = data
            } catch (error) {
                console.log(error);
            }

        },
        FILTER_CLASSROOMID_RESAULTALL(state, classroomidResault) {
            try {
                state.classroomidResault = classroomidResault;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_SCHOOLYEARID_RESAULTALL(state, schoolyearIdResault) {
            try {
                state.schoolyearIdResault = schoolyearIdResault;
            } catch (error) {
                console.log(error);
            }
        },
        FILTER_SCHOOLYEARID_BAR(state, barschoolyear) {
            try {
                state.barschoolyear = barschoolyear;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
export default pointModule;