import { useState } from "react";
import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
} from "../../../../../generalCss/shared.styles";

// import { SelectSearch, Option } from "./filterNotificationsOfStudent.styles";

const FilterNotificationsOfStudent = ({
  // selectedValue,
  // setSelectedValue,
  setValueSearch,
}) => {
  const [checkValueSearch, setCheckValueSearch] = useState("");

  // const handleSelectChange = (event) => {
  //   const newValue = event.target.value;
  //   setSelectedValue(newValue);
  // };

  const handleSearch = () => {
    setValueSearch(checkValueSearch);
  };

  const handleClear = () => {
    setValueSearch("");
    setCheckValueSearch("");
  };

  return (
    <Filter>
      <ItemSearch>
        <Input
          type="text"
          placeholder="Tiêu đề, nội dung, ngày nhận......"
          value={checkValueSearch}
          onChange={(e) => setCheckValueSearch(e.target.value)}
        />
      </ItemSearch>
      {/* <SelectSearch value={selectedValue} onChange={handleSelectChange}>
        <Option value="teacher">Teacher</Option>
        <Option value="admin">Admin</Option>
      </SelectSearch> */}
      <DivBtnFilter>
        <BtnFilter onClick={() => handleSearch()}>Tìm kiếm</BtnFilter>
      </DivBtnFilter>
      <DivBtnFilter>
        <BtnFilter onClick={() => handleClear()}>Xoá</BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterNotificationsOfStudent;
