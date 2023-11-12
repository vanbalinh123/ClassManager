import { useState } from "react";
import {
  Filter,
  ItemSearch,
  DivBtnFilter,
  BtnFilter,
  Input,
} from "../../../../generalCss/shared.styles";

const FilterClasses = ({
  setClassCode,
  setClassName,
  setCourse
}) => {
  const [checkClassCode, setCheckClassCode] = useState('');
  const [checkClassName, setCheckClassName] = useState('');
  const [checkCourse, setCheckCourse] = useState('');

  const handleSearch = () => {
    setClassCode(checkClassCode)
    setClassName(checkClassName)
    setCourse(checkCourse)
  }

  const handleClear = () => {
    setCheckClassCode("")
    setCheckClassName("")
    setCheckCourse("")
    setClassCode("")
    setClassName("")
    setCourse("")
  }


  return (
    <Filter>
      <ItemSearch>
        <Input 
          type="text" 
          placeholder="Class Code..."
          value={checkClassCode} 
          onChange={(e) => setCheckClassCode(e.target.value)}
        />
      </ItemSearch>
      <ItemSearch>
        <Input 
          type="text" 
          placeholder="Class Name..."
          value={checkClassName} 
          onChange={(e) => setCheckClassName(e.target.value)} 
        />
      </ItemSearch>
      <ItemSearch>
        <Input 
          type="text" 
          placeholder="Courses..." 
          value={checkCourse} 
          onChange={(e) => setCheckCourse(e.target.value)}
        />
      </ItemSearch>
      <DivBtnFilter>
        <BtnFilter
           onClick={() => handleSearch()}
        >Filter</BtnFilter>
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

export default FilterClasses;
