import { useState } from "react";

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

const FilterUsers = ({
  selectedValue, 
  setSelectedValue,
  setValueSearch
}) => {
  const [checkValueSearch, setCheckValueSearch] = useState('');


  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  const handleSearch = () => {
    setValueSearch(checkValueSearch)
  }

  const handleClear = () => {
   setValueSearch('')
   setCheckValueSearch('')
  }

  return (
    <Filter>
      <ItemSearch>
        <Input 
          type="text" 
          placeholder="User Code, User Name, User Email..."
          value={checkValueSearch} 
          onChange={(e) => setCheckValueSearch(e.target.value)}
        />
      </ItemSearch>
      {/* <ItemSearch>
        <Input 
          type="text" 
          placeholder="User Name..." 
          value={checkUserName}
          onChange={(e) => setCheckUserName(e.target.value)}
        />
      </ItemSearch>
      <ItemSearch>
        <Input 
          type="text" 
          placeholder="User Email..." 
          value={checkUserEmail}
          onChange={(e) => setCheckUserEmail(e.target.value)}
        />
      </ItemSearch> */}
      <DivSelect>
        <Select value={selectedValue} onChange={handleSelectChange}>
          <Option value="Admin">Admin</Option>
          <Option value="Teacher">Teacher</Option>
          <Option value="Student">Student</Option>
          <Option value="Parents">Parents</Option>
        </Select>
      </DivSelect>
      <DivBtnFilter>
        <BtnFilter
          onClick={() => handleSearch()}
        >
          Filter
        </BtnFilter>
      </DivBtnFilter>
      <DivBtnFilter>
        <BtnFilter
          onClick={() => handleClear()}
        >
          Clear
        </BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterUsers;
