import { useState } from "react";
import { useListClassQuery } from "../../../redux/api/leader/class-api.slice";
import { FaArrowDown } from "react-icons/fa";


import { Page, Title } from "../../../generalCss/shared.styles";
import ListClasses from "./listClasses/listClasses.component";
import AddNewClass from "./addNewClass/addNewClass.component";
import SearchContainer from "../../../components/search/search";

import { Content, Div } from "./classes.styles";


const CreateClasses = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [check, setCheck] = useState(false)

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
        <Div onClick={() => setCheck(!check)}>
          Tạo lớp
          <FaArrowDown size='15px'/>
        </Div>
        {check === true
          && <AddNewClass />
        }
        <ListClasses 
          listClasses={listClasses}
        />
      </Content>
    </Page>
  );
};

export default CreateClasses;
