import { Outlet } from "react-router-dom";
import { useState } from "react";
import FilterStudents from "./filterStudents/filterStudents.component";
import SearchContainer from "../../../../../components/search/search";
import { Div, Content, Left, Right, FlexNavLink } from "./students.styles";

const Students = () => {
  const [valueSearch, setValueSearch] = useState("");


  return (
    <Div>
      {/* <FilterStudents /> */}
      <Content>
        <Left>
          <FlexNavLink to='listStudents'>List</FlexNavLink>
          <FlexNavLink to='listAssignments'>Score</FlexNavLink>
        </Left>
        <Right>
            <Outlet />
        </Right>
      </Content>
      
    </Div>
  );
};

export default Students;
