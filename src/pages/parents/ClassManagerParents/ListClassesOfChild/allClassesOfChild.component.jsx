import { useState } from "react";
import { Title, Page } from "../../../../generalCss/shared.styles";
// import FilterClassesOfChild from "./filterClass/filterClassOfChild.component";
import SearchContainer from "../../../../components/search/search";
import ListClassOfChild from "./listClasses/listClassesOfChild.component";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";

const ListClassesChild = () => {
  const [valueSearch, setValueSearch] = useState("");

  const { data: listClasses } = useListClassQuery({
    search: `${valueSearch}`,
  });

  return (
    <Page>
      <Title>Danh sách lớp học</Title>
      <SearchContainer
        setValueSearch={setValueSearch}
        placeholder="Mã lớp, tên lớp..."
        type="text"
      />
      <ListClassOfChild 
            listClasses={listClasses}
      />
    </Page>
  );
};

export default ListClassesChild;
