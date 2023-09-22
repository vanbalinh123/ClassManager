import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ChangePassword from "./changePass/changePass.component";
import InforUser from "./inforUser/inforUser.component";

import { Page, Title } from "../../generalCss/shared.styles";


const Profile = () => {
  const [changePass, setChangePass] = useState(false);

  return (
    <Page>
      <Title>Your Profile</Title>
      <InforUser 
        setChangePass={setChangePass}
      />
      <ChangePassword 
        changePass={changePass}
        setChangePass={setChangePass}
      />
    </Page>
  );
};

export default Profile;
