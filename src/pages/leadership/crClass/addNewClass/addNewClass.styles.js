import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";

export const Form = styled.form`
  border-radius: 10px;
  flex: 1;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 5%;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 1px solid ${generalStyles.border};
  box-shadow: ${generalStyles.border} 0px 0px 15px;
`;

export const Title = styled.span`
  padding-left: 15px;
  color: ${generalStyles.active};
  font-weight: bold;
`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  flex: 5;
`;

export const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Key = styled.span`
  flex: 1;
  font-weight: bold;
`;

export const DivInput = styled.div`
  flex: 2;
  position: relative;
  height: 50px;
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
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0px 20px;
  align-items: flex-end;
`;

export const Btn = styled.button`
display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  width: 100px;
  height: 50px;
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
