import { useNavigate } from "react-router-dom";


import { List } from "./listUsers.styles";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../generalCss/shared.styles";

const ListUsers = () => {
    const navigate = useNavigate()

    const handleClickUserDetail = () => {
        navigate('/leader/listUsers/userDetail')
    }

  return (
    <List>
      <Header>
        <TitleList>Index</TitleList>
        <TitleList>User Code</TitleList>
        <TitleList>User Name</TitleList>
        <TitleList>User Type</TitleList>
      </Header>
      <Section>
        <DivItem
            onClick={() => handleClickUserDetail()}
        >
          <Item>1</Item>
          <Item>HS123</Item>
          <Item>Van Ba Linh</Item>
          <Item>Student</Item>
        </DivItem>
      </Section>
    </List>
  );
};

export default ListUsers;
