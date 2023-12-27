import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListClassQuery } from "../../../redux/api/leader/class-api.slice";
import SearchContainer from "../../../components/search/search";

import Pagination from "../../../components/paginate/paginate";

import { TableWrapper, Table, Th, Td } from "../../../generalCss/table.styles";
import { ListClass } from "./tuition.styles";
import { Page, Title } from "../../../generalCss/shared.styles";

const Tuition = () => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");

  const { data: listClasses } = useListClassQuery({
    search: `${valueSearch}`,
  });

  const handleClick = (classCode) => {
    navigate(`/leader/tuition/${classCode}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listClasses?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customListClasses = listClasses?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <Page>
      <Title>Danh sách lớp học</Title>
      <SearchContainer
        setValueSearch={setValueSearch}
        placeholder="Tìm kiếm theo mã lớp, tên lớp, khoá"
        type="text"
      />
      <ListClass>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Mã lớp</Th>
                <Th>Tên lớp</Th>
                <Th>Khoá</Th>
              </tr>
            </thead>
            <tbody>
              {customListClasses?.reverse()?.map((item, index) => (
                <tr onClick={() => handleClick(item.class_code)} key={index}>
                  <Td>{item.class_code}</Td>
                  <Td>{item.class_name}</Td>
                  <Td>{item.course}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </ListClass>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </Page>
  );
};

export default Tuition;
