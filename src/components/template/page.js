import { styled, css } from "styled-components";

import generalStyles from "../../generalCss/general.styles";

export const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

//left
export const Left = styled.div`
  width: 20%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  /* background-color: ${generalStyles.hover}; */
  background-color: ${generalStyles.border};
  /* border-right: 1px solid ${generalStyles.border}; */
  /* box-shadow: ${generalStyles.border} 0px 2px 8px 0px; */
`;

export const DivLogo = styled.div`
  border-bottom: 1px solid ${generalStyles.border};
  width: 100%;
  height: 70px;
  display: flex;
  /* box-shadow: ${generalStyles.border} 0px 2px 8px 0px; */
  align-items: center;
  background-color: #ffffff;
  
`;

export const Logo = styled.img`
  width: 200px;
  height: 95%;
  object-fit: contain;
  /* border: 1px solid red; */
`;


