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
          placeholder="Tiêu đề, nội dung"
          value={checkValueSearch}
          onChange={(e) => setCheckValueSearch(e.target.value)}
        />
      </ItemSearch>

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

export default FilterNotificationsOfParents;
