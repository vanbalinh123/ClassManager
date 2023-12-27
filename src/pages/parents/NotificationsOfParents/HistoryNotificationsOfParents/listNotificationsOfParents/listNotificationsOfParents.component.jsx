import { useState } from "react";

import { List } from "./listNotificationsOfParents.styles";
import Pagination from "../../../../../components/paginate/paginate";
import DetailNotiST from "../../../../student/NotificationsOfStudent/HistoryNotificationsOfStudent/listNotificationsOfStudent/detailNotiST/detailNotiSt.component";

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

const ListNotificationsOfParents = ({
  listTeacherNotifications,
  listAdminNotifications,
  roleNoti,
}) => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState({});

  let listNoti = [];
  if (roleNoti === "teacher") {
    listNoti = listTeacherNotifications;
  } else {
    listNoti = listAdminNotifications;
  }

  console.log(listNoti);

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
        <DetailNotiST setCheck={setCheck} value={value} setValue={setValue} />
      )}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Tiêu đề</Th>
              <Th>Nội dung</Th>
              <Th>Ngày</Th>
              <Th>Giờ</Th>
              {(roleNoti === "teacher" && <Th>Lớp học</Th>) || (
                <Th>Từ</Th>
              )}
            </tr>
          </thead>
          <tbody>
            {customList?.map((item, index) => (
              <tr key={index} onClick={() => handleItemClick(item)}>
                <Td>{item.title}</Td>
                {(roleNoti === "teacher" && <Td>{item.message}</Td>) || (
                  <Td>{item.content}</Td>
                )}

                <Td>
                  {item.created_at.split(" ")[0]}
                </Td>
                <Td>
                  {item.created_at.split(" ")[1]}
                </Td>
                {(roleNoti === "teacher" && (
                  <Td>{item.class_code[0]}</Td>
                )) || <Td>{item.usercode}sai</Td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </List>
  );
};

export default ListNotificationsOfParents;
