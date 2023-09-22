import { Page, Title } from "../../../generalCss/shared.styles";
import FilterUsers from "./filterUsers/filterUsers.component";
import { Content, DivOutlet } from "./usersManager.styles";
import ListUsers from "./listUsers/listUsers.component";

const UsersManager = () => {

  return (
    <Page>
      <Title>List Users</Title>
      <FilterUsers />
      <Content>
        <ListUsers />
      </Content>
    </Page>
  );
};

export default UsersManager;
