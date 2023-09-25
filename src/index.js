import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
import ListClass from "./pages/teacher/classManager/allClass.component";
import ClassDetail from "./pages/teacher/classManager/classDetail/classDetail.component";
import Class from "./pages/teacher/classManager/classDetail/class/class.component";
import Students from "./pages/teacher/classManager/classDetail/students/students.component";
import ListLesson from "./pages/teacher/classManager/classDetail/class/listLesson/listLesson.component";
import OneLesson from "./pages/teacher/classManager/classDetail/class/oneLesson/onLesson.component";
import Attendance from "./pages/teacher/classManager/classDetail/class/oneLesson/attendance/attendance.component";
import LessonContent from "./pages/teacher/classManager/classDetail/class/oneLesson/lessonContent/lessonContent.component";
import Reschedule from "./pages/teacher/classManager/classDetail/class/oneLesson/reschedule/reschedule.component";


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
        path: "/leader/createSchedule",
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
          path: "/leader/listUsers/userDetail",
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
        path: "/leader/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: '/teacher',
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
        path: "/teacher/listClasses/classDetail",
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
                ]
              }
            ]
          },
          {
            path: "student",
            element: <Students />,
            // children: [
            //   {
            //     path: "student",
            //     element: <AllStudent />,
            //   }
            // ]
          },
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
