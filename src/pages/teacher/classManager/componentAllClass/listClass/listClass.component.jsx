import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../../../../components/paginate/paginate";
import { ListClass } from "./listClass.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles";

const ListClassOfTeacher = ({ listClass }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    console.log(item);
    navigate(`/teacher/listClasses/classDetail/${item.class_code}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listClass?.length;
  console.log(listClass);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customListClasses = listClass?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  console.log(customListClasses);
  //paginate

  return (
    <ListClass>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Mã lớp</Th>
              <Th>Tên lớp</Th>
              <Th>Khoá học</Th>
            </tr>
          </thead>
          {(customListClasses?.length > 0 && (
            <tbody>
              {customListClasses?.map((item, index) => (
                <tr key={index} onClick={() => handleItemClick(item)}>
                  <Td>{item.class_code}</Td>
                  <Td>{item.class_name}</Td>
                  <Td>{item.course}</Td>
                </tr>
              ))}
            </tbody>
          )) || (
              <div style={{margin: '0 auto'}}>
                Không tìm thấy dữ liệu thích hợp!!
            </div>
          )}
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </ListClass>
  );
};

export default ListClassOfTeacher;
