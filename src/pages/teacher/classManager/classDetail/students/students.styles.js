import { styled, css } from "styled-components";
import { NavLink } from "react-router-dom";

import generalStyles from "../../../../../generalCss/general.styles";

export const Div = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 30px;
    position: relative;
`;

export const Content = styled.div` 
    display: flex;
    gap: 5%;
`;

export const Left = styled.div` 
    flex: 1;
    height: 130px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const FlexNavLink = styled(NavLink)`
  flex: 1;
  font-size: 14px;
  border: 1px solid ${generalStyles.bgc};
  font-weight: bold;
  color: ${generalStyles.bgc};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: all 0.3s;


  &:hover {
    background-color: ${generalStyles.bgc};
    color: ${generalStyles.textWhite};
  }

  &.active {
    background-color: ${generalStyles.bgc};
    color: ${generalStyles.textWhite};
  }
`;

export const Right = styled.div` 
    flex: 4;
`;

