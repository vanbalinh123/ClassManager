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
            Thay đổi mật khẩu
            <DivOut
                onClick={() => setChangePass(false)}
            >
                <MdOutlineClear size='30px'/>
            </DivOut> 
        </ChangePass>
        <DivInputs>
            <DivInput>
                <Key>Mật khẩu cũ :</Key>
                <Input />
            </DivInput>
            <DivInput>
                <Key>Mật khẩu mới :</Key>
                <Input />
            </DivInput>
            <DivInput>
                <Key>Xác nhận mật khẩu :</Key>
                <Input />
            </DivInput>
        </DivInputs>
        <DivBtnPass>
            <Btn>
                <BsSend size='15px' />
                Cập nhật
            </Btn>
        </DivBtnPass>
      </LayoutChangPass>
    </DivLayoutChangePass>
  );
};

export default ChangePassword;
