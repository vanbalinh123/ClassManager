import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterNotificationsOfStudent from "./filterNotificationsOfStudent/filterNotificationsOfStudent.component";
import ListNotificationsOfStudent from "./listNotificationsOfStudent/listNotificationsOfStudent.component";
import { useListInforClassQuery } from "../../../../redux/api/teacher/class-information-api";
import { Page, Title } from "../../../../generalCss/shared.styles";

const fetchNotifications = async (role, search) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/${role}/notifications/?search=${search}`
  );
  const data = await response.json();
  return data;
};

const HistoryNotificationStudent = () => {
  const [selectedValue, setSelectedValue] = useState("teacher");
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const { data: listClassInfo } = useListInforClassQuery();

  const [valueSearch, setValueSearch] = useState("");
  const { roleNoti } = useParams();
  const [listNotiTeacher, setListNotiTeacher] = useState([]);
  const [listNotiAdmin, setListNotiAdmin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherNotifications = await fetchNotifications(
          "teacher",
          valueSearch
        );
        const adminNotifications = await fetchNotifications(
          "admin",
          valueSearch
        );

        const isNewNotification =
          teacherNotifications.length !== listNotiTeacher.length ||
          adminNotifications.length !== listNotiAdmin.length;

        setListNotiTeacher(teacherNotifications);
        setListNotiAdmin(adminNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [valueSearch, listNotiTeacher.length, listNotiAdmin.length]);

  const listAdminNotifications =
    listNotiAdmin?.filter((item) => item.role === "student") || [];
    
  const arrayClassOfStudent =
    listClassInfo
      ?.filter((item) => item.students.includes(userCode))
      .map((item) => item.class_info) || [];

  const listTeacherNotifications =
    listNotiTeacher?.filter((item) =>
      arrayClassOfStudent.includes(item.class_code[0])
    ) || [];

  return (
    <Page>
      <Title>LỊCH SỬ THÔNG BÁO</Title>
      <FilterNotificationsOfStudent
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setValueSearch={setValueSearch}
      />
      <ListNotificationsOfStudent
        listAdminNotifications={listAdminNotifications}
        listTeacherNotifications={listTeacherNotifications}
        roleNoti={roleNoti}
      />
    </Page>
  );
};

export default HistoryNotificationStudent;
