import { styled, css } from "styled-components";

import generalStyles from "../../../../../../../generalCss/general.styles";

export const Textarea = styled.textarea`
    width: 100%;
  padding: 15px;
  border-radius: 10px;
  min-height: 200px;
  border: none;
  border: 1px solid
    ${(props) => (props.hasError ? "red" : generalStyles.border)};
  box-shadow: 0px 0px 5px ${(props) => (props.hasError ? "red" : "none")};
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "red" : generalStyles.active)};
    box-shadow: 0px 0px 5px
      ${(props) => (props.hasError ? "red" : generalStyles.active)};
  }
`;

export const DivBtn = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const Btn = styled.button`
  display: flex;
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

export const FileInput = styled.input`
  display: none; /* Hide the default file input */
`;

export const AddFileButton = styled.button`
  background-color: ${generalStyles.active};
  padding-top: 10px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

export const SelectedFilesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const SelectedFileItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const DownloadLink = styled.a`
  text-decoration: none;
  color: #3498db;
  margin-right: 10px;
`;

export const RemoveFileButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

export const StyledTextarea = styled.textarea`
  /* Add your textarea styles here */
`;

export const StyledDivBtn = styled.div`
  /* Add your DivBtn styles here */
`;

export const StyledBtn = styled.button`
  /* Add your Btn styles here */
`;
