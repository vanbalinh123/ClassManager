import { styled, css } from "styled-components";

import generalStyles from "../../../../../../generalCss/general.styles";

export const Div = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const Header = styled.header`
  height: 40px;
  display: flex;
  align-items: center;
  background-color: ${generalStyles.active};
  color: ${generalStyles.textWhite};
  border-radius: 5px;
`;

export const TitleList = styled.span`
  flex: 1;
  text-align: center;
  font-weight: bold;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;

  &:hover {
    cursor: pointer;
  }
`;

export const DivItem = styled.div`
  border: 1px solid ${generalStyles.border};
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: ${(props) => (props.expanded ? "100%" : "40px")};
  background-color: ${(props) => (props.expanded ? `${generalStyles.bgc}` : `${generalStyles.border}`)};
  transition: all 0.3s;

  &:hover {
    background-color: ${generalStyles.bgc};
  }
`;

export const Item = styled.span`
  flex: 1;
  text-align: ${(props) => (props.expanded ? "none" : "center")};
  padding: ${(props) => (props.expanded ? "20px 0px 20px 0px" : "none")};
  white-space: ${(props) => (props.expanded ? "normal" : "nowrap")};
  overflow: ${(props) => (props.expanded ? "visible" : "hidden")};
  text-overflow: ${(props) => (props.expanded ? "initial" : "ellipsis")};
  transition: all 0.3s;
`;

export const DivBtn = styled.div`
  position: absolute;
  right: 0;
  top: -100px;
  width: 500px;
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

export const DivInput = styled.div`
  position: relative;
  width: 300px;
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 10px;
  border-radius: 10px;
  border: none;
  border: 1px solid ${generalStyles.border};
  box-shadow: none;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color:  ${generalStyles.active};
    box-shadow: 0px 0px 5px ${generalStyles.active}
  }
`;