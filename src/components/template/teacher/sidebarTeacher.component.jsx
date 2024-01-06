import { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClipboard } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import { RiMailSendLine } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";


import { Sidebar, Item, ItemName, FlexNavLink, Div, DivPopup, ItemPopup, NavlinkChild } from "../sidebar.styles";

const SidebarTeacher = () => {
  const [checkNoti, setCheckNoti] = useState(false);

  return (
    <Sidebar>
      <FlexNavLink to='schedule'>
        <Item>
          <AiOutlineSchedule size="20px" />
          <ItemName>Lịch dạy</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to='listClasses'>
        <Item>
          <FaRegClipboard size="20px" />
          <ItemName>Quản lý lớp học</ItemName>
        </Item>
      </FlexNavLink>
      {/* <FlexNavLink to='/teacher/historyNotifications'>
        <Item>
          <LuBell size="20px" />
          <ItemName>Notifications</ItemName>
        </Item>
      </FlexNavLink> */}
      <Div
        onClick={() => setCheckNoti(!checkNoti)}
      >
        <Item>
          <LuBell size="20px" />
          <ItemName>Thông báo</ItemName>
        </Item>
      </Div>
      {checkNoti === true && (
        <DivPopup>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to="/teacher/historyNotifications"
          >
            <ItemPopup>
              <LuHistory size="20px" />
              <ItemName>Lịch sử</ItemName>
            </ItemPopup>
          </NavlinkChild>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to="/teacher/createNotification"
          >
            <ItemPopup>
              <RiMailSendLine  size="20px" />
              <ItemName>Gửi</ItemName>
            </ItemPopup>
          </NavlinkChild>
        </DivPopup>
      )}
    </Sidebar>
  );
};

export default SidebarTeacher;

