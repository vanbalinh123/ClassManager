import { useState } from "react";


import Infomations from "./Infomations/infomations.component";
import UploadListUserXML from "./upLoadUsersXml/uploadUserXml.component";
import { Page, Title } from "../../../generalCss/shared.styles";
import { TypeUser, Select, Option } from "./createAccount.styles";

const CreateAccount = () => {
  const [selectedValue, setSelectedValue] = useState("Admin");

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };


  return (
    <Page>
      <Title>Tạo tài khoản</Title>
      <TypeUser>
        Vai trò:
        <Select value={selectedValue} onChange={handleSelectChange}>
          <Option value="Admin">Quản lý</Option>
          <Option value="Teacher">Giáo viên</Option>
          <Option value="Student">Học sinh</Option>
          <Option value="Parent">Phụ huynh</Option>
        </Select>
      </TypeUser>
      <Infomations 
        selectedValue={selectedValue}
      />
      <UploadListUserXML />
    </Page>
  );
};

export default CreateAccount;
