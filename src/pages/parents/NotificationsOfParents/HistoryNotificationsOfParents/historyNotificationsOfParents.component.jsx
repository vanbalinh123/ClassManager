import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { useListNotiAdminQuery } from "../../../../redux/api/leader/admin-notifications.slice";
import { useListNotiTeacherQuery } from "../../../../redux/api/teacher/teacher-notifications-api.slice";
import { useListInforClassQuery } from "../../../../redux/api/teacher/class-information-api";
import { useListParentsQuery } from "../../../../redux/api/leader/list-users-api.slice";

import FilterNotificationsOfParents from "./filterNotificationsOfParents/filterNotificationsOfParents.component";
import ListNotificationsOfParents from "./listNotificationsOfParents/listNotificationsOfParents.component";
import { Page, Title } from "../../../../generalCss/shared.styles";

const fetchNotifications = async (role, search) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/${role}/notifications/?search=${search}`
  );
  const data = await response.json();
  return data;
};

const HistoryNotificationParents = () => {
  const [selectedValue, setSelectedValue] = useState("teacher");
  const [valueSearch, setValueSearch] = useState("");
  const { roleNoti } = useParams();
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const { data: listParents } = useListParentsQuery();
  const { data: listClassInfo } = useListInforClassQuery();

  // const { data: listNotiTeacher } = useListNotiTeacherQuery({
  //   search: `${valueSearch}`,
  // });
  // const { data: listNotiAdmin } = useListNotiAdminQuery({
  //   search: `${valueSearch}`,
  // });
  // const { data: listClassInfo } = useListInforClassQuery();

  // let listAdminNotifications = listNotiAdmin?.filter(
  //   (item) => item.role === "parent"
  // );

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

  const listSt = listParents?.find(
    (item) => item.usercode === userCode
  )?.student;

  let arrayClassOfStudent = [];

  listSt?.forEach((student) => {
    const classesOfStudent =
      listClassInfo
        ?.filter((item) => item.students.includes(student))
        .map((item) => item.class_info) || [];

    arrayClassOfStudent.push(...classesOfStudent);
  });

  const listTeacherNotifications =
    listNotiTeacher?.filter((item) =>
      arrayClassOfStudent.includes(item.class_code[0])
    ) || [];

  const listAdminNotifications =
    listNotiAdmin?.filter((item) => item.role === "parent") || [];

  return (
    <Page>
      <Title>Lịch sử thông báo</Title>
      <FilterNotificationsOfParents
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setValueSearch={setValueSearch}
      />
      <ListNotificationsOfParents
        listAdminNotifications={listAdminNotifications}
        listTeacherNotifications={listTeacherNotifications}
        roleNoti={roleNoti}
      />
    </Page>
  );
};

export default HistoryNotificationParents;
