import { useState } from "react";

import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import { BsCalendarPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { LuBellPlus } from "react-icons/lu";

import { Sidebar, Item, ItemName, FlexNavLink } from "../sidebar.styles";

const SidebarLeader = () => {
  const [checkNoti, setCheckNoti] = useState(false)
  return (
    <Sidebar>
      <FlexNavLink to="/leader/dashboard">
        <Item>
          <AiOutlineDashboard size="20px" />
          <ItemName>Dashboard</ItemName>
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
      <div 
        // to="/leader/createNotification"
        onClick={() => setCheckNoti(!checkNoti)}
      >
        <Item>
          <LuBellPlus size="20px" />
          <ItemName>Notifications</ItemName>
        </Item>
      </div>
      {checkNoti === true && 
        <FlexNavLink
        style={{marginLeft: '20px', width: '80%'}} 
        to="/leader/historyNotifications"
      >
        <Item>
          <LuBellPlus size="20px" />
          <ItemName>History Notifications</ItemName>
        </Item>
      </FlexNavLink>
      }
      {checkNoti === true && 
        <FlexNavLink
        style={{marginLeft: '20px', width: '80%'}} 
        to="/leader/createNotification"
      >
        <Item>
          <LuBellPlus size="20px" />
          <ItemName>Create Notifications</ItemName>
        </Item>
      </FlexNavLink>
      }
    </Sidebar>
  );
};

export default SidebarLeader;
