import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";

export const Form = styled.form`
  margin: 0 auto;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
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
  flex: 5;
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

export const DivBtn = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
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

export const MessageErorrs = styled.div`
  display: flex;
  justify-content: flex-end;
  color: red;
`;
