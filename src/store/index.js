import admin from './module/admin';
import account from './module/account';
import classroom from './module/classroom';
import grade from './module/grade';
import point from './module/point';
import schoolyear from './module/schoolyear';
import semester from './module/semester';
import student from './module/student';
import subject from './module/subject';
import teacher from './module/teacher';
import timetable from './module/timetable';
import user from './module/user';

import { createStore } from 'vuex';

const store = createStore({
    modules: {
        admin,
        account,
        classroom,
        grade,
        point,
        schoolyear,
        semester,
        student,
        subject,
        teacher,
        timetable,
        user
    }
});
export default store;