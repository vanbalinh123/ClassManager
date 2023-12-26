import { styled, css } from "styled-components";
import generalStyles from "../../../../generalCss/general.styles";

export const Div = styled.div`
    /* width: 90%; */
    margin: 0 auto;
    gap: 20px;
    /* background-color: red; */
    display: flex;
`;

export const DivHead = styled.div`
    flex: 1;
`;

export const DivSelect = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    border: 1px solid rgba(99, 99, 99, 0.2);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SpanName = styled.span`
   
`;

export const Select = styled.select`
   width: 80%;
   height: 40px;
   border: 1px solid rgba(99, 99, 99, 0.2);
   padding-left: 10px;
`;

export const Option = styled.option`

`;


export const DivBody = styled.div`
    flex: 2;
    border: 1px solid rgba(99, 99, 99, 0.2);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

