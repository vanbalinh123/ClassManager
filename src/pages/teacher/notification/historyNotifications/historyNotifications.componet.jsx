import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {IoAddSharp} from "react-icons/io5";
import { useListNotiTeacherQuery } from "../../../../redux/api/teacher/teacher-notifications-api.slice";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useListNotiAdminQuery } from "../../../../redux/api/leader/admin-notifications.slice";

import FilterNotifications from "./filterNotifications/filterNotifications.component";
import ListNotifications from "./listNotifications/listNotifications.comonent";

import { Page, Title } from "../../../../generalCss/shared.styles";

import { DivBtn, Btn } from "./historyNotifications.styles";

const fetchNotifications = async (role, search) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/${role}/notifications/?search=${search}`
  );
  const data = await response.json();
  return data;
};

const HistoryNotificationTeacher = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("sent");
  const [valueSearch, setValueSearch] = useState("");
  const userCode = JSON.parse(localStorage.getItem("user_code"));
  const { data: listNotiTeacher } = useListNotiTeacherQuery({search: `${valueSearch}`});
  // const { data: listNotiAdmin } = useListNotiAdminQuery({search: `${valueSearch}`})
  const { data: listSchedule } = useListSchedulesQuery();
  const [listNotiAdmin, setListNotiAdmin] = useState([]);


  let listTeacherSchedules = listSchedule?.filter(
    (item) => item.teacher_code === userCode
  );
  
  let listTeacherNotifications = listNotiTeacher?.filter((notification) =>
    listTeacherSchedules?.some((schedule) =>
      schedule.class_code.includes(notification.class_code[0])
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminNotifications = await fetchNotifications(
          "admin",
          valueSearch
        );

        const isNewNotification =
          adminNotifications?.length !== listNotiAdmin?.length;

        setListNotiAdmin(adminNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [valueSearch, listNotiTeacher?.length, listNotiAdmin?.length]);

  let listAdminNotifications = listNotiAdmin?.filter(item => item.role === 'teacher');
  return (
    <Page>
      <Title>Lịch sử thông báo</Title>
      {/* <DivBtn>
        <Btn
            onClick={() => navigate('/teacher/createNotification')}
        >
            <IoAddSharp size="15px" />
            Create
        </Btn>
      </DivBtn> */}
      <FilterNotifications 
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setValueSearch={setValueSearch}
      />
      <ListNotifications 
        listTeacherNotifications={listTeacherNotifications}
        listAdminNotifications={listAdminNotifications}
        selectedValue={selectedValue}
        valueSearch={valueSearch}
      />
    </Page>
  );
};

export default HistoryNotificationTeacher;
