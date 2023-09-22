import { useState } from "react";

import { BsSend } from 'react-icons/bs';
import { MdOutlineClear } from 'react-icons/md';

import { 
    DivLayoutChangePass,
  LayoutChangPass,
  LayoutOpacity,
  DivInputs,
  ChangePass,
  DivBtnPass,
  DivInput,
  Input,
  Key,
  Btn,
  DivOut
} from "./changePass.styles";

const ChangePassword = ({ changePass, setChangePass }) => {
    
  return (
    <DivLayoutChangePass active={changePass ? "active" : ""}>
      <LayoutOpacity></LayoutOpacity>
      <LayoutChangPass>
        <ChangePass>
            Change Password
            <DivOut
                onClick={() => setChangePass(false)}
            >
                <MdOutlineClear size='30px'/>
            </DivOut> 
        </ChangePass>
        <DivInputs>
            <DivInput>
                <Key>Old Password :</Key>
                <Input />
            </DivInput>
            <DivInput>
                <Key>New Password :</Key>
                <Input />
            </DivInput>
            <DivInput>
                <Key>Confirm Password :</Key>
                <Input />
            </DivInput>
        </DivInputs>
        <DivBtnPass>
            <Btn>
                <BsSend size='15px' />
                Update
            </Btn>
        </DivBtnPass>
      </LayoutChangPass>
    </DivLayoutChangePass>
  );
};

export default ChangePassword;
