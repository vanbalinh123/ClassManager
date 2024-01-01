import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";

import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
  DivBtnClear,
  BtnClear,
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
        <BtnFilter onClick={() => handleSearch()}>
          <CiSearch size="20px" />
        </BtnFilter>
      </DivBtnFilter>
      {checkValueSearch !== "" && (
        <DivBtnClear>
          <BtnClear onClick={() => handleClear()}>
            <MdClear size="20px" />
          </BtnClear>
        </DivBtnClear>
      )}
    </Filter>
  );
};

export default FilterNotificationsOfStudent;
