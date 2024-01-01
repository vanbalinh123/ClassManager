import { useListAdminsQuery } from "../../../../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../../../../redux/api/leader/list-users-api.slice";
import { useListStudentsQuery } from "../../../../../redux/api/leader/list-users-api.slice";
import { useListParentsQuery } from "../../../../../redux/api/leader/list-users-api.slice";

import { useDeleteAdminMutation } from "../../../../../redux/api/leader/delete-account-api.slice";
import { useDeleteTeacherMutation } from "../../../../../redux/api/leader/delete-account-api.slice";
import { useDeleteStudentMutation } from "../../../../../redux/api/leader/delete-account-api.slice";
import { useDeleteParentMutation } from "../../../../../redux/api/leader/delete-account-api.slice";

import { useListInforClassQuery } from "../../../../../redux/api/teacher/class-information-api";
import { useListClassQuery } from "../../../../../redux/api/leader/class-api.slice";

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
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles";

const UserDetail = () => {
  const { role, usercode } = useParams();

  const navigate = useNavigate();

  const { data: listAdmins } = useListAdminsQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listStudents } = useListStudentsQuery();
  const { data: listParents } = useListParentsQuery();
  const { data: listClassInfo } = useListInforClassQuery();
  const { data: listClass } = useListClassQuery();
  const [deleteAdminAccount] = useDeleteAdminMutation();
  const [deleteTeacherAccount] = useDeleteTeacherMutation();
  const [deleteStudentAccount] = useDeleteStudentMutation();
  const [deleteParentAccount] = useDeleteParentMutation();

  let user = null;
  let history = [];
  let result = [];
  let studentOfParent = [];

  if (role === "Admin") {
    user = listAdmins?.find((item) => item.usercode === usercode);
  } else if (role === "Teacher") {
    user = listTeachers?.find((item) => item.usercode === usercode);
    history = listClassInfo?.filter((item) => item.Teachers === usercode);
    listClass?.map((item) => {
      history?.map((item2) => {
        if (item2.class_info === item.class_code) {
          result.push(item);
        }
      });
    });
  } else if (role === "Student") {
    user = listStudents?.find((item) => item.usercode === usercode);
    history = listClassInfo?.filter((item) => item.students.includes(usercode));
    listClass?.map((item) => {
      history?.map((item2) => {
        if (item2.class_info === item.class_code) {
          result.push(item);
        }
      });
    });
  } else if (role === "Parents") {
    user = listParents?.find((item) => item.usercode === usercode);
    studentOfParent = user?.student;
    listClassInfo?.map((item) => {
      item.students.map((item2) => {
        studentOfParent?.map((item3) => {
          if (item2 === item3) {
            history.push(item);
          }
        });
      });
    });
    listClass?.map((item) => {
      history?.map((item2) => {
        if (item2.class_info === item.class_code) {
          if (!result.includes(item)) {
            result.push(item);
          }
        }
      });
    });
  }

  const findStudents = (classCode) => {
    let st = [];
    let listClass = listClassInfo?.filter(
      (item) => item.class_info === classCode
    );

    listClass?.map((item) => {
      item.students.map((item2) => {
        if (studentOfParent.includes(item2)) {
          st.push(item2);
        }
      });
    });

    return st;
  };

  console.log(findStudents("CMU AIS"));

  const findTeacher = (teacherCode) => {
    return (
      listTeachers?.find((item) => item.usercode === teacherCode)?.full_name ||
      "..."
    );
  };

  const handleDeleteUser = async (usercode) => {
    const isConfirmed = window.confirm(
      `Do you want to delete account '${usercode.toUpperCase()}' or not?`
    );
    if (isConfirmed) {
      try {
        if (role === "Admin") {
          await deleteAdminAccount(usercode);
        } else if (role === "Teacher") {
          await deleteTeacherAccount(usercode);
        } else if (role === "Student") {
          await deleteStudentAccount(usercode);
        } else if (role === "Parents") {
          await deleteParentAccount(usercode);
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
      <Title>THÔNG TIN NGƯỜI DÙNG {usercode}</Title>
      <Content>
        <Infors>
          <DivImg>
            <Img src="/imgs/user-img.jpg" />
          </DivImg>
          <DivInfors>
            <Child>
              <Key>Tên người dùng: </Key>
              <Result>{user?.full_name}</Result>
            </Child>
            <Child>
              <Key>Mã người dùng: </Key>
              <Result>{user?.usercode}</Result>
            </Child>
            <Child>
              <Key>Vai trò: </Key>
              <Result>{user?.role}</Result>
            </Child>
            {role === "Parents" && (
              <Child>
                <Key>Học sinh: </Key>
                <Result>{user?.student.join(", ")}</Result>
              </Child>
            )}
            <Child>
              <Key>Email: </Key>
              <Result>{user?.email}</Result>
            </Child>
            <Child>
              <Key>Số điện thoại: </Key>
              <Result>{user?.mobile}</Result>
            </Child>
          </DivInfors>
        </Infors>
        {role === "Teacher" && (
          <DivHistory>
            <History>LỊCH SỬ</History>
            <List>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>Mã lớp</Th>
                      <Th>Tên lớp</Th>
                      <Th>Khoá</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {result?.map((item, index) => (
                      <tr key={index}>
                        <Td>{item.class_code}</Td>
                        <Td>{item.class_name}</Td>
                        <Td>{item.course}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
            </List>
          </DivHistory>
        )}
        {role === "Student" && (
          <DivHistory>
            <History>LỊCH SỬ</History>
            <List>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                    <Th>Mã lớp</Th>
                <Th>Tên lớp</Th>
                <Th>Mã GV</Th>
                <Th>Giáo viên</Th>
                <Th>Khoá</Th>
                    </tr>
                  </thead>
                  <tbody>
                  {result?.map((item, index) => (
                  <tr key={index}>
                    <Td>{item.class_code}</Td>
                    <Td>{item.class_name}</Td>
                    <Td>{history[index].Teachers}</Td>
                    <Td>{findTeacher(history[index].Teachers)}</Td>
                    <Td>{item.course}</Td>
                  </tr>
                ))}
                  </tbody>
                </Table>
              </TableWrapper>
            </List>
          </DivHistory>
        )}
        {role === "Parents" && (
          <DivHistory>
            <History>LỊCH SỬ</History>
            <List>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                    <Th>Mã lớp</Th>
                <Th>Tên lớp</Th>
                <Th>Mã GV</Th>
                <Th>Giáo viên</Th>
                <Th>Học sinh</Th>
                <Th>Khoá</Th>
                    </tr>
                  </thead>
                  <tbody>
                  {result?.map((item, index) => (
                  <tr key={index}>
                    <Td>{item.class_code}</Td>
                    <Td>{item.class_name}</Td>
                    <Td>{history[index].Teachers}</Td>
                    <Td>{findTeacher(history[index].Teachers)}</Td>
                    <Td>
                      {studentOfParent?.length > 0 &&
                        findStudents(item.class_code).join(", ")}
                    </Td>
                    <Td>{item.course}</Td>
                  </tr>
                ))}
                  </tbody>
                </Table>
              </TableWrapper>
            </List>
          </DivHistory>
        )}

        <DivBtns>
          <BtnDelete onClick={() => handleDeleteUser(usercode)}>
            <RiDeleteBin6Line size="15px" />
            Xoá
          </BtnDelete>
          <Btn onClick={() => navigate("/leader/listUsers")}>
            <IoChevronBack size="15px" />
            Quay lại
          </Btn>
        </DivBtns>
      </Content>
    </Page>
  );
};

export default UserDetail;
