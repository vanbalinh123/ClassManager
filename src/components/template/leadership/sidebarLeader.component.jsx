import { useState } from "react";

import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import { BsCalendarPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { LuBellPlus } from "react-icons/lu";

import { Sidebar, Item, ItemName, FlexNavLink, Div, DivPopup, ItemPopup, NavlinkChild } from "../sidebar.styles";


const SidebarLeader = () => {
  const [checkNoti, setCheckNoti] = useState(false);
  return (
    <Sidebar>
      <FlexNavLink to="/leader/dashboard">
        <Item>
          <AiOutlineDashboard size="20px" />
          <ItemName>Tổng quan</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createAccount">
        <Item>
          <BsPersonAdd size="20px" />
          <ItemName>Create Account</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createSchedule/new">
        <Item>
          <BsCalendar3 size="20px" />
          <ItemName>Teaching Schedule</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createClasses">
        <Item>
          <BsCalendarPlus size="20px" />
          <ItemName>Classes Management</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/listUsers">
        <Item>
          <PiUsersThree size="20px" />
          <ItemName>Users Management</ItemName>
        </Item>
      </FlexNavLink>
      <Div
        // to="/leader/createNotification"
        onClick={() => setCheckNoti(!checkNoti)}
      >
        <Item>
          <LuBellPlus size="20px" />
          <ItemName>Notifications</ItemName>
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
              <ItemName>History</ItemName>
            </ItemPopup>
          </NavlinkChild>
          <NavlinkChild
            style={{ marginLeft: "10px", width: "80%" }}
            to="/leader/createNotification"
          >
            <ItemPopup>
              <LuBellPlus size="20px" />
              <ItemName>Compose</ItemName>
            </ItemPopup>
          </NavlinkChild>
        </DivPopup>
      )}
    </Sidebar>
  );
};

export default SidebarLeader;
