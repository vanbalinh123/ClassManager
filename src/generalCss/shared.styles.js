import { styled, css } from "styled-components";
import generalStyles from "./general.styles";

export const Page = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${generalStyles.bgc};
`;

//search
export const Filter = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

export const ItemSearch = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
  width: 200px;
  position: relative;
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

export const DivBtnFilter = styled.div`
  height: 100%;
  width: 70px;
  position: relative;
`;

export const BtnFilter = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
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

//list
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