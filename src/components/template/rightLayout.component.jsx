import { Outlet, Navlink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiProfileLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

import {useUserQuery} from '../../redux/api/user.slice'

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
} from "./rightLayout.styles";


const RightLayout = () => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleImgClick = () => {
    return setCheck(!check);
  };

  const handleToProfile = () => {
    setCheck(false);
    // navigate("/leader/profile");
    // navigate("/teacher/profile");
    navigate("/student/profile");
  };

  const {data: user} = useUserQuery();
  console.log(user)
  const token = JSON.parse(localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/')
  }

  return (
    <Right>
      <Header>
        <Name>Class Management</Name>
        <DivUser>
          <NameUser>Leadership</NameUser>
          <DivImg onClick={() => handleImgClick()}>
            <ImgUser src="/imgs/user-img.jpg" alt="avatar" />
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
        <Outlet />
      </Content>
    </Right>
  );
};

export default RightLayout;
