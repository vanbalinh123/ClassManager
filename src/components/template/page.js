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
  border-bottom: 1px solid ${generalStyles.border};
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 200px;
  height: 100%;
  object-fit: contain;
`;


