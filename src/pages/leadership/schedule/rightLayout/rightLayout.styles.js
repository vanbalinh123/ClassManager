import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";


export const Item2 = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  gap: 3%;
`;

export const Key2 = styled.span`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
`;

export const Date = styled.select`
  flex: 2;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  border: none;
  border: 1px solid ${generalStyles.border};
  text-align: center;
`;

export const Option = styled.option``;

export const DivTime = styled.div`
  flex: 2;
  height: 100%;
  width: 100%;
  position: relative;
`;

export const InputTime = styled.input`
 position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 15px;
  border-radius: 10px;
  border: none;
  border: 1px solid
    ${(props) => (props.hasError ? "red" : generalStyles.border)};
  box-shadow: 0px 0px 5px ${(props) => (props.hasError ? "red" : "none")};
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "red" : generalStyles.active)};
    box-shadow: 0px 0px 5px
      ${(props) => (props.hasError ? "red" : generalStyles.active)};
  }
`;

export const MessageErorrs = styled.div`
  display: flex;
  justify-content: flex-end;
  color: red;
`;