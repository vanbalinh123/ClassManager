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

  const handleItemClick = () => {
    navigate("/teacher/listClasses/classDetail");
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
        <TitleList>Class Code</TitleList>
        <TitleList>Class Name</TitleList>
        <TitleList>Course</TitleList>
      </Header>
      {(customListClasses?.length > 0 && (
        <Section>
          {customListClasses?.map((item, index) => (
            <DivItem key={index} onClick={() => handleItemClick()}>
              <Item>{item.class_code}</Item>
              <Item>{item.class_name}</Item>
              <Item>{item.course}</Item>
            </DivItem>
          ))}
          
        </Section>
      )) || (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          No corresponding class found!!!
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
