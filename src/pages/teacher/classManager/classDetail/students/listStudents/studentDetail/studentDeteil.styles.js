import { styled, css } from "styled-components";

import generalStyles from "../../../../../../../generalCss/general.styles";

export const Layout = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
  bottom: 0;
  left: 345px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(100%);
  backdrop-filter: blur(10px);
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      transform: translateX(0);
    `};
`;

export const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: ${generalStyles.border}; */
  background-color: #ffffff;

  opacity: 0.7;
`;

export const Detail = styled.div`
  position: absolute;
  border-radius: 10px;
  width: 800px;
  /* height: 500px; */
  z-index: 21;
  background-color: #ffffff;
  border: 1px solid ${generalStyles.border};
  box-shadow: 0px 0px 10px 5px ${generalStyles.border};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-weight: bold;
  color: ${generalStyles.active};
  font-size: ${generalStyles.sizeTitle};
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 30px 0px 30px;
`;

export const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Div = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

export const Div2 = styled.div`
  min-height: 130px;
  display: flex;
  padding-top: 4px;
  /* align-items: center; */
  /* border: 1px solid red; */
`;

export const Span = styled.span`
  flex: 1;
  font-weight: bold;
`;

export const Value = styled.span`
  flex: 1;
  color: ${generalStyles.active};
`;

export const Value2 = styled.span`
  flex: 1;
  color: ${generalStyles.active};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  border: 1px solid ${generalStyles.border};
  box-shadow: 0px 0px 5px ${generalStyles.border};
`;

export const DivBtn = styled.div`
  /* position: absolute;
  bottom: 0; */
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
`;

export const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
  height: 50px;
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
