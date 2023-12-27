import { useState } from "react";
import Pagination from "../../../../../components/paginate/paginate";
import { List } from "./listNotification.styles";
import DetailNotiTC from "./detailNotiTC/detailNotiTC.component";

import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles";

const ListNotifications = ({
  listTeacherNotifications,
  selectedValue,
  listAdminNotifications,
}) => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState({});

  let listNoti = [];
  if (selectedValue === "sent") {
    listNoti = listTeacherNotifications;
  } else {
    listNoti = listAdminNotifications;
  }

  //paginate
  const itemsPerPage = 10;
  const totalItems = listNoti?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customList = listNoti?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  const handleItemClick = (item) => {
    setCheck(true);
    setValue(item);
  };

  return (
    <List>
      {check === true && (
        <DetailNotiTC
          setCheck={setCheck}
          value={value}
          setValue={setValue}
          selectedValue={selectedValue}
        />
      )}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Tiêu đề</Th>
              <Th>Nội dung</Th>
              <Th>Ngày</Th>
              <Th>Giờ</Th>
              {(selectedValue === "sent" && (
                <Th>Gửi đến</Th>
              )) || <Th>Từ</Th>}
            </tr>
          </thead>
          <tbody>
            {customList?.map((item, index) => (
              <tr key={index} onClick={() => handleItemClick(item)}>
                <Td>{item.title}</Td>
                {(selectedValue === "sent" && <Td>{item.message}</Td>) || (
                  <Td>{item.content}</Td>
                )}

                <Td>
                  {item.created_at.split(" ")[0]}
                </Td>
                <Td>
                  {item.created_at.split(" ")[1]}
                </Td>
                {(selectedValue === "sent" && (
                  <Td>{item.class_code[0]}</Td>
                )) || <Td>{item.usercode}</Td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </List>
  );
};

export default ListNotifications;
