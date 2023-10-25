import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClipboard } from "react-icons/fa";
import { LuBell } from "react-icons/lu";

import { Sidebar, Item, ItemName, FlexNavLink } from "../sidebar.styles";

const SidebarStudent = () => {
  return (
    <Sidebar>
      <FlexNavLink to="/student/schedule">
        <Item>
          <AiOutlineSchedule size="20px" />
          <ItemName>Schedule</ItemName>
        </Item>
      </FlexNavLink>
      <FlexNavLink to="listClassesOfStudent">
        <Item>
          <FaRegClipboard size="20px" />
          <ItemName>Class manager</ItemName>
        </Item>
      </FlexNavLink>
    </Sidebar>
  );
};

export default SidebarStudent;
