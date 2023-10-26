import styled from "styled-components";
import generalStyles from "../../../../../../generalCss/general.styles";

export const DetailLesson = styled.span`
  position: fixed;
  width: 55%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 7px;
  overflow: hidden;
  background-color: ${generalStyles.border};
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
  height: 100%;
  margin: 20px 40px 10px 40px;
  padding: 15px;
  border-radius: 7px;
  overflow-y: scroll;
  background-color: white;
`;

export const DivButton = styled.div`
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
