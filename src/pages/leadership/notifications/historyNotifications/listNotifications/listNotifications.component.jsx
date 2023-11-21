import { useEffect, useState } from "react";

import { List } from "./listNotifications.styles";
import Pagination from "../../../../../components/paginate/paginate";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

const ListNotifications = ({ listNotificationsAdmin }) => {
  const [expanded, setExpanded] = useState(false);
  let content = "flex2";

  const handleItemClick = () => {
    setExpanded(!expanded);
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
      <Header>
        <TitleList>Title</TitleList>
        <TitleList content={content}>Content</TitleList>
        <TitleList>Date</TitleList>
        <TitleList>Time</TitleList>
        <TitleList>Recipient role</TitleList>
      </Header>
      <Section>
        {customListNoti?.map((item, index) => {
          return (
            <DivItem onClick={handleItemClick} expanded={expanded} key={index}>
              <Item>{item.title}</Item>
              <Item expanded={expanded} content={content}>
                {item.content}
              </Item>
              <Item>{calDate(item.created_at)}</Item>
              <Item>{calTime(item.created_at)}</Item>
              <Item>{item.role}</Item>
            </DivItem>
          );
        })}
      </Section>
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </List>
  );
};

export default ListNotifications;
