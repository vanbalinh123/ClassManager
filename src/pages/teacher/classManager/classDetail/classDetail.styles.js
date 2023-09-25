import { styled, css } from "styled-components";

import generalStyles from "../../../../generalCss/general.styles";

export const Choose = styled.div`
    height: 50px;
    margin-top: 10px;
`;

export const Select = styled.select`
    width: 120px;
    height: 100%;
    border: none;
    border: 1px solid ${generalStyles.border};
    border-radius: 10px;
    text-align: center;
`;

export const Option = styled.option`

`;

export const Content = styled.div`
    margin: 30px;
`;



