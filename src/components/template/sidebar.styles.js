import { styled, css } from "styled-components";
import { NavLink } from "react-router-dom";

import generalStyles from "../../generalCss/general.styles";

export const Sidebar = styled.ul`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  width: 95%;
  border-bottom: none;
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
  height: 50px;
  border-bottom: 1px solid ${generalStyles.border};
  color: ${generalStyles.textBlack};
  border-left: none;
  transition: all 0.3s;

  &:hover {
    color: ${generalStyles.bgc};
  }

  &.active {
    color: ${generalStyles.bgc};
    border-left: 7px solid ${generalStyles.active};
    padding-left: 30px;
  }
`;

export const ItemName = styled.span``;
