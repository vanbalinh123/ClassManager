import { styled, css } from "styled-components";

import generalStyles from "../../../generalCss/general.styles"

export const TypeUser = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    height: 50px;
    font-weight: bold;
    font-size: 15px;
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

