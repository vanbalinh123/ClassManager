import { useEffect, useState } from "react";

import DetailNoti from "./detailNoti/detailNoti.component";

import { List } from "./listNotifications.styles";
import Pagination from "../../../../../components/paginate/paginate";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
  Table
} from "../../../../../generalCss/shared.styles";

import { 
  TableStyled,
  ThStyled,
  TdStyled
} from '../../../../../generalCss/table.styles.js'

const ListNotifications = ({ listNotificationsAdmin }) => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState({})

  const handleItemClick = (item) => {
    setCheck(true)
    setValue(item)
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
      {check === true 
        && 
        <DetailNoti 
          setCheck={setCheck}
          value={value}
          calDate={calDate}
          calTime={calTime}
          setValue={setValue}
        />
      }
      <Header>
        <TitleList style={{ flex: "0.5" }}>Tiêu đề</TitleList>
        <TitleList >Nội dung</TitleList>
        <TitleList style={{ flex: "0.5" }}>Ngày</TitleList>
        <TitleList style={{ flex: "0.5" }}>Thời gian</TitleList>
        <TitleList style={{ flex: "0.5" }}>Người nhận</TitleList>
      </Header>
      <Section>
        {customListNoti?.map((item, index) => {
          return (
            <DivItem 
              onClick={() => handleItemClick(item)} 
              key={index}
            >
              <Item style={{ flex: "0.5" }}>{item.title}</Item>
              <Item>{item.content}</Item>
              <Item style={{ flex: "0.5" }}>{calDate(item.created_at)}</Item>
              <Item style={{ flex: "0.5" }}>{calTime(item.created_at)}</Item>
              <Item style={{ flex: "0.5" }}>{item.role}</Item>
            </DivItem>
          );
        })}
      </Section>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </List>
  );
};

export default ListNotifications;
