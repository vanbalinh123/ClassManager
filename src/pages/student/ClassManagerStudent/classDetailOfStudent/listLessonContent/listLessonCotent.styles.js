import styled from "styled-components";

import generalStyles from "../../../../../generalCss/general.styles";

export const Div = styled.div` 
width: 100%;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    height: auto;
`;

export const Title = styled.div` 
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 15px;
    background-color: ${generalStyles.bgc};
    color: #fff;
    font-weight: bold;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
`;

export const List = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 30px 30px 30px;
    border: 1px solid ${generalStyles.border};
    border-top: none;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;

export const Item = styled.div` 
  border: 1px solid ${generalStyles.border};
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  gap: 20px;
  background-color: ${generalStyles.border};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${generalStyles.bgc};
  }

`;

export const Date = styled.span` 
    height: 20px;
    color: ${generalStyles.active};
    font-weight: bold;
    font-style: italic;
`;

export const Notificate = styled.span` 
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;


