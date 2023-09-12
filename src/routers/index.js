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
const routes = [
    {
        path: '/',
        component: SignIn
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
        path: '/admin/classroom',
        component: Classroom
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