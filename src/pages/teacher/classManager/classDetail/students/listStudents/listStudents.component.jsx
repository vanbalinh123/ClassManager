import { useState } from "react";
import {AiOutlineUserAdd} from 'react-icons/ai'

import StudentDetail from "./studentDetail/studentDetail.component";

import {
  Div,
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  DivBtn,
  Btn,
} from "./listStudent.styles";

const ListStudents = () => {
  const [detail, setDetail] = useState(false);

  const handleItemClick = () => {
    setDetail(true);
  };

  return (
    <Div>
      <StudentDetail 
        detail={detail} 
        setDetail={setDetail} 
      />
      <Header>
        <TitleList style={{ flex: 0.5 }}>Index</TitleList>
        <TitleList>Student Code</TitleList>
        <TitleList>Student Name</TitleList>
        <TitleList style={{ flex: 0.5 }}>Absent</TitleList>
        <TitleList style={{ flex: 0.5 }}>Test 1</TitleList>
        <TitleList style={{ flex: 0.5 }}>Test 2</TitleList>
      </Header>
      <Section>
        <DivItem onClick={() => handleItemClick()}>
          <Item style={{ flex: 0.5 }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item style={{ flex: 0.5 }}>9</Item>
          <Item style={{ flex: 0.5 }}>10</Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item style={{ flex: 0.5 }}>9</Item>
          <Item style={{ flex: 0.5 }}>10</Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: 0.5 }}>3</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item style={{ flex: 0.5 }}>9</Item>
          <Item style={{ flex: 0.5 }}>10</Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: 0.5 }}>4</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item style={{ flex: 0.5 }}>9</Item>
          <Item style={{ flex: 0.5 }}>10</Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: 0.5 }}>5</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ flex: 0.5 }}>2</Item>
          <Item style={{ flex: 0.5 }}>9</Item>
          <Item style={{ flex: 0.5 }}>10</Item>
        </DivItem>
      </Section>
      <DivBtn>
        <Btn>
          <AiOutlineUserAdd size="15px" />
          Add
        </Btn>
      </DivBtn>
    </Div>
  );
};

export default ListStudents;
