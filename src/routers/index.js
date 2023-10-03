import { createRouter, createWebHistory } from 'vue-router';

import SignIn from '../components/auth/SignIn.vue';
import ForgotPassword from '../components/auth/ForgotPassword.vue';
import Admin from '../components/users/Admin.vue';
import User from '../components/users/User.vue';
import Classroom from '../pages/Classroom.vue';
import Grade from '../pages/Grade.vue';
import Account from '../pages/Account.vue';
import PointAll from '../pages/Point.vue';
import Schoolyear from '../pages/Schoolyear.vue';
import Semester from '../pages/Semester.vue';
import Student from '../pages/Student.vue';
import Subject from '../pages/Subject.vue';
import Teacher from '../pages/Teacher.vue';
import TimeTable from '../pages/TimeTable.vue';
import Conduct from '../pages/Conduct.vue';
import Information from '../pages/Information.vue';
import Statistic from '../pages/Statistic.vue';
import Assignments from '../pages/Assignments.vue';
import Feedback from '../pages/Feedback.vue';
const routes = [
    {
        path: '/',
        component: SignIn
    },
    {
        path: '/information',
        component: Information
    },
    {
        path: '/forgot',
        component: ForgotPassword
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/admin/grade',
        component: Grade
    },
    {
        path: '/admin/assignments',
        component: Assignments
    },
    {
        path: '/admin/feedback',
        component: Feedback
    },
    {
        path: '/admin/conduct',
        component: Conduct
    },
    {
        path: '/admin/classroom',
        component: Classroom
    },
    {
        path: '/admin/statistic',
        component: Statistic
    },
    {
        path: '/admin/account',
        component: Account
    },
    {
        path: '/admin/point',
        component: PointAll
    },
    {
        path: '/admin/schoolyear',
        component: Schoolyear
    },
    {
        path: '/admin/semester',
        component: Semester
    },
    {
        path: '/admin/student',
        component: Student
    },
    {
        path: '/admin/subject',
        component: Subject
    },
    {
        path: '/admin/teacher',
        component: Teacher
    },
    {
        path: '/admin/timetable',
        component: TimeTable
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;