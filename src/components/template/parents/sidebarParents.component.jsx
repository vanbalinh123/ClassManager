import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClipboard } from "react-icons/fa";
import { LuBell } from "react-icons/lu";

import { Sidebar, Item, ItemName, FlexNavLink } from "../sidebar.styles";

const SidebarParents = () => {
    return (
        <Sidebar>
          <FlexNavLink to="/parents/schedule">
            <Item>
              <AiOutlineSchedule size="20px" />
              <ItemName>Schedule</ItemName>
            </Item>
          </FlexNavLink>
          <FlexNavLink to="listClassesOfChild">
            <Item>
              <FaRegClipboard size="20px" />
              <ItemName>Class manager</ItemName>
            </Item>
          </FlexNavLink>
          <FlexNavLink to='historyNotifications'>
            <Item>
              <LuBell size="20px" />
              <ItemName>Notifications</ItemName>
            </Item>
          </FlexNavLink>
        </Sidebar>
      );
}

export default SidebarParents;