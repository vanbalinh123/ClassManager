import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiProfileLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

import { useListAdminsQuery } from "../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../redux/api/teacher/list-teachers-api.slice";
import { useListStudentsQuery } from "../../redux/api/student/list-students-api.slice";

import {
  Right,
  Header,
  Content,
  Name,
  DivUser,
  NameUser,
  ImgUser,
  DivImg,
  Other,
  Span,
  Cover,
} from "./rightLayout.styles";

const RightLayout = () => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const userRole = JSON.parse(localStorage.getItem("userRole"));
  const userCode = JSON.parse(localStorage.getItem("user_code"));

  const { data: listAdmins } = useListAdminsQuery();
  const { data: listTeachers } = useListTeachersQuery();
  const { data: listStudents } = useListStudentsQuery();

  const usersData = {
    Admin: listAdmins,
    Teacher: listTeachers,
    Student: listStudents,
  };

  const currentUser = usersData[userRole]?.find(
    (item) => item.usercode === userCode
  );

  const handleImgClick = () => {
    return setCheck(!check);
  };

  const handleToProfile = () => {
    setCheck(false);

    if (userRole === "Admin") {
      navigate("/leader/profile");
    } else if (userRole === "Teacher") {
      navigate("/teacher/profile");
    } else if (userRole === "Student") {
      navigate("/student/profile");
    }
  };

  const token = JSON.parse(localStorage.getItem("accessToken"));

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("id_user");
    navigate("/");
  };

  return (
    <Right>
      <Header>
        <Name>Classroom Management</Name>
        <DivUser>
          <NameUser>{currentUser?.full_name}</NameUser>
          <DivImg onClick={() => handleImgClick()}>
            {(currentUser?.avatar === null && (
              <ImgUser src="/imgs/user-img.jpg" alt="avatar" />
            )) || <ImgUser src={currentUser?.avatar} alt="avatar" />}
          </DivImg>
          {check === true && (
            <Other>
              <Span onClick={() => handleToProfile()}>
                <RiProfileLine size="15px" />
                Your Profile
              </Span>
              <Span onClick={() => handleLogout()}>
                <BiLogOut size="15px" />
                Logout
              </Span>
            </Other>
          )}
        </DivUser>
      </Header>
      <Content>
        <Cover>
          <Outlet />
        </Cover>
      </Content>
    </Right>
  );
};

export default RightLayout;
