import { styled, css } from "styled-components";

import generalStyles from "../../../generalCss/general.styles";

export const Infors = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  position: relative;
`;

export const DivImg = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  object-fit: cover;
`;

export const Div = styled.div`
  border: 1px solid red;
  width: 200px;
  height: 200px;
  border-radius: 200px;
  border: 1px solid ${generalStyles.border};
  box-shadow: 0px 0px 5px ${generalStyles.border}; 
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 200px;
  border: 1px solid ${generalStyles.border};
`;

export const InputImg = styled.input`
  
`;

export const DivInfors = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Child = styled.div`
  flex: 1;
  display: flex;
`;

export const Key = styled.span`
  font-weight: bold;
  font-size: 15px;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Result = styled.span`
  color: ${generalStyles.active};
  flex: 3;
  height: 50px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const DivInput = styled.div`
  flex: 3;
  width: 100%;
  height: 50px;
  position: relative;
`;

export const Input = styled.input`
  font-size: 15px;
  color: ${generalStyles.active};
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
  position: absolute;
  height: 50px;
  right: 0;
  bottom: -50px;
  z-index: 10;
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

export const DivChangePass = styled.div`
  position: absolute;
  height: 40px;
  bottom: -50px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 7px;
  font-style: italic;
`;

export const Span = styled.span``;

export const ToChangePass = styled.span`
  cursor: pointer;
`;