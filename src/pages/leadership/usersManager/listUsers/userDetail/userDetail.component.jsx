import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoChevronBack } from "react-icons/io5";

import { Page, Title } from "../../../../../generalCss/shared.styles";

import {
  Content,
  Infors,
  DivHistory,
  DivBtns,
  Btn,
  DivImg,
  DivInfors,
  Child,
  Key,
  Result,
  Img,
  History,
  List,
  BtnDelete
} from "./userDetail.styles";

import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

const UserDetail = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <Title>User Detail</Title>
      <Content>
        <Infors>
          <DivImg>
            <Img src="/imgs/user-img.jpg" />
          </DivImg>
          <DivInfors>
            <Child>
              <Key>User's Name: </Key>
              <Result>Van Ba Linh</Result>
            </Child>
            <Child>
              <Key>User's Code: </Key>
              <Result>HS123</Result>
            </Child>
            <Child>
              <Key>Role: </Key>
              <Result>Student</Result>
            </Child>
            <Child>
              <Key>Email: </Key>
              <Result>Vanbalinh123@gmail.com</Result>
            </Child>
            <Child>
              <Key>Phone: </Key>
              <Result>0123456789</Result>
            </Child>
          </DivInfors>
        </Infors>
        <DivHistory>
          <History>History</History>
          <List>
            <Header>
              <TitleList>Class Code</TitleList>
              <TitleList>Class Name</TitleList>
              <TitleList>Course</TitleList>
            </Header>
            <Section>
              <DivItem>
                <Item>TI123</Item>
                <Item>Toeic basic</Item>
                <Item>26</Item>
              </DivItem>
            </Section>
          </List>
        </DivHistory>
        <DivBtns>
          <BtnDelete>
            <RiDeleteBin6Line size='15px'/>
            Delete
          </BtnDelete>
          <Btn onClick={() => navigate("/leader/listUsers")}>
            <IoChevronBack size='15px'/>
            Back
            </Btn>
        </DivBtns>
      </Content>
    </Page>
  );
};

export default UserDetail;
