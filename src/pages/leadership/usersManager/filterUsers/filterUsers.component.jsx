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
          placeholder="Mã người dùng, tên người dùng, email"
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
          <Option value="Admin">Quản lý</Option>
          <Option value="Teacher">Giáo viên</Option>
          <Option value="Student">Học sinh</Option>
          <Option value="Parents">Phụ huynh</Option>
        </Select>
      </DivSelect>
      <DivBtnFilter>
        <BtnFilter
          onClick={() => handleSearch()}
        >
          Tìm kiếm
        </BtnFilter>
      </DivBtnFilter>
      <DivBtnFilter>
        <BtnFilter
          onClick={() => handleClear()}
        >
          Xoá
        </BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterUsers;
