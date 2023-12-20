import { useState } from "react";
import { Title, Page } from "../../../../generalCss/shared.styles";
import SearchContainer from "../../../../components/search/search";
import ListClassOfStudent from "./listClasses/listClassesOfStudent.component";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";

const ListClassesStudent = () => {
    const [valueSearch, setValueSearch] = useState("");
    
    const { data: listClasses } = useListClassQuery({
        search: `${valueSearch}`,
    });

  return (
    <Page>
      <Title>List classes</Title>
      <SearchContainer
        setValueSearch={setValueSearch}
        placeholder="Class Code, Class Name, Course"
        type="text"
      />
      <ListClassOfStudent 
        listClasses={listClasses}
      />
    </Page>
  );
};

export default ListClassesStudent;
