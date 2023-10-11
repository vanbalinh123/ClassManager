import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
} from "../../../../../generalCss/shared.styles";

import { SelectSearch, Option } from "./filterNotifications.styles";

const FilterNotifications = () => {
  return (
    <Filter>
      <ItemSearch>
        <Input type="text" placeholder="Title..." />
      </ItemSearch>
      <ItemSearch>
        <Input type="date" placeholder="Date..." />
      </ItemSearch>
      <SelectSearch>
        <Option>Sent</Option>
        <Option>Received</Option>
      </SelectSearch>
      <DivBtnFilter>
        <BtnFilter>Filter</BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterNotifications;
