import { styled, css } from "styled-components";

import generalStyles from "../../../generalCss/general.styles";

export const DivLayoutChangePass = styled.div`
  z-index: 20;
  position: fixed;
  top: 69px;
  left: 348px;
  bottom: 0;
  right: 0;
  display: flex;
  border: 1px solid ${generalStyles.border};
  transform: translateX(100%);
  backdrop-filter: blur(10px);
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      transform: translateX(0);
    `};
`;

export const LayoutOpacity = styled.div`
  background-color: grey;
  opacity: 0.1;
  flex: 3;
`;

export const LayoutChangPass = styled.div`
  z-index: 21;
  flex: 2;
  background-color: ${generalStyles.textWhite};
  border-left: 1px solid ${generalStyles.border};
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0px 5px ${generalStyles.border};
`;

export const ChangePass = styled.span`
  height: 100px;
  font-size: 17px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: ${generalStyles.active};
  font-weight: bold;
  position: relative;
`;

export const DivOut = styled.div`
  color: red;
  position: absolute;
  right: 20px;
  top: 10px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    color: darkred;
  }
`;

export const DivInputs = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0px 20px;
  justify-content: center;
`;

export const DivInput = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
`;

export const Key = styled.span`
  height: 30px;
  font-size: 15px;
  font-weight: bold;
`;

export const Input = styled.input`
  height: 50px;
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

export const DivBtnPass = styled.div`
  height: 150px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
  height: 50px;
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
