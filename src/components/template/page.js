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
  border-right: 1px solid ${generalStyles.border};
`;

export const DivLogo = styled.div`
  /* border-bottom: 1px solid ${generalStyles.border}; */
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  /* background-color: blue; */
  position: relative;
  
`;

export const Logo = styled.img`
bottom: -20px;
position: absolute;
  width: 180px;
  /* border: 1px solid red; */
  height: 90px;
  object-fit: fill;
`;


