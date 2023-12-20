import { useState } from "react";

import { List } from "./listNotificationsOfStudent.styles";
import Pagination from "../../../../../components/paginate/paginate";
import DetailNotiST from "./detailNotiST/detailNotiSt.component";

import { 
    Header,
    TitleList,
    Section,
    DivItem,
    Item,
} from "../../../../../generalCss/shared.styles";

const ListNotificationsOfStudent = ({
  listTeacherNotifications,
  listAdminNotifications,
  roleNoti
}) => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState({});

  let listNoti = [];
  if (roleNoti === "teacher") {
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

    console.log(listNoti)
  
    return (
      <List>
        {check === true 
          && 
          <DetailNotiST 
            setCheck={setCheck}
            value={value}
            setValue={setValue}
          />
        }
        <Header>
          <TitleList style={{ flex: "0.5" }}>Title</TitleList>
          <TitleList>Content</TitleList>
          <TitleList style={{ flex: "0.5" }}>Date</TitleList>
          <TitleList style={{ flex: "0.5" }}>Time</TitleList>
          {(roleNoti === "teacher" && (
            <TitleList style={{ flex: "0.5" }}>Class</TitleList>
          )) || <TitleList style={{ flex: "0.5" }}>From</TitleList>}
        </Header>
        <Section>
          {customList?.map((item, index) => (
            <DivItem 
              key={index} 
              onClick={() => handleItemClick(item)}
            >
              <Item style={{ flex: "0.5" }}>{item.title}</Item>
              {(roleNoti === "teacher" && <Item>{item.message}</Item>) || (
                <Item>{item.content}</Item>
              )}
  
              <Item style={{ flex: "0.5" }}>{item.created_at.split(" ")[0]}</Item>
              <Item style={{ flex: "0.5" }}>{item.created_at.split(" ")[1]}</Item>
              {(roleNoti === "teacher" && (
                <Item style={{ flex: "0.5" }}>{item.class_code[0]}</Item>
              )) || <Item style={{ flex: "0.5" }}>{item.usercode}sai</Item>}
            </DivItem>
          ))}
        </Section>
        <Pagination
          totalPages={totalPages}
          handlePageClick={handlePageClick}
        />
      </List>
    )
  };
  
  export default ListNotificationsOfStudent;