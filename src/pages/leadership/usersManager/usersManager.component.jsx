import { useState } from "react";

import FilterUsers from "./filterUsers/filterUsers.component";
import ListUsers from "./listUsers/listUsers.component";

import { Page, Title } from "../../../generalCss/shared.styles";
import { Content, DivOutlet } from "./usersManager.styles";

const UsersManager = () => {
  const [selectedValue, setSelectedValue] = useState("Admin");
  const [valueSearch, setValueSearch] = useState("");

  return (
    <Page>
      <Title>Danh sách người dùng</Title>
      <FilterUsers 
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        setValueSearch={setValueSearch}
      />
      <Content>
        <ListUsers 
          selectedValue={selectedValue}
          valueSearch={valueSearch}
        />
      </Content>
    </Page>
  );
};

export default UsersManager;
