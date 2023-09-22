import { styled, css } from "styled-components";

import generalStyles from "../../../../../generalCss/general.styles";

export const Content = styled.div`
  display: flex;
  padding: 3% 3% 10% 3%;
  gap: 30px;
  position: relative;
  min-height: 600px;
`;

//infor
export const Infors = styled.div`
  flex: 1;
  display: flex;
  height: 240px;
  padding-top: 40px;
`;

export const DivImg = styled.div`
  flex: 1;
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  border: 1px solid ${generalStyles.border};
  box-shadow: 0px 0px 5px ${generalStyles.border};
`;

export const DivInfors = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Child = styled.div`
  flex: 1;
  display: flex;
`;

export const Key = styled.span`
  font-weight: bold;
  flex: 1;
`;

export const Result = styled.span`
  color: ${generalStyles.active};
  flex: 3;
`;

//history
export const DivHistory = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const History = styled.div`
  width: 100%;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  color: ${generalStyles.active};
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

//button
export const DivBtns = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-right: 3%;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  width: 100px;
  height: 100%;
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

export const BtnDelete = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  width: 100px;
  height: 100%;
  border: none;
  color: ${generalStyles.textWhite};
  background-color: #FF0000;
  letter-spacing: 1px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #FF8888;
  }
`;
