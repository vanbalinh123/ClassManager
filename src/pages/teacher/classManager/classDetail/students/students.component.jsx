import { Outlet } from "react-router-dom";


import FilterStudents from "./filterStudents/filterStudents.component";

import { Div, Content, Left, Right, FlexNavLink } from "./students.styles";

const Students = () => {




  return (
    <Div>
      <FilterStudents />
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
