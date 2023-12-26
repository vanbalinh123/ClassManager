import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListClassQuery } from "../../../redux/api/leader/class-api.slice";
import SearchContainer from "../../../components/search/search";

import Pagination from "../../../components/paginate/paginate";

import {
  Header,
  TitleList,
  Section,
  DivItem,
  Item,
} from "../../../generalCss/shared.styles";
import { ListClass } from "./tuition.styles";
import { Page, Title } from "../../../generalCss/shared.styles";

const Tuition = () => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");

  const { data: listClasses } = useListClassQuery({
    search: `${valueSearch}`,
  });

  const handleClick = (classCode) => {
    navigate(`/leader/tuition/${classCode}`);
  };

  //paginate
  const itemsPerPage = 10;
  const totalItems = listClasses?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const customListClasses = listClasses?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //paginate

  return (
    <Page>
      <Title>Danh sách lớp học</Title>
      <SearchContainer
        setValueSearch={setValueSearch}
        placeholder="Tìm kiếm theo mã lớp, tên lớp, khoá"
        type="text"
      />
      <ListClass>
        <Header>
          <TitleList>Mã lớp</TitleList>
          <TitleList>Tên lớp</TitleList>
          <TitleList>Khoá</TitleList>
        </Header>
        <Section>
          {customListClasses?.reverse()?.map((item, index) => (
            <DivItem onClick={() => handleClick(item.class_code)} key={index}>
              <Item>{item.class_code}</Item>
              <Item>{item.class_name}</Item>
              <Item>{item.course}</Item>
            </DivItem>
          ))}
        </Section>
      </ListClass>        
      <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
    </Page>
  );
};

export default Tuition;
