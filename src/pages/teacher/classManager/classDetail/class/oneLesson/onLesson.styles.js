import { styled, css } from "styled-components";

import generalStyles from "../../../../../../generalCss/general.styles";
import { NavLink } from "react-router-dom";

export const Page = styled.div`
  display: flex;
  gap: 5%;
  position: relative;
`;

export const Header = styled.header`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 200px;
  gap: 5px;
`;

export const FlexNavLink = styled(NavLink)`
  flex: 1;
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

export const TitleList = styled.span`
  
`;

export const Section = styled.section`
  flex: 4;
`;

export const BtnBack = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 5px;
  height: 30px;
  width: 150px;
  border: none;
  font-weight: bold;
  background-color: ${generalStyles.border};
  letter-spacing: 1px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: grey;
  }
`;
