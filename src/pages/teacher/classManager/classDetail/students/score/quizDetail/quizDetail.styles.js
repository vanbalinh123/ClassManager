import generalStyles from "../../../../../../../generalCss/general.styles";
import {styled, css} from "styled-components";

export const Div = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const Span = styled.span` 
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
    font-weight: bold;
    color: ${generalStyles.active};
    font-size: ${generalStyles.sizeTitle};
    display: flex;
    gap: 20px;
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
  height: 60px;
  background-color: ${(props) => (props.expanded ? `${generalStyles.bgc}` : `${generalStyles.border}`)};
  transition: all 0.3s;

  &:hover {
    background-color: ${generalStyles.bgc};
  }
`;

export const Item = styled.span`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: ${(props) => (props.expanded ? "none" : "center")};
  padding: ${(props) => (props.expanded ? "20px 0px 20px 0px" : "none")};
  white-space: ${(props) => (props.expanded ? "normal" : "nowrap")};
  overflow: ${(props) => (props.expanded ? "visible" : "hidden")};
  text-overflow: ${(props) => (props.expanded ? "initial" : "ellipsis")};
  transition: all 0.3s;
`;

export const Input = styled.input`
    width: 100%;
  height: 100%;
  /* padding-left: 15px; */
  padding: 15px;
  border: none;
  border: 1px solid ${generalStyles.border};
  border-radius: 3px;
`;

export const DivBtn = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  color: ${generalStyles.textWhite};
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