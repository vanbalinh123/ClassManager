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

const ListNotifications = ({
  listTeacherNotifications,
  selectedValue,
  listAdminNotifications,
}) => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState({})

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
    setCheck(true)
    setValue(item)
  };



  return (
    <List>
      {check === true 
        && 
        <DetailNotiTC 
          setCheck={setCheck}
          value={value}
          setValue={setValue}
          selectedValue={selectedValue}
        />
      }
      <Header>
        <TitleList style={{ flex: "0.5" }}>Title</TitleList>
        <TitleList>Content</TitleList>
        <TitleList style={{ flex: "0.5" }}>Date</TitleList>
        <TitleList style={{ flex: "0.5" }}>Time</TitleList>
        {(selectedValue === "sent" && (
          <TitleList style={{ flex: "0.5" }}>To</TitleList>
        )) || <TitleList style={{ flex: "0.5" }}>From</TitleList>}
      </Header>
      <Section>
        {customList?.map((item, index) => (
          <DivItem 
            key={index} 
            onClick={() => handleItemClick(item)}
          >
            <Item style={{ flex: "0.5" }}>{item.title}</Item>
            {(selectedValue === "sent" && <Item>{item.message}</Item>) || (
              <Item>{item.content}</Item>
            )}

            <Item style={{ flex: "0.5" }}>{item.created_at.split(" ")[0]}</Item>
            <Item style={{ flex: "0.5" }}>{item.created_at.split(" ")[1]}</Item>
            {(selectedValue === "sent" && (
              <Item style={{ flex: "0.5" }}>{item.class_code[0]}</Item>
            )) || <Item style={{ flex: "0.5" }}>{item.usercode}</Item>}
          </DivItem>
        ))}
      </Section>
      <Pagination
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </List>
  );
};

export default ListNotifications;
