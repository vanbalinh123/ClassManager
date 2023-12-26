// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { IoAddSharp } from "react-icons/io5";
// import { useListNotiAdminQuery } from "../../../../redux/api/leader/admin-notifications.slice";
// import { useListNotiTeacherQuery } from "../../../../redux/api/teacher/teacher-notifications-api.slice";
// import { useListInforClassQuery } from "../../../../redux/api/teacher/class-information-api";

// import FilterNotificationsOfStudent from "./filterNotificationsOfStudent/filterNotificationsOfStudent.component";
// import ListNotificationsOfStudent from "./listNotificationsOfStudent/listNotificationsOfStudent.component";
// import { Page, Title } from "../../../../generalCss/shared.styles";



// const HistoryNotificationStudent = () => {
//   const [selectedValue, setSelectedValue] = useState("teacher");
//   const [valueSearch, setValueSearch] = useState("");
//   const { roleNoti } = useParams();
//   const userCode = JSON.parse(localStorage.getItem("user_code"));
//   const { data: listNotiTeacher } = useListNotiTeacherQuery({
//     search: `${valueSearch}`,
//   });
//   const { data: listNotiAdmin } = useListNotiAdminQuery({
//     search: `${valueSearch}`,
//   });
//   const { data: listClassInfo } = useListInforClassQuery();

//   let listAdminNotifications = listNotiAdmin?.filter(
//     (item) => item.role === "student"
//   );

//   const arrayClassOfStudent =
//     listClassInfo
//       ?.filter((item) => item.students.includes(userCode))
//       .map((item) => item.class_info) || [];

//   const listTeacherNotifications =
//     listNotiTeacher?.filter((item) =>
//       arrayClassOfStudent.includes(item.class_code[0])
//     ) || [];




//   return (
//     <Page>
//       <Title>LỊCH SỬ THÔNG BÁO</Title>
//       <FilterNotificationsOfStudent
//         selectedValue={selectedValue}
//         setSelectedValue={setSelectedValue}
//         setValueSearch={setValueSearch}
//       />
//       <ListNotificationsOfStudent
//         listAdminNotifications={listAdminNotifications}
//         listTeacherNotifications={listTeacherNotifications}
//         roleNoti={roleNoti}
//       />
//        {/* <ListNotificationsOfStudent
//         notifications={notifications}
//         roleNoti={roleNoti}
//       /> */}
//     </Page>
//   );
// };

// export default HistoryNotificationStudent;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterNotificationsOfStudent from "./filterNotificationsOfStudent/filterNotificationsOfStudent.component";
import ListNotificationsOfStudent from "./listNotificationsOfStudent/listNotificationsOfStudent.component";
import { Page, Title } from "../../../../generalCss/shared.styles";

const fetchNotifications = async (role, search) => {
  const response = await fetch(`http://127.0.0.1:8000/api/${role}/notifications/?search=${search}`);
  const data = await response.json();
  return data;
};

const HistoryNotificationStudent = () => {
  const [selectedValue, setSelectedValue] = useState("teacher");
  const [valueSearch, setValueSearch] = useState("");
  const { roleNoti } = useParams();
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const [listNotiTeacher, setListNotiTeacher] = useState([]);
  const [listNotiAdmin, setListNotiAdmin] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  // const { data: listClassInfo } = useListInforClassQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherNotifications = await fetchNotifications("teacher", valueSearch);
        const adminNotifications = await fetchNotifications("admin", valueSearch);

        const isNewNotification =
          teacherNotifications.length !== listNotiTeacher.length ||
          adminNotifications.length !== listNotiAdmin.length;

        setListNotiTeacher(teacherNotifications);
        setListNotiAdmin(adminNotifications);

        if (isNewNotification) {
          setShowAlert(true);
          // Save the count of new notifications to local storage
          const newNotificationsCount = localStorage.getItem("newNotificationsCount");
          localStorage.setItem("newNotificationsCount", parseInt(newNotificationsCount || 0) + 1);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [valueSearch, listNotiTeacher.length, listNotiAdmin.length]);

  // Function to handle clicking on a notification
  const handleNotificationClick = () => {
    // Decrement the count of new notifications
    const newNotificationsCount = localStorage.getItem("newNotificationsCount");
    localStorage.setItem("newNotificationsCount", Math.max(parseInt(newNotificationsCount || 0) - 1, 0));
    setShowAlert(false);
  };

  return (
    <Page>
      <Title>LỊCH SỬ THÔNG BÁO</Title>
      <FilterNotificationsOfStudent
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setValueSearch={setValueSearch}
      />
      <ListNotificationsOfStudent
        listAdminNotifications={listNotiAdmin}
        listTeacherNotifications={listNotiTeacher}
        roleNoti={roleNoti}
        onNotificationClick={handleNotificationClick}
      />
      {showAlert && (
        <div className="alert" onClick={handleNotificationClick}>
          New notifications received! Click to dismiss.
        </div>
      )}
    </Page>
  );
};

export default HistoryNotificationStudent;
