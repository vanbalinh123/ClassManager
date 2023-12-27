import { useState } from "react";

import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import { BsCalendarPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { LuBellPlus } from "react-icons/lu";

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

const SidebarLeader = () => {
  const [checkNoti, setCheckNoti] = useState(false);
  const [checkClass, setCheckClass] = useState(false);

  return (
    <Sidebar>
      <FlexNavLink to="/leader/dashboard">
        <Item>
          <AiOutlineDashboard size="20px" />
          <ItemName>Tổng quát</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createAccount">
        <Item>
          <BsPersonAdd size="20px" />
          <ItemName>Tạo tài khoản</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/schedule/new">
        <Item>
          <BsCalendar3 size="20px" />
          <ItemName>Tạo lịch dạy</ItemName>
        </Item>
      </FlexNavLink>
      {/* <FlexNavLink to="/leader/createClasses">
        <Item>
          <BsCalendarPlus size="20px" />
          <ItemName>Lớp học</ItemName>
        </Item>
      </FlexNavLink> */}
      <Div onClick={() => setCheckClass(!checkClass)}>
        <Item>
          <BsCalendarPlus size="20px" />
          <ItemName>Quản lý lớp học</ItemName>
        </Item>
      </Div>
      {checkClass === true && (
          <DivPopup>
            <NavlinkChild
              style={{ marginLeft: "10px", width: "80%" }}
              to="/leader/class"
            >
              <ItemPopup>
                <LuBellPlus size="20px" />
                <ItemName>Lớp học</ItemName>
              </ItemPopup>
            </NavlinkChild>
            <NavlinkChild
              style={{ marginLeft: "10px", width: "80%" }}
              to="/leader/tuition"
            >
              <ItemPopup>
                <LuBellPlus size="20px" />
                <ItemName>Học phí</ItemName>
              </ItemPopup>
            </NavlinkChild>
          </DivPopup>
        )}
      {/* <FlexNavLink to="/leader/tuition">
        <Item>
          <BsCalendarPlus size="20px" />
          <ItemName>Học phí</ItemName>
        </Item>
      </FlexNavLink> */}
      <FlexNavLink to="/leader/listUsers">
        <Item>
          <PiUsersThree size="20px" />
          <ItemName>Quản lý người dùng</ItemName>
        </Item>
      </FlexNavLink>
      <Div
        // to="/leader/createNotification"
        onClick={() => setCheckNoti(!checkNoti)}
      >
        <Item>
          <LuBellPlus size="20px" />
          <ItemName>Thông báo</ItemName>
        </Item>
      </Div>
      {checkNoti === true && (
        <DivPopup>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to="/leader/historyNotifications"
          >
            <ItemPopup>
              <LuBellPlus size="20px" />
              <ItemName>Lịch sử</ItemName>
            </ItemPopup>
          </NavlinkChild>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to="/leader/createNotification"
          >
            <ItemPopup>
              <LuBellPlus size="20px" />
              <ItemName>Gửi</ItemName>
            </ItemPopup>
          </NavlinkChild>
        </DivPopup>
      )}
    </Sidebar>
  );
};

export default SidebarLeader;
