import { RiSaveLine } from "react-icons/ri";

import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../../../generalCss/shared.styles";

import {
  PageAttendance,
  Span,
  Input,
  DivBtn,
  Btn,
} from "./attendance.styles";

const Attendance = () => {
  

  return (
    <PageAttendance>
      <Header>
        <TitleList style={{ flex: "0.5" }}>Index</TitleList>
        <TitleList>Student Code</TitleList>
        <TitleList>Student Name</TitleList>
        <TitleList style={{ display: "flex", justifyContent: "center" }}>
          <Span>Present</Span>
          <Span>Absent</Span>
        </TitleList>
      </Header>
      <Section>
        <DivItem>
          <Item style={{ flex: "0.5" }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
          </Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: "0.5" }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
          </Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: "0.5" }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
          </Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: "0.5" }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
          </Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: "0.5" }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
          </Item>
        </DivItem>
        <DivItem>
          <Item style={{ flex: "0.5" }}>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item style={{ display: "flex", justifyContent: "center" }}>
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
            <Input type="radio" name="attendance" style={{ flex: "1" }} />
          </Item>
        </DivItem>
        <DivBtn>
          <Btn>
            <RiSaveLine size="15px" />
            Save
          </Btn>
        </DivBtn>
      </Section>
    </PageAttendance>
  );
};

export default Attendance;
