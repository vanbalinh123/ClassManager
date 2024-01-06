import { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClipboard } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { FaSchool } from "react-icons/fa";

import { Sidebar, Item, ItemName, FlexNavLink, Div, DivPopup, ItemPopup, NavlinkChild } from "../sidebar.styles";

const SidebarParents = () => {
  const [checkNoti, setCheckNoti] = useState(false);
    return (
        <Sidebar>
          <FlexNavLink to="/parents/schedule">
            <Item>
              <AiOutlineSchedule size="20px" />
              <ItemName>Lịch học</ItemName>
            </Item>
          </FlexNavLink>
          <FlexNavLink to="listClassesOfChild">
            <Item>
              <FaRegClipboard size="20px" />
              <ItemName>Lớp học</ItemName>
            </Item>
          </FlexNavLink>
          {/* <FlexNavLink to='historyNotifications'>
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
            to={`historyNotifications/admin`}
          >
            <ItemPopup>
              <FaSchool size="20px" />
              <ItemName>Nhà trường</ItemName>
            </ItemPopup>
          </NavlinkChild>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to={`historyNotifications/teacher`}
          >
            <ItemPopup>
              <GiTeacher size="20px" />
              <ItemName>Giáo viên</ItemName>
            </ItemPopup>
          </NavlinkChild>
        </DivPopup>
      )}
        </Sidebar>
      );
}

export default SidebarParents;