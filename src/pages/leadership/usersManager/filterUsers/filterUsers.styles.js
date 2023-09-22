import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";

export const DivSelect = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
  width: 200px;
  position: relative;
`;

export const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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