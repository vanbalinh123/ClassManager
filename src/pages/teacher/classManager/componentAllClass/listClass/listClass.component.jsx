import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../../../../components/paginate/paginate";
import { ListClass } from "./listClass.styles";
import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../../../generalCss/shared.styles";

const ListClassOfTeacher = ({ listClass }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    console.log(item)
    navigate(`/teacher/listClasses/classDetail/${item.class_code}`);
  };

    //paginate
    const itemsPerPage = 10;
    const totalItems = listClass?.length;
    console.log(listClass)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);
  
    const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };
  
  
    const customListClasses = listClass?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );

    console.log(customListClasses)
    //paginate

  return (
    <ListClass>
      <Header>
        <TitleList>Mã lớp</TitleList>
        <TitleList>Tên lớp</TitleList>
        <TitleList>Khoá học</TitleList>
      </Header>
      {(customListClasses?.length > 0 && (
        <Section>
          {customListClasses?.map((item, index) => (
            <DivItem key={index} onClick={() => handleItemClick(item)}>
              <Item>{item.class_code}</Item>
              <Item>{item.class_name}</Item>
              <Item>{item.course}</Item>
            </DivItem>
          ))}
          
        </Section>
      )) || (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          Không tìm thấy dữ liệu thích hợp!!
        </div>
      )}
      <Pagination
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
    </ListClass>
  );
};

export default ListClassOfTeacher;
