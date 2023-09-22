import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";

export const Form = styled.form`
  display: flex;
  padding: 0% 3% 5% 3%;
  flex-direction: column;
  gap: 20px;
`;

export const DivHis = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
`;

export const BtnHis = styled.button`
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

export const DivRole = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 20px;
  font-size: 15px;
`;

export const Select = styled.select`
  width: 120px;
  height: 100%;
  border: none;
  border: 1px solid ${generalStyles.border};
  border-radius: 5px;
  text-align: center;
`;

export const Option = styled.option``;

export const TitleNoti = styled.div`
  height: 40px;
  display: flex;
  width: 70%;
  margin: 0 auto;
  align-items: center;
`;

export const ContentNoti = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
`;

export const Span = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 15px;
`;

export const DivInput = styled.div`
  flex: 9;
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

export const DivTextarea = styled.div`
  flex: 9;
  min-height: 300px;
  position: relative;
`;

export const Textarea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
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

export const DivSend = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
  width: 70%;
  margin: 0 auto;
`;

export const BtnSend = styled.button`
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