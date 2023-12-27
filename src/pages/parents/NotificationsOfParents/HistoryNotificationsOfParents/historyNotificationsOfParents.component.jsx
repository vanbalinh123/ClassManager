import { useState } from "react";
import { useParams } from "react-router-dom";
import {IoAddSharp} from "react-icons/io5";
import { useListNotiAdminQuery } from "../../../../redux/api/leader/admin-notifications.slice";
import { useListNotiTeacherQuery } from "../../../../redux/api/teacher/teacher-notifications-api.slice";
import { useListInforClassQuery } from "../../../../redux/api/teacher/class-information-api";

import FilterNotificationsOfParents from "./filterNotificationsOfParents/filterNotificationsOfParents.component";
import ListNotificationsOfParents from "./listNotificationsOfParents/listNotificationsOfParents.component";
import { Page, Title } from "../../../../generalCss/shared.styles";


const HistoryNotificationParents = () => {
  const [selectedValue, setSelectedValue] = useState("teacher");
  const [valueSearch, setValueSearch] = useState("");
  const {roleNoti} = useParams();
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const { data: listNotiTeacher } = useListNotiTeacherQuery({
    search: `${valueSearch}`,
  });
  const { data: listNotiAdmin } = useListNotiAdminQuery({
    search: `${valueSearch}`,
  });
  const { data: listClassInfo } = useListInforClassQuery();

  let listAdminNotifications = listNotiAdmin?.filter(
    (item) => item.role === "parent"
  );

  console.log(listAdminNotifications)

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