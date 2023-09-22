import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import { BsCalendarPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { LuBellPlus } from "react-icons/lu";

import { Sidebar, Item, ItemName, FlexNavLink } from "../sidebar.styles";

const SidebarLeader = () => {

  return (
    <Sidebar>
      <FlexNavLink to="/leader/dashboard">
        <Item >
          <AiOutlineDashboard size="20px" />
          <ItemName>Dashboard</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createAccount">
        <Item >
          <BsPersonAdd size="20px" />
          <ItemName>Create Account</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createSchedule">
        <Item >
          <BsCalendar3 size="20px" />
          <ItemName>Create a teaching schedule</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createClasses">
        <Item >
          <BsCalendarPlus size="20px" />
          <ItemName>Create classes</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/listUsers">
        <Item >
          <PiUsersThree size="20px" />
          <ItemName>Users Management</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="/leader/createNotification">
        <Item >
          <LuBellPlus size="20px" />
          <ItemName>Create Notifications</ItemName>
        </Item>
      </FlexNavLink>
    </Sidebar>
  );
};

export default SidebarLeader;
