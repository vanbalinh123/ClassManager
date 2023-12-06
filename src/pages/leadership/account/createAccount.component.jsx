import { useState } from "react";

import Infomations from "./Infomations/infomations.component";

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
      <Title>Create Account</Title>
      <TypeUser>
        User Role:
        <Select value={selectedValue} onChange={handleSelectChange}>
          <Option value="Admin">Admin</Option>
          <Option value="Teacher">Teacher</Option>
          <Option value="Student">Student</Option>
          <Option value="Parents">Parents</Option>
        </Select>
      </TypeUser>
      <Infomations 
        selectedValue={selectedValue}
      />
    </Page>
  );
};

export default CreateAccount;
