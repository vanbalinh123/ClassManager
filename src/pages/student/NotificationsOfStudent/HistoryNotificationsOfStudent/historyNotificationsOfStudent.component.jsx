import { useState } from "react";

import { IoAddSharp } from "react-icons/io5";
import { useListNotiAdminQuery } from "../../../../redux/api/leader/admin-notifications.slice";
import { useListNotiTeacherQuery } from "../../../../redux/api/teacher/teacher-notifications-api.slice";
import { useListInforClassQuery } from "../../../../redux/api/teacher/class-information-api";

import FilterNotificationsOfStudent from "./filterNotificationsOfStudent/filterNotificationsOfStudent.component";
import ListNotificationsOfStudent from "./listNotificationsOfStudent/listNotificationsOfStudent.component";
import { Page, Title } from "../../../../generalCss/shared.styles";

const HistoryNotificationStudent = () => {
  const [selectedValue, setSelectedValue] = useState("teacher");
  const [valueSearch, setValueSearch] = useState("");
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const { data: listNotiTeacher } = useListNotiTeacherQuery({
    search: `${valueSearch}`,
  });
  const { data: listNotiAdmin } = useListNotiAdminQuery({
    search: `${valueSearch}`,
  });
  const { data: listClassInfo } = useListInforClassQuery();

  let listAdminNotifications = listNotiAdmin?.filter(
    (item) => item.role === "student"
  );

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
      <Title>Notifications History</Title>
      <FilterNotificationsOfStudent
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setValueSearch={setValueSearch}
      />
      <ListNotificationsOfStudent
        listAdminNotifications={listAdminNotifications}
        listTeacherNotifications={listTeacherNotifications}
        selectedValue={selectedValue}
      />
    </Page>
  );
};

export default HistoryNotificationStudent;
