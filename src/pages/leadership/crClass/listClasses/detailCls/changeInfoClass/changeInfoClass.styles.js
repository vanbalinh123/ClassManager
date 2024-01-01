import styled from "styled-components";
import generalStyles from "../../../../../../generalCss/general.styles";

export const Div = styled.div`
 width: 100%;
 padding: 20px 0px 20px 0px;
 display: flex;
 flex-direction: column;
 position: relative;
 gap: 20px;
`;

export const DivTt = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: ${generalStyles.sizeTitle};
  color: ${generalStyles.active};
  font-weight: bold;
`;

export const Btn = styled.button`
position: absolute;
right: 0;
bottom: -20px;
  width: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 5px;
  text-align: center;
  padding: 10px;
  background-color: ${generalStyles.active};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${generalStyles.border} 0px 2px 8px 0px;
  transition: all 0.2s;

  &:hover {
    background-color: ${generalStyles.bgrhv};
  }
`;

export const InputChange = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: none;
  padding-left: 10px;
  border: 1px solid ${generalStyles.active};
`;