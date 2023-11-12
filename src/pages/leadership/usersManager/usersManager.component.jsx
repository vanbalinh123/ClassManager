import { useState } from "react";

import FilterUsers from "./filterUsers/filterUsers.component";
import ListUsers from "./listUsers/listUsers.component";

import { Page, Title } from "../../../generalCss/shared.styles";
import { Content, DivOutlet } from "./usersManager.styles";

const UsersManager = () => {
  const [selectedValue, setSelectedValue] = useState("Admin");
  const [userCode, setUserCode] = useState('');
  const [userName, setUserName] = useState(''); 
  const [userEmail, setUserEmail] = useState('');

  return (
    <Page>
      <Title>List Users</Title>
      <FilterUsers 
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setUserCode={setUserCode}
        setUserName={setUserName}
        setUserEmail={setUserEmail}
      />
      <Content>
        <ListUsers 
          selectedValue={selectedValue}
          userCode={userCode}
          userName={userName}
          userEmail={userEmail}
        />
      </Content>
    </Page>
  );
};

export default UsersManager;
