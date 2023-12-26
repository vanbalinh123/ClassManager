import { styled, css } from "styled-components";

import generalStyles from "../../../generalCss/general.styles";

export const Form = styled.form`
  display: flex;
  padding: 3% 3% 10% 3%;
  gap: 5%;
  position: relative;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${generalStyles.border};
  box-shadow: ${generalStyles.border} 0px 2px 8px 0px;
  padding: 30px 20px;
`;

//button
export const DivBtn = styled.div`
position: absolute;
  width: 100px;
  height: 50px;
  bottom: 50px;
  right: 3%;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  height: 100%;
  width: 100%;
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