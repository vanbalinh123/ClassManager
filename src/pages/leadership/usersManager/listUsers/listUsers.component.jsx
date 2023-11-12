import { useNavigate } from "react-router-dom";
import { useListAdminsQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useListStudentsQuery } from "../../../../redux/api/leader/list-users-api.slice";

import { List } from "./listUsers.styles";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../generalCss/shared.styles";

const ListUsers = ({ 
  selectedValue,
  userCode,
  userName,
  userEmail
}) => {
  const navigate = useNavigate();
  const { data: listAdmins } = useListAdminsQuery({search: `${userCode} ${userName} ${userEmail}`});
  const { data: listTeachers } = useListTeachersQuery({search: `${userCode} ${userName} ${userEmail}`});
  const { data: listStudents } = useListStudentsQuery({search: `${userCode} ${userName} ${userEmail}`});

  let listUsers = [];
  if (selectedValue === "Admin") {
    listUsers = listAdmins;
  } else if (selectedValue === "Teacher") {
    listUsers = listTeachers;
  } else if (selectedValue === "Student") {
    listUsers = listStudents;
  }

  const handleClickUserDetail = (id) => {
    navigate(`/leader/listUsers/userDetail/${selectedValue}/${id}`);
    console.log(id)
    console.log(selectedValue)
  };
  

  return (
    <List>
      <Header>
        <TitleList>Index</TitleList>
        <TitleList>User Code</TitleList>
        <TitleList>User Name</TitleList>
        <TitleList>Email</TitleList>
        <TitleList>Role</TitleList>
      </Header>
      <Section>
        {listUsers?.map((item, index) => (
          <DivItem
            key={index} 
            onClick={() => handleClickUserDetail(item.usercode)}
          >
            <Item>{index + 1}</Item>
            <Item>{item.usercode}</Item>
            <Item>{item.full_name}</Item>
            <Item>{item.email}</Item>
            <Item>{item.role}</Item>
          </DivItem>
        ))}
      </Section>
    </List>
  );
};

export default ListUsers;
