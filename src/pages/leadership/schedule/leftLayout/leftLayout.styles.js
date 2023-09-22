import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";

//left
export const Left = styled.div`
  flex: 1;
`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

export const Key = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 15px;
`;

export const DivInput = styled.div`
  flex: 3;
  height: 100%;
  position: relative;
`;

export const Input = styled.input`
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