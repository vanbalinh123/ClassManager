import { styled, css } from "styled-components";

import generalStyles from "../../../generalCss/general.styles";

export const Content = styled.div`
  display: flex;
  padding: 3% 3% 3% 3%;
  flex-direction: column;
  gap: 50px;
`;

export const Div = styled.div`
  width: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  text-align: center;
  background-color: ${generalStyles.active};
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${generalStyles.border} 0px 2px 8px 0px;
  transition: all 0.2s;

  &:hover {
    background-color: ${generalStyles.bgrhv};
  }
`;


