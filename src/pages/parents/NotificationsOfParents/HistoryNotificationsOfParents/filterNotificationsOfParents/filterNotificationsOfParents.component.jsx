import { 
    Filter,
    ItemSearch,
    DivBtnFilter,
    BtnFilter,
    Input, 
} from "../../../../../generalCss/shared.styles";

import { SelectSearch,Option } from "./filterNotificationsOfParents.styles";

const FilterNotificationsOfParents = () => {
    return (
      <Filter>
        <ItemSearch>
          <Input type="text" placeholder="Title..." />
        </ItemSearch>
        <ItemSearch>
          <Input type="date" placeholder="Date..." />
        </ItemSearch>
        <SelectSearch>
          <Option>All</Option>
          <Option>Teacher</Option>
          <Option>Leadership</Option>
        </SelectSearch>
        <DivBtnFilter>
          <BtnFilter>Filter</BtnFilter>
        </DivBtnFilter>
      </Filter>
    );
  };
  
  export default FilterNotificationsOfParents;
  