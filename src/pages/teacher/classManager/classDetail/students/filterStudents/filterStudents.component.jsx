import {
    Filter,
    ItemSearch,
    DivBtnFilter,
    BtnFilter,
    Input,
  } from "../../../../../../generalCss/shared.styles";
  
  const FilterStudents = () => {
    return (
      <Filter>
        <ItemSearch>
          <Input type="text" placeholder="Class Code..." />
        </ItemSearch>
        <ItemSearch>
          <Input type="text" placeholder="Class Name..." />
        </ItemSearch>
        <ItemSearch>
          <Input type="text" placeholder="Courses..." />
        </ItemSearch>
        <DivBtnFilter>
          <BtnFilter>Filter</BtnFilter>
        </DivBtnFilter>
      </Filter>
    );
  };
  
  export default FilterStudents;