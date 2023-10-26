import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/leader",
    element: <TemplateLeader />,
    // Các routes cho Leader
    children: [
      {
        path: "/leader/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/createAccount",
        element: <CreateAccount />,
      },
      {
        path: "/createSchedule",
        element: <CreateSchedule />,
      },
      {
        path: "/createClasses",
        element: <CreateClasses />,
      },
      {
        path: "/listUsers",
        element: <UsersManager />,
      },
      {
        path: "/listUsers/userDetail",
        element: <UserDetail />,
      },
      {
        path: "/createNotification",
        element: <CreateNotification />,
      },
      {
        path: "/historyNotifications",
        element: <LeaderHistoryNotifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <TemplateTeacher />,
    // Các routes cho Teacher
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/schedule",
        element: <TeacherSchedule />,
      },
      {
        path: "/listClasses",
        element: <ListClass />,
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
                    path: "attendance",
                    element: <Attendance />,
                  },
                  {
                    path: "lessonContent",
                    element: <LessonContent />,
                  },
                  {
                    path: "reschedule",
                    element: <Reschedule />,
                  },
                ],
              },
            ],
          },
          {
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
                path: "listAssignments/detail",
                element: <QuizDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "/createNotification",
        element: <CreateNotificationTeacher />,
      },
      {
        path: "/historyNotifications",
        element: <HistoryNotificationTeacher />,
      },
    ],
  },
  {
    path: "/student",
    element: <TemplateStudent />,
    // Các routes cho Student
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/schedule",
        element: <StudentSchedule />,
      },
      {
        path: "/listClassesOfStudent",
        element: <ListClassesStudent />,
      },
      {
        path: "/listClassesOfStudent/classDetail",
        element: <ClassDetailOfStudent />,
      },
      {
        path: "/historyNotifications",
        element: <HistoryNotificationStudent />,
      },
    ],
  },
]);

const userRole = localStorage.getItem("userRole");
const isUserLoggedIn = userRole !== null;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider
      router={
        isUserLoggedIn
          ? userRole === "Admin"
            ? router.find((route) => route.path.startsWith("/leader"))
            : userRole === "Teacher"
            ? router.find((route) => route.path.startsWith("/teacher"))
            : userRole === "Student"
            ? router.find((route) => route.path.startsWith("/student"))
            : null
          : router.find((route) => route.path === "/")
      }
    />
  </Provider>
);
