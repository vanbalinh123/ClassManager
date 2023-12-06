import { styled, css } from "styled-components";

import generalStyles from "../../generalCss/general.styles";

//right
export const Right = styled.div`
  margin-left: 20%;
  width: 80%;
  margin-top: 50px;
  min-height: 100vh;
  /* border-left: 1px solid ${generalStyles.border}; */
  background-color: ${generalStyles.border};
  /* background-color: #ffffff; */
`;

//header
export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 20%;
  right: 0;
  height: 70px;
  z-index: 1;
  display: flex;
  align-items: center;
  /* color: #ffffff; */
  padding: 0 20px;
  z-index: 1;
  /* background-color: ${generalStyles.bgc}; */
  background-color: #ffffff;
  border-left: none;
  box-shadow: gray 5px 2px 10px 0px;
  border-left: none;

`;

export const Name = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 18px;
`;

export const DivUser = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  position: relative;
`;

export const NameUser = styled.span``;

export const DivImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  border: 1px solid ${generalStyles.border};
  box-shadow: 0px 0px 5px ${generalStyles.border};

  &:hover {
    cursor: pointer;
  }
`;

export const ImgUser = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

//content
export const Content = styled.div`
  height: auto;
  margin: 35px 15px 15px 15px;
  min-height: 100vh;
  /* background-color: ${generalStyles.active}; */
  border-radius: 15px;
  /* border: 1px solid ${generalStyles.border}; */
`;

export const Cover = styled.div`
  margin: 0 auto;
  border-radius: 10px;
  min-height: 100vh;
  background-color: white;
  box-shadow: gray 0px 0px 8px 0px;
`;

export const Other = styled.div`
  position: absolute;
  width: 150px;
  height: 100px;
  border: 1px solid ${generalStyles.border};
  bottom: -110px;
  display: flex;
  flex-direction: column;
  z-index: 98;
  background-color: ${generalStyles.textWhite};
  border-radius: 7px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

export const Span = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding-left: 10px;
  transition: all 0.15s;
  gap: 5px;
  &:hover {
    background-color: ${generalStyles.active};
    color: ${generalStyles.textWhite};
  }
`;
