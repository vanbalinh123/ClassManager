import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
} from "../../../../generalCss/shared.styles";

import {   
  DivSelect,
  Select,
  Option 
} from "./filterUsers.styles";

const FilterUsers = () => {
  return (
    <Filter>
      <ItemSearch>
        <Input type="text" placeholder="User Code..." />
      </ItemSearch>
      <ItemSearch>
        <Input type="text" placeholder="User Name..." />
      </ItemSearch>
      <DivSelect>
        <Select>
          <Option>All</Option>
          <Option>Leader</Option>
          <Option>Teacher</Option>
          <Option>Student</Option>
        </Select>
      </DivSelect>
      <DivBtnFilter>
        <BtnFilter>Filter</BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterUsers;
