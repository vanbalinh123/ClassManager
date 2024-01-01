import generalStyles from "./general.styles";
import { styled, css } from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
`;

export const Th = styled.th`
  /* background-color: #f2f2f2; */
  background-color: ${generalStyles.bgc};
  text-align: left;
  padding: 10px;

`;

export const Td = styled.td`
  padding: 10px;
  /* white-space: nowrap; */
  overflow: hidden;
  max-width: 150px;
  /* text-overflow: ellipsis; */
  border: 1px solid #ddd;

  ${(props) =>
    props.nowrap ||
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
    `}

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;