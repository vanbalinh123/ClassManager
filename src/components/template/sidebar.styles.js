import { styled, css } from "styled-components";
import { NavLink } from "react-router-dom";

import generalStyles from "../../generalCss/general.styles";

export const Sidebar = styled.ul`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: none;
  gap: 3px;
`;

export const Item = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 20px;
`;

export const FlexNavLink = styled(NavLink)`
  display: flex;
  height: 60px;
  background-color: ${generalStyles.bgc};
  color: #ffffff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: none;
  padding-left: 0;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    /* color: ${generalStyles.bgc}; */
    background-color: #ffffff;
    color: ${generalStyles.active};
    font-weight: bold;
  }

  &.active {
    color: ${generalStyles.active};
    border: none;
    width: 102%;
    background-color: #ffffff;
    font-weight: bold;
    padding-left: 30px;
    box-shadow: ${generalStyles.bgc} 0px 2px 8px 0px;
    /* border-left: 10px solid ${generalStyles.bgc}; */
  }
`;

export const ItemName = styled.span``;

//popup
export const Div = styled.div`
  transition: all 0.3s;
  height: 60px;
  color: #ffffff;

  &:hover {
    background-color: #ffffff;
    color: ${generalStyles.active};
    font-weight: bold;
    cursor: pointer;
  }
`;

export const DivPopup = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  gap: 5px;
  background-color: #ffffff;
  margin-left: 5%;
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${generalStyles.textGrey} 0px 2px 8px 0px;
`;

export const NavlinkChild = styled(NavLink)`
  display: flex;
  height: 60px;
  /* border: 1px solid ${generalStyles.border}; */
  color: ${generalStyles.textBlack};
  border-radius: 5px;
  /* background-color: #ffffff; */
  /* background-color: red; */
  /* border-bottom-right-radius: 5px; */
  border-left: none;
  padding-left: 0;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    color: ${generalStyles.bgc};
  }

  &.active {
    color: ${generalStyles.active};
    border: none;
    width: 102%;
    background-color: #ffffff;
    font-weight: bold;
    padding-left: 30px;
      box-shadow: ${generalStyles.bgc} 0px 2px 8px 0px;
    /* border-left: 10px solid ${generalStyles.bgc}; */
  }
`;

export const ItemPopup = styled.span`
 width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 20px;
`;