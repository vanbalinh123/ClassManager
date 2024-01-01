import styled from "styled-components";

import generalStyles from "../../../../../generalCss/general.styles";

export const DivTables = styled.div` 
    width: 100%;
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 50px;
`;

export const DivTable = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TitleTb = styled.div` 
    font-size: ${generalStyles.sizeTitle};
    font-weight: bold;
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  /* border-radius: 150px; */
  border: 1px solid ${generalStyles.border};
  box-shadow: 0px 0px 5px ${generalStyles.border};
`;