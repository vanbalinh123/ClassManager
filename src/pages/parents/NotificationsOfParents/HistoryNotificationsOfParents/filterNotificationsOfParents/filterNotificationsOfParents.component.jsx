import { useState } from "react";
import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
} from "../../../../../generalCss/shared.styles";

// import { SelectSearch,Option } from "./filterNotificationsOfParents.styles";

const FilterNotificationsOfParents = ({ setValueSearch }) => {
  const [checkValueSearch, setCheckValueSearch] = useState("");
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
          placeholder="Title, Cotent, Date......"
          value={checkValueSearch}
          onChange={(e) => setCheckValueSearch(e.target.value)}
        />
      </ItemSearch>
      {/* <SelectSearch value={selectedValue} onChange={handleSelectChange}>
        <Option value="teacher">Teacher</Option>
        <Option value="admin">Admin</Option>
      </SelectSearch> */}
      <DivBtnFilter>
        <BtnFilter onClick={() => handleSearch()}>Filter</BtnFilter>
      </DivBtnFilter>
      <DivBtnFilter>
        <BtnFilter onClick={() => handleClear()}>Clear</BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterNotificationsOfParents;
