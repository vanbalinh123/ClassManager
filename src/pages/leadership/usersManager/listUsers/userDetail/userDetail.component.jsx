import { useListAdminsQuery } from "../../../../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../../../../redux/api/leader/list-users-api.slice";
import { useListStudentsQuery } from "../../../../../redux/api/leader/list-users-api.slice";

import { useDeleteAdminMutation } from "../../../../../redux/api/leader/delete-account-api.slice";
import { useDeleteTeacherMutation } from "../../../../../redux/api/leader/delete-account-api.slice";
import { useDeleteStudentMutation } from "../../../../../redux/api/leader/delete-account-api.slice";
import { useDeleteParentMutation } from "../../../../../redux/api/leader/delete-account-api.slice";

import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";

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
  BtnDelete,
} from "./userDetail.styles";

import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

const UserDetail = () => {
  const { role, usercode } = useParams();

  const navigate = useNavigate();

  const { data: listAdmins } = useListAdminsQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listStudents } = useListStudentsQuery();
  const [deleteAdminAccount] = useDeleteAdminMutation();
  const [deleteTeacherAccount] = useDeleteTeacherMutation();
  const [deleteStudentAccount] = useDeleteStudentMutation();
  const [deleteParentAccount] = useDeleteParentMutation();

  let user = null;
  if (role === "Admin") {
    user = listAdmins?.find((item) => item.usercode === usercode);
  } else if (role === "Teacher") {
    user = listTeachers?.find((item) => item.usercode === usercode);
  } else if (role === "Student") {
    user = listStudents?.find((item) => item.usercode === usercode);
  }

  const handleDeleteUser = async (usercode) => {
    const isConfirmed = window.confirm(
      `Do you want to delete account '${usercode.toUpperCase()}' or not?`
    );
    if (isConfirmed) {
      try {
        if(role === "Admin") {
          await deleteAdminAccount(usercode);
        } else if (role === "Teacher") {
          await deleteTeacherAccount(usercode)
        } else if (role === "Student") {
          await deleteStudentAccount(usercode)
        } else if (role === "Parents") {
          await deleteParentAccount(usercode)
        }
        
        navigate("/leader/listUsers");
      } catch (error) {
        if (error.data) {
          alert(error.data.message);
        } else {
          alert("error");
        }
      }
    }
  };

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
              <Result>{user?.full_name}</Result>
            </Child>
            <Child>
              <Key>User's Code: </Key>
              <Result>{user?.usercode}</Result>
            </Child>
            <Child>
              <Key>Role: </Key>
              <Result>{user?.role}</Result>
            </Child>
            <Child>
              <Key>Email: </Key>
              <Result>{user?.email}</Result>
            </Child>
            <Child>
              <Key>Phone: </Key>
              <Result>{user?.mobile}</Result>
            </Child>
          </DivInfors>
        </Infors>
        {role !== "Admin" && (
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
        )}

        <DivBtns>
          <BtnDelete onClick={() => handleDeleteUser(usercode)}>
            <RiDeleteBin6Line size="15px" />
            Delete
          </BtnDelete>
          <Btn onClick={() => navigate("/leader/listUsers")}>
            <IoChevronBack size="15px" />
            Back
          </Btn>
        </DivBtns>
      </Content>
    </Page>
  );
};

export default UserDetail;
