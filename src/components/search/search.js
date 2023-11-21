import { useState } from "react";
import { 
    Filter,
    ItemSearch,
    DivBtnFilter,
    BtnFilter,
    Input, 
} from "../../generalCss/shared.styles";

const SearchContainer = ({
    setValueSearch,
    placeholder,
    type,
}) => {

    const [checkValueSearch, setCheckValueSearch] = useState('');

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
            type={type}
            placeholder={placeholder}
            value={checkValueSearch} 
            onChange={(e) => setCheckValueSearch(e.target.value)}
          />
        </ItemSearch>
        <DivBtnFilter>
          <BtnFilter
             onClick={() => handleSearch()}
          >Search</BtnFilter>
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

export default SearchContainer;