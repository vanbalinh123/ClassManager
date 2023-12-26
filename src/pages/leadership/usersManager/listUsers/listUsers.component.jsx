import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListAdminsQuery, useListParentsQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useListStudentsQuery } from "../../../../redux/api/leader/list-users-api.slice";
import Pagination from "../../../../components/paginate/paginate";


import { List } from "./listUsers.styles";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell
} from "../../../../generalCss/shared.styles";

const ListUsers = ({ 
  selectedValue,
  valueSearch
}) => {
  const navigate = useNavigate();
  const { data: listAdmins } = useListAdminsQuery({search: `${valueSearch}`});
  const { data: listTeachers } = useListTeachersQuery({search: `${valueSearch}`});
  const { data: listStudents } = useListStudentsQuery({search: `${valueSearch}`});
  const { data: listParents } = useListParentsQuery({search: `${valueSearch}`});

  let listUsers = [];
  if (selectedValue === "Admin") {
    listUsers = listAdmins;
  } else if (selectedValue === "Teacher") {
    listUsers = listTeachers;
  } else if (selectedValue === "Student") {
    listUsers = listStudents;
  } else if (selectedValue === 'Parents') {
    listUsers = listParents;
  }

  const handleClickUserDetail = (id) => {
    navigate(`/leader/listUsers/userDetail/${selectedValue}/${id}`);
    console.log(id)
    console.log(selectedValue)
  };

    //paginate
    const itemsPerPage = 10;
    const totalItems = listUsers?.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);
  
    const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };
  
  
    const customListUsers = listUsers?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
    //paginate
  

  return (
    <List>
      <Header>
        <TitleList>STT</TitleList>
        <TitleList>Mã người dùng</TitleList>
        <TitleList>Tên người dùng</TitleList>
        <TitleList>Email</TitleList>
        <TitleList>Vai trò</TitleList>
      </Header>
      <Section>
        {customListUsers?.map((item, index) => (
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
      
      <Pagination
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </List>
  );
};

export default ListUsers;
