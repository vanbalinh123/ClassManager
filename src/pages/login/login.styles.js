import { styled, css } from "styled-components";

import generalStyles from "../../generalCss/general.styles";

export const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const Form = styled.form`
  margin-right: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: ${generalStyles.textBlack};
  width: 350px;
`;

export const Logo = styled.img``;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

export const Text = styled.span`
  font-size: 30px;
  font-weight: bold;
  padding: 20px 0px;
`;

export const DivInputs = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const DivInput = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  border-radius: 20px;
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 15px;
  border-radius: 20px;
  border: none;
  border: 1px solid ${(props) => (props.hasError ? "red" : generalStyles.border)};
  box-shadow: 0px 0px 5px ${(props) => (props.hasError ? "red" : "none")};
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "red" : generalStyles.active)};
    box-shadow: 0px 0px 5px ${(props) => (props.hasError ? "red" : generalStyles.active)};
  }
`;

export const DivInput2 = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
`;

export const Input2 = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 15px;
  border-radius: 20px;
  border: none;
  border: 1px solid ${(props) => (props.hasError ? "red" : generalStyles.border)};
  box-shadow: 0px 0px 5px ${(props) => (props.hasError ? "red" : "none")};
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "red" : generalStyles.active)};
    box-shadow: 0px 0px 5px ${(props) => (props.hasError ? "red" : generalStyles.active)};
  }
`;

export const MessageErorrs = styled.div`
  padding-left: 20px;
  color: red;
`;

export const DivBtn = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  position: relative;
`;

export const Btn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  border: none;
  background-color: ${generalStyles.bgc};
  color: ${generalStyles.textWhite};
  font-weight: bold;
  transition: all 0.3s;
  font-size: 15px;
  letter-spacing: 2px;

  &:hover {
    cursor: pointer;
    background-color: ${generalStyles.hover};
  }
`;

export const ForgetPass = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    color: ${generalStyles.bgc};
  }
`;

export const Right = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
