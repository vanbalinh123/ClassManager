import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useListAdminsQuery,
  useListParentsQuery,
} from "../../../../redux/api/leader/list-users-api.slice";
import { useListTeachersQuery } from "../../../../redux/api/leader/list-users-api.slice";
import { useListStudentsQuery } from "../../../../redux/api/leader/list-users-api.slice";
import Pagination from "../../../../components/paginate/paginate";

import { List } from "./listUsers.styles";
import { DivTotal, SpanTotal } from "../../../../generalCss/shared.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../generalCss/table.styles";

const ListUsers = ({ selectedValue, valueSearch }) => {
  const navigate = useNavigate();
  const { data: listAdmins } = useListAdminsQuery({ search: `${valueSearch}` });
  const { data: listTeachers } = useListTeachersQuery({
    search: `${valueSearch}`,
  });
  const { data: listStudents } = useListStudentsQuery({
    search: `${valueSearch}`,
  });
  const { data: listParents } = useListParentsQuery({
    search: `${valueSearch}`,
  });

  let listUsers = [];
  if (selectedValue === "Admin") {
    listUsers = listAdmins;
  } else if (selectedValue === "Teacher") {
    listUsers = listTeachers;
  } else if (selectedValue === "Student") {
    listUsers = listStudents;
  } else if (selectedValue === "Parents") {
    listUsers = listParents;
  }

  const handleClickUserDetail = (id) => {
    navigate(`/leader/listUsers/userDetail/${selectedValue}/${id}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listUsers?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const sortedListUser = Array.isArray(listUsers)
    ? [...listUsers].reverse()
    : [];

  const customListUsers = sortedListUser?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  //paginate

  return (
    <List>
      <DivTotal>
        <SpanTotal>Tổng số tài khoản: </SpanTotal>
        <SpanTotal>{listUsers?.length}</SpanTotal>
      </DivTotal>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Mã người dùng</Th>
              <Th>Tên người dùng</Th>
              <Th>Email</Th>
              <Th>Vai trò</Th>
            </tr>
          </thead>
          <tbody>
            {customListUsers?.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleClickUserDetail(item.usercode)}
              >
                <Td>{item.usercode}</Td>
                <Td>{item.full_name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.role}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </List>
  );
};

export default ListUsers;
