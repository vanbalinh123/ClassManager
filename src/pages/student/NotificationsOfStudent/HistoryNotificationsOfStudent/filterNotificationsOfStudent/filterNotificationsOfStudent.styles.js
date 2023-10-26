import styled from "styled-components";

import generalStyles from "../../../../../generalCss/general.styles";

export const SelectSearch = styled.select`
  width: 200px;
  height: 100%;

  padding-left: 10px;
  border-radius: 10px;
  border: none;
  border: 1px solid ${generalStyles.border};
  box-shadow: none;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color:  ${generalStyles.active};
    box-shadow: 0px 0px 5px ${generalStyles.active}
  }
`;

export const Option = styled.option`
  
`;
