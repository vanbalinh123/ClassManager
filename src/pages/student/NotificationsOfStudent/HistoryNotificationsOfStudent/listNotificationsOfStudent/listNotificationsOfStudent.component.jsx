import { useState } from "react";

import { List } from "./listNotificationsOfStudent.styles";

import { 
    Header,
    TitleList,
    Section,
    DivItem,
    Item,
} from "../../../../../generalCss/shared.styles";

const ListNotificationsOfStudent = () => {
    const [expanded, setExpanded] = useState(false);
  
    const handleItemClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <List>
        <Header>
          <TitleList>Title</TitleList>
          <TitleList>Content</TitleList>
          <TitleList>Date</TitleList>
          <TitleList>From</TitleList>
        </Header>
        <Section>
          <DivItem onClick={handleItemClick} expanded={expanded}>
            <Item>Notice of school leave</Item>
            <Item expanded={expanded}> 
              Người tôi gắn bó nhất trong gia đình là anh trai của tôi. Hiện tại,
              anh trai tôi đang là một sinh viên đại học. Anh tên là Tùng. Anh
              không chỉ đẹp trai mà còn học rất giỏi. Nếu nói đến học lực thì anh
              là một tấm gương điểm sáng để cho lũ trẻ em hàng xóm noi theo. Nhưng
              nhắc đến anh trai, tôi sẽ nghĩ về những trải nghiệm cùng anh thực
              hiện khi còn nhỏ.
            </Item>
            <Item>22/09/2023</Item>
            <Item>Leader</Item>
          </DivItem>
        </Section>
      </List>
    );
  };
  
  export default ListNotificationsOfStudent;