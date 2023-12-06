import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListAdminsQuery } from "../../../../redux/api/leader/list-users-api.slice";
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
        <TitleList>Index</TitleList>
        <TitleList>User Code</TitleList>
        <TitleList>User Name</TitleList>
        <TitleList>Email</TitleList>
        <TitleList>Role</TitleList>
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
      {/* <Table>
      <TableHeader>
        <TableHeaderCell>Index</TableHeaderCell>
        <TableHeaderCell>User Code</TableHeaderCell>
        <TableHeaderCell>User Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Role</TableHeaderCell>
      </TableHeader>
      <tbody>
        {customListUsers?.map((item, index) => (
          <TableRow
            key={index} 
            onClick={() => handleClickUserDetail(item.usercode)}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.usercode}</TableCell>
            <TableCell>{item.full_name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
        ))}
      </tbody>
      </Table> */}
      
      <Pagination
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </List>
  );
};

export default ListUsers;
