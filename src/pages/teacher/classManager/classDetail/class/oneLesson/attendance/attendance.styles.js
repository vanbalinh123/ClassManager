import { styled, css } from "styled-components";

import generalStyles from "../../../../../../../generalCss/general.styles";

export const PageAttendance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const Span = styled.span`
  flex: 1;
`;

export const Input = styled.input`
  flex: 1;
`;

export const DivBtn = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
  height: 100%;
  width: 100px;
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


