import { useState, useEffect } from "react";

import { List } from "./listNotificationsOfParents.styles";
import Pagination from "../../../../../components/paginate/paginate";
import DetailNotiST from "../../../../student/NotificationsOfStudent/HistoryNotificationsOfStudent/listNotificationsOfStudent/detailNotiST/detailNotiSt.component";


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
  const [localStorageData, setLocalStorageData] = useState({});
  const userCode = JSON.parse(localStorage.getItem("user_code")) || "";

  let listNoti = [];
  if (roleNoti === "teacher") {
    listNoti = listTeacherNotifications;
  } else {
    listNoti = listAdminNotifications;
  }

  useEffect(() => {
    // Load the read status from Local Storage when the component mounts
    const storedData =
      JSON.parse(localStorage.getItem("notificationsReadStatus")) || {};

    // Convert old data to the new format (set to true)
    const convertedData = {};
    Object.keys(storedData).forEach((key) => {
      convertedData[key] = true;
    });

    setLocalStorageData(convertedData);
  }, [userCode]);

  const updateLocalStorage = (created_at) => {
    // Update the Local Storage data for the clicked notification
    setLocalStorageData((prevData) => ({
      ...prevData,
      [`${userCode}_${created_at}`]: true,
    }));

    // Save the updated data to Local Storage
    localStorage.setItem(
      "notificationsReadStatus",
      JSON.stringify(localStorageData)
    );
  };

  const handleItemClick = (item) => {
    setCheck(true);
    setValue(item);
    // onNotificationClick();

    // Mark the notification as read
    item.isRead = true;
    updateLocalStorage(item.created_at); // Update Local Storage for the clicked notification
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listNoti?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const sortedListNoti = listNoti?.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });


  const customList = sortedListNoti?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate


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
              <tr 
                key={index} 
                onClick={() => handleItemClick(item)}
                style={{
                  color: localStorageData[`${userCode}_${item.created_at}`]
                    ? "black"
                    : "green",
                }}
              >
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

export default ListNotificationsOfParents;
