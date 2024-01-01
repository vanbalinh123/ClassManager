import styled from "styled-components";
import generalStyles from "../../../../../../generalCss/general.styles";

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  padding-bottom: 30px;
`;

export const Title = styled.div`
  font-size: ${generalStyles.sizeTitle};
  color: ${generalStyles.active};
  font-weight: bold;
`;

export const FileInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: none;
`;

export const FileInputLabel = styled.label`
  text-align: center;
  width: 150px;
  padding: 10px;
  margin-top: 10px;
  background-color: ${generalStyles.active};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  box-shadow: ${generalStyles.border} 0px 2px 8px 0px;
  transition: all 0.2s;

  &:hover {
    background-color: ${generalStyles.bgrhv};
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;
`;

export const UploadButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
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



export const ErrorAlert = styled.div`
  color: #c0392b;
  font-weight: bold;
`;