import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
} from "../../../../../generalCss/shared.styles";

const FilterNotifications = () => {
  return (
    <Filter>
      <ItemSearch>
        <Input type="text" placeholder="Title..." />
      </ItemSearch>
      <ItemSearch>
        <Input type="date" placeholder="Date..." />
      </ItemSearch>
      <DivBtnFilter>
        <BtnFilter>Filter</BtnFilter>
      </DivBtnFilter>
    </Filter>
  );
};

export default FilterNotifications;
