import { useNavigate } from "react-router-dom";

import { AiOutlineUserAdd } from "react-icons/ai";
import {
  Div,
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  DivBtn,
  Btn,
} from "./listAssignment.styles";

const ListAssignment = () => {
  const navigate = useNavigate()

  const handleItemClick = () => {
    navigate('./detail')
  };

  return (
    <Div>
      <Header>
        <TitleList style={{ flex: 0.5 }}>Index</TitleList>
        <TitleList>Quiz Title</TitleList>
        <TitleList style={{ flex: 0.5 }}>Date</TitleList>
      </Header>
      <Section>
        <DivItem onClick={() => handleItemClick()}>
          <Item style={{ flex: 0.5 }}>1</Item>
          <Item>Test number 1</Item>
          <Item style={{ flex: 0.5 }}>29/12/2023</Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item>Test number 2</Item>
          <Item style={{ flex: 0.5 }}>30/12/2023</Item>
        </DivItem>
      </Section>
      <DivBtn>
        <Btn>
          <AiOutlineUserAdd size="15px" />
          Add Ass
        </Btn>
      </DivBtn>
    </Div>
  );
};

export default ListAssignment;
