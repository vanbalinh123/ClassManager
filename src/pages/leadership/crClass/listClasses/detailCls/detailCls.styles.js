import { styled, css } from "styled-components";

import generalStyles from "../../../../../generalCss/general.styles";

export const Div = styled.div` 
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;


export const DivBtn = styled.div`
  height: 50px;
  display: flex;
  gap: 20px;
  margin: 20px 0px;
  justify-content: center;
`;

export const Btn = styled.button`
  display: flex;
  box-shadow: ${generalStyles.border} 0px 2px 8px 0px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
  height: 100%;
  width: 100px;
  border: none;
  color: ${generalStyles.textWhite};
  background-color: ${generalStyles.bgc};
  letter-spacing: 1px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${generalStyles.active};
  }
`;

export const DivInput = styled.div`
  position: relative;
  width: 400px;
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 10px;
  border-radius: 10px;
  border: none;
  border: 1px solid ${generalStyles.border};
  box-shadow: ${generalStyles.border} 0px 2px 8px 0px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color:  ${generalStyles.active};
    box-shadow: 0px 0px 5px ${generalStyles.active}
  }
`;

export const Ctn = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DivUploadXML = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid ${generalStyles.border};
  box-shadow: ${generalStyles.border} 0px 0px 15px;
  margin-bottom: 20px;
`;