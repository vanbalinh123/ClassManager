import { useEffect, useState } from "react";

import DetailNoti from "./detailNoti/detailNoti.component";

import { List } from "./listNotifications.styles";
import Pagination from "../../../../../components/paginate/paginate";

import {
  TableWrapper,
  Table,
  Th,
  Td,
} from "../../../../../generalCss/table.styles.js";

const ListNotifications = ({ listNotificationsAdmin }) => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState({});

  const handleItemClick = (item) => {
    setCheck(true);
    setValue(item);
  };

  const calDate = (value) => {
    const dateTime = new Date(value);
    return (
      String(dateTime.getDate()) +
      "-" +
      String(dateTime.getMonth() + 1) +
      "-" +
      dateTime.getFullYear()
    );
  };

  const calTime = (value) => {
    const dateTime = new Date(value);
    return (
      dateTime.getHours() +
      ":" +
      dateTime.getMinutes() +
      ":" +
      dateTime.getSeconds()
    );
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listNotificationsAdmin?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customListNoti = listNotificationsAdmin?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <List>
      {check === true && (
        <DetailNoti
          setCheck={setCheck}
          value={value}
          calDate={calDate}
          calTime={calTime}
          setValue={setValue}
        />
      )}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Ngày</Th>
              <Th>Thời gian</Th>
              <Th>Tiêu đề</Th>
              <Th>Nội dung</Th>
              <Th>Người nhận</Th>
            </tr>
          </thead>
          <tbody>
            {customListNoti?.map((item, index) => {
              return (
                <tr onClick={() => handleItemClick(item)} key={index}>
                  <Td>
                    {calDate(item.created_at)}
                  </Td>
                  <Td>
                    {calTime(item.created_at)}
                  </Td>
                  <Td>{item.title}</Td>
                  <Td>{item.content}</Td>
                  <Td>{item.role}</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </List>
  );
};

export default ListNotifications;
