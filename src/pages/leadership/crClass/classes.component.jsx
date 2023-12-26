import { useState } from "react";
import { useListClassQuery } from "../../../redux/api/leader/class-api.slice";

import { Page, Title } from "../../../generalCss/shared.styles";
import ListClasses from "./listClasses/listClasses.component";
import AddNewClass from "./addNewClass/addNewClass.component";
import SearchContainer from "../../../components/search/search";

import { Content } from "./classes.styles";


const CreateClasses = () => {
  const [valueSearch, setValueSearch] = useState("");

  const { data: listClasses } = useListClassQuery({
    search: `${valueSearch}`,
  });

  return (
    <Page>
      <Title>Quản lý lớp học</Title>
      <SearchContainer 
        setValueSearch={setValueSearch}
        placeholder='Tìm kiếm theo mã lớp, tên lớp, khoá'
        type='text'
      />
      <Content>
        <ListClasses 
          listClasses={listClasses}
        />
        <AddNewClass />
      </Content>
    </Page>
  );
};

export default CreateClasses;
