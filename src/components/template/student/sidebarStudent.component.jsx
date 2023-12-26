import { useState, useEffect } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClipboard } from "react-icons/fa";
import { LuBell } from "react-icons/lu";

import {
  Sidebar,
  Item,
  ItemName,
  FlexNavLink,
  Div,
  DivPopup,
  ItemPopup,
  NavlinkChild,
} from "../sidebar.styles";

const SidebarStudent = () => {
  const [checkNoti, setCheckNoti] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  useEffect(() => {
    // Fetch the count of new notifications from local storage
    const count = localStorage.getItem("newNotificationsCount");
    setNewNotificationsCount(parseInt(count) || 0);

    // Set up an interval to periodically update the new notifications count
    const intervalId = setInterval(() => {
      const updatedCount = localStorage.getItem("newNotificationsCount");
      setNewNotificationsCount(parseInt(updatedCount) || 0);
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Sidebar>
      <FlexNavLink to="/student/schedule">
        <Item>
          <AiOutlineSchedule size="20px" />
          <ItemName>Lịch học</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="listClassesOfStudent">
        <Item>
          <FaRegClipboard size="20px" />
          <ItemName>Lớp học</ItemName>
        </Item>
      </FlexNavLink>
      <Div onClick={() => setCheckNoti(!checkNoti)}>
        <Item>
          <LuBell size="20px" />
          <ItemName>Thông báo</ItemName>
          {newNotificationsCount > 0 && <span>({newNotificationsCount})</span>}
        </Item>
      </Div>
      {checkNoti === true && (
        <DivPopup>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to={`historyNotifications/admin`}
          >
            <ItemPopup>
              <LuBell size="20px" />
              <ItemName>Lãnh đạo</ItemName>
            </ItemPopup>
          </NavlinkChild>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to={`historyNotifications/teacher`}
          >
            <ItemPopup>
              <LuBell size="20px" />
              <ItemName>Giáo viên</ItemName>
            </ItemPopup>
          </NavlinkChild>
        </DivPopup>
      )}
    </Sidebar>
  );
};

export default SidebarStudent;
