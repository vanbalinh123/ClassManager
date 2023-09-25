import { styled, css } from "styled-components";
import generalStyles from "../../../../../../../generalCss/general.styles";

export const DivReschedule = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  gap: 3%;
  position: relative;
`;

export const Old = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${generalStyles.border};
  border-radius: 7px;
`;

export const New = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${generalStyles.border};
  border-radius: 7px;
`;

export const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Span = styled.span`
  flex: 1;
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
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


export const DivBtn = styled.div`
    position: absolute;
    bottom: -70px;
    right: 0;
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
