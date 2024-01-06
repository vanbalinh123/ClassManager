import styled from "styled-components";
import generalStyles from "../../../../../../generalCss/general.styles";

export const Div = styled.span`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 70;
`;

export const DetailLesson = styled.div`
  position: fixed;
  width: 55%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  /* border: 1px solid ${generalStyles.border}; */
  border-radius: 7px;
  overflow: hidden;
  z-index: 80;
  opacity: none;
  
`;

export const Title = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-weight: bold;
  background-color: ${generalStyles.active};
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
`;

export const Span = styled.span`
  flex: 1;
  font-size: 16px;
`;

export const Date = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-style: italic;
  font-size: 16px;
`;

export const Content = styled.div`
  border: 1px solid ${generalStyles.border};
  height: 50%;
  margin: 20px 40px 10px 40px;
  padding: 15px;
  border-radius: 7px;
  overflow-y: scroll;
  background-color: white;
`;

export const DivButton = styled.div`
position: absolute;
bottom: 0;
left: 0;
right: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Btn = styled.button`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 10px;
  width: 100px;
  height: 50px;
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

export const DivFile = styled.div`
  padding: 10px 20px 1px 20px;
`;

export const Files = styled.div`
  overflow-y: scroll;
  padding-left: 10px;
`;