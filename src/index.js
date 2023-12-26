import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import store from "./redux/store";


import Login from "./pages/login/login.component";

import "./index.css";

//general
import Profile from "./components/profile/profile.component";

//leader
import TemplateLeader from "./components/template/leadership/leadership.component";
import DashBoard from "./pages/leadership/dashboard/dashboard.component";
import CreateAccount from "./pages/leadership/account/createAccount.component";
import CreateSchedule from "./pages/leadership/schedule/schedule.component";
import CreateClasses from "./pages/leadership/crClass/classes.component";
import UsersManager from "./pages/leadership/usersManager/usersManager.component";
import UserDetail from "./pages/leadership/usersManager/listUsers/userDetail/userDetail.component";
import CreateNotification from "./pages/leadership/notifications/createNotification/createNotification.component";
import LeaderHistoryNotifications from "./pages/leadership/notifications/historyNotifications/historyNotifications.component";
import Tuition from "./pages/leadership/tuition/tuition.component";
import TuitionClass from "./pages/leadership/tuition/tuitionClass/tuitionClass.component";

//teacher
import TemplateTeacher from "./components/template/teacher/teacher.component";
import TeacherSchedule from "./pages/teacher/schedule/schedule.component";
import ListClass from "./pages/teacher/classManager/componentAllClass/allClass.component";
import ClassDetail from "./pages/teacher/classManager/classDetail/classDetail.component";
import Class from "./pages/teacher/classManager/classDetail/class/class.component";
import Students from "./pages/teacher/classManager/classDetail/students/students.component";
import ListLesson from "./pages/teacher/classManager/classDetail/class/listLesson/listLesson.component";
import OneLesson from "./pages/teacher/classManager/classDetail/class/oneLesson/onLesson.component";
import Attendance from "./pages/teacher/classManager/classDetail/class/oneLesson/attendance/attendance.component";
import LessonContent from "./pages/teacher/classManager/classDetail/class/oneLesson/lessonContent/lessonContent.component";
import Reschedule from "./pages/teacher/classManager/classDetail/class/oneLesson/reschedule/reschedule.component";
import ListAssignment from "./pages/teacher/classManager/classDetail/students/score/listAssignments.component";
import ListStudents from "./pages/teacher/classManager/classDetail/students/listStudents/listStudents.component";
import QuizDetail from "./pages/teacher/classManager/classDetail/students/score/quizDetail/quizDetail.component";
import CreateNotificationTeacher from "./pages/teacher/notification/createNotification/createNotification.component";
import HistoryNotificationTeacher from "./pages/teacher/notification/historyNotifications/historyNotifications.componet";

//student
import TemplateStudent from "./components/template/student/student.component";
import StudentSchedule from "./pages/student/scheduleStudent/scheduleStudent.component";
import ListClassesStudent from "./pages/student/ClassManagerStudent/ListClassesOfStudent/allClassesOfStudent.component";
import ClassDetailOfStudent from "./pages/student/ClassManagerStudent/classDetailOfStudent/classDetailOfStudent.component";
import HistoryNotificationStudent from "./pages/student/NotificationsOfStudent/HistoryNotificationsOfStudent/historyNotificationsOfStudent.component";


//parents
import TemplateParents from "./components/template/parents/parents.component";
import ParentsSchedule from './pages/parents/scheduleParents/scheduleParents.component'
import HistoryNotificationParents from "./pages/parents/NotificationsOfParents/HistoryNotificationsOfParents/historyNotificationsOfParents.component";
import ListClassesChild from "./pages/parents/ClassManagerParents/ListClassesOfChild/allClassesOfChild.component";
import ClassDetailOfChild from "./pages/parents/ClassManagerParents/classDetailOfChild/classDetailOfChild.component";

// const routerAdmin = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/leader",
//     element: <TemplateLeader />,
//     children: [
//       {
//         path: "/leader/dashboard",
//         element: <DashBoard />,
//       },
//       {
//         path: "/leader/createAccount",
//         element: <CreateAccount />,
//       },
//       {
//         path: "/leader/createSchedule",
//         element: <CreateSchedule />,
//       },
//       {
//         path: "/leader/createClasses",
//         element: <CreateClasses />,
//       },
//       {
//         path: "/leader/listUsers",
//         element: <UsersManager />,
//       },
//       {
//         path: "/leader/listUsers/userDetail",
//         element: <UserDetail />,
//       },
//       {
//         path: "/leader/createNotification",
//         element: <CreateNotification />,
//       },
//       {
//         path: "/leader/historyNotifications",
//         element: <LeaderHistoryNotifications />,
//       },
//       {
//         path: "/leader/profile",
//         element: <Profile />,
//       },
//     ],
//   },
// ]);

// const routerTeacher = createBrowserRouter([
//   // {
//   //   path: "/",
//   //   element: <Login />,
//   // },
//   {
//     path: "/teacher",
//     element: <TemplateTeacher />,
//     children: [
//       {
//         path: "/teacher/profile",
//         element: <Profile />,
//       },
//       {
//         path: "/teacher/schedule",
//         element: <TeacherSchedule />,
//       },
//       {
//         path: "/teacher/listClasses",
//         element: <ListClass />,
//       },
//       {
//         path: "/teacher/listClasses/classDetail",
//         element: <ClassDetail />,
//         children: [
//           {
//             element: <Class />,
//             children: [
//               {
//                 path: "listLesson",
//                 element: <ListLesson />,
//               },
//               {
//                 path: "listLesson/lesson",
//                 element: <OneLesson />,
//                 children: [
//                   {
//                     path: "attendance",
//                     element: <Attendance />,
//                   },
//                   {
//                     path: "lessonContent",
//                     element: <LessonContent />,
//                   },
//                   {
//                     path: "reschedule",
//                     element: <Reschedule />,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             // path: "student",
//             element: <Students />,
//             children: [
//               {
//                 path: "listStudents",
//                 element: <ListStudents />,
//               },
//               {
//                 path: "listAssignments",
//                 element: <ListAssignment />,
//               },
//               {
//                 path: "listAssignments/detail",
//                 element: <QuizDetail />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/teacher/createNotification",
//         element: <CreateNotificationTeacher />,
//       },
//       {
//         path: "/teacher/historyNotifications",
//         element: <HistoryNotificationTeacher />,
//       },
//     ],
//   },
// ]);

// const routerStudent = createBrowserRouter([
//   // {
//   //   path: "/",
//   //   element: <Login />,
//   // },
//   {
//     path: "/student",
//     element: <TemplateStudent />,
//     children: [
//       {
//         path: "/student/profile",
//         element: <Profile />,
//       },
//       {
//         path: "/student/schedule",
//         element: <StudentSchedule />,
//       },
//       {
//         path: "/student/listClassesOfStudent",
//         element: <ListClassesStudent />,
//       },
//       {
//         path: "/student/listClassesOfStudent/classDetail",
//         element: <ClassDetailOfStudent />,
//       },
//       {
//         path: "/student/historyNotifications",
//         element: <HistoryNotificationStudent />,
//       },
//     ],
//   },
// ]);

// const routerLogin = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ])

// const userRole = JSON.parse(localStorage.getItem("userRole"));

// const ErrorPage = () => {
//   const naviage = useNavigate();

//   const backToLogin = () => {
//     naviage("/");
//   };
//   return (
//     <>
//       {userRole !== null && (
//         <div>
//           <h1>May khong co quyen vao day</h1>
//           <div onClick={() => backToLogin()}>Click here to login again</div>
//         </div>
//       )|| (
//         <div>Loading</div>
//       )}
      
//     </>
//   );
// };

// const leaderElement = userRole === "Admin" ? <TemplateLeader /> : <ErrorPage />;
// const teacherElement =
//   userRole === "Teacher" ? <TemplateTeacher /> : <ErrorPage />;
// const studentElement =
//   userRole === "Student" ? <TemplateStudent /> : <ErrorPage />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/leader",
    element: <TemplateLeader />,
    children: [
      {
        path: "/leader/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/leader/createAccount",
        element: <CreateAccount />,
      },
      {
        path: "/leader/createSchedule/:classCode",
        element: <CreateSchedule />,
      },
      {
        path: "/leader/createClasses",
        element: <CreateClasses />,
      },
      {
        path: "/leader/listUsers",
        element: <UsersManager />,
      },
      {
        path: "/leader/listUsers/userDetail/:role/:usercode",
        element: <UserDetail />,
      },
      {
        path: "/leader/createNotification",
        element: <CreateNotification />,
      },
      {
        path: "/leader/historyNotifications",
        element: <LeaderHistoryNotifications />,
      },
      {
        path: "/leader/tuition",
        element: <Tuition />
      },
      {
        path: "/leader/tuition/:classCode",
        element: <TuitionClass />
      },
      {
        path: "/leader/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <TemplateTeacher />,
    children: [
      {
        path: "/teacher/profile",
        element: <Profile />,
      },
      {
        path: "/teacher/schedule",
        element: <TeacherSchedule />,
      },
      {
        path: "/teacher/listClasses",
        element: <ListClass />,
      },
      {
        path: "/teacher/listClasses/classDetail/:classCode",
        element: <ClassDetail />,
        children: [
          {
            element: <Class />,
            children: [
              {
                path: "listLesson",
                element: <ListLesson />,
              },
              {
                path: "listLesson/lesson",
                element: <OneLesson />,
                children: [
                  {
                    path: "attendance/:idSession",
                    element: <Attendance />,
                  },
                  {
                    path: "lessonContent/:idSession",
                    element: <LessonContent />,
                  },
                  {
                    path: "reschedule/:idSession",
                    element: <Reschedule />,
                  },
                ],
              },
            ],
          },
          {
            // path: "student",
            element: <Students />,
            children: [
              {
                path: "listStudents",
                element: <ListStudents />,
              },
              {
                path: "listAssignments",
                element: <ListAssignment />,
              },
              {
                path: "listAssignments/:idTest",
                element: <QuizDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "/teacher/createNotification",
        element: <CreateNotificationTeacher />,
      },
      {
        path: "/teacher/historyNotifications",
        element: <HistoryNotificationTeacher />,
      },
    ],
  },
  {
    path: "/student",
    element: <TemplateStudent />,
    children: [
      {
        path: "/student/profile",
        element: <Profile />,
      },
      {
        path: "/student/schedule",
        element: <StudentSchedule />,
      },
      {
        path: "/student/listClassesOfStudent",
        element: <ListClassesStudent />,
      },
      {
        path: "/student/listClassesOfStudent/:classCode",
        element: <ClassDetailOfStudent />,
      },
      {
        path: "/student/historyNotifications/:roleNoti",
        element: <HistoryNotificationStudent />,
      },
    ],
  },
  {
    path: '/parents',
    element: <TemplateParents />,
    children: [
      {
        path: "/parents/profile",
        element: <Profile />
      },
      {
        path: '/parents/schedule',
        element: <ParentsSchedule />
      },
      {
        path: '/parents/listClassesOfChild',
        element: <ListClassesChild />
      },
      {
        path: '/parents/listClassesOfChild/:userCodeStudent/:classCode',
        element: <ClassDetailOfChild />
      },
      {
        path: '/parents/historyNotifications/:roleNoti',
        element: <HistoryNotificationParents />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
