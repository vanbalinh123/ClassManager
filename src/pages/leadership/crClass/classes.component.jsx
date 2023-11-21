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

  //pagination
  

  return (
    <Page>
      <Title>Class Manager</Title>
      <SearchContainer 
        setValueSearch={setValueSearch}
        placeholder='Class Code, Class Name, Course'
        type='text'
      />
      <Content>
        <ListClasses 
          listClasses={listClasses}
        >
          List Class
        </ListClasses>
        <AddNewClass>Add Class</AddNewClass>
      </Content>
    </Page>
  );
};

export default CreateClasses;
