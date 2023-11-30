import styled from "styled-components";
import generalStyles from "../../../../../../generalCss/general.styles";

export const Layout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: grey;
  opacity: 0.6;
  z-index: 99;
`;

export const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 50%;
  height: 70%;
  background-color: white;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

export const Key = styled.span`
  font-weight: bold;
  font-style: italic;
`;

export const Text = styled.div`
  font-weight: bold;
  color: ${generalStyles.bgc};
  font-size: 18px;
`;

export const DivHead = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
`;

export const DivRole = styled.div`
  flex: 1;
  padding-left: 10px;
`;

export const DivDateTime = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  gap: 10px;
`;


export const DivBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  gap: 10px;
`;

export const DivTitle = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
`;

export const DivContent = styled.div`
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;  
  border: 1px solid ${generalStyles.border};
  border-radius: 5px;
`;


export const DivBtn = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
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