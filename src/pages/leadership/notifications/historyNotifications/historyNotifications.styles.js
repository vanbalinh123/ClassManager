import { css, styled } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";


export const DivBtn = styled.div`
  width: 80%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  width: 100px;
  height: 100%;
  border: none;
  color: ${generalStyles.textWhite};
  background-color: ${generalStyles.bgc};
  letter-spacing: 1px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${generalStyles.active};
  }
`;
