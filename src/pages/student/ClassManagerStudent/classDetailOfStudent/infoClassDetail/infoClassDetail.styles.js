import styled from "styled-components";

import generalStyles from "../../../../../generalCss/general.styles";

export const Div = styled.div` 
    width: 100%;
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

export const Content = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 30px 30px 30px;
    border: 1px solid ${generalStyles.border};
    border-top: none;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;

export const Info = styled.div` 
    display: flex;
`;

export const Span = styled.span` 
    flex: 1;
    font-weight: bold;
`;

export const Data = styled.span` 
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const TotalAbsent = styled.span` 
    
`;

export const DetailAbsent = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const DateAbsent = styled.span` 
    padding-left: 10%;
    display: flex;
    align-items: center;
    gap: 5px;
`;