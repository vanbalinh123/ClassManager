import { useState } from "react";

import {
  Infors,
  DivImg,
  Img,
  DivInfors,
  Child,
  Key,
  Result,
  DivInput,
  Input,
  DivBtn,
  Btn,
  DivChangePass,
  Span,
  ToChangePass,
} from "./inforUser.styles";

const InforUser = ({setChangePass}) => {
  const [update, setUpdate] = useState(false);

  const handleToUpdate = () => {
    setUpdate(true);
  };

  const handleUpdate = () => {
    setUpdate(false);
  };
  
  return (
    <Infors>
      <DivImg>
        <Img src="/imgs/user-img.jpg" />
      </DivImg>
      <DivInfors>
        <Child>
          <Key>User's Name: </Key>
          {(update === false && <Result>Van Ba linh</Result>) || (
            <DivInput>
              <Input />
            </DivInput>
          )}
        </Child>
        <Child>
          <Key>User's Code: </Key>
          <Result>HS123</Result>
        </Child>
        <Child>
          <Key>Role: </Key>
          <Result>Student</Result>
        </Child>
        <Child>
          <Key>Email: </Key>
          {(update === false && <Result>Vanbalinh123@gmail.com</Result>) || (
            <DivInput>
              <Input />
            </DivInput>
          )}
        </Child>
        <Child>
          <Key>Phone: </Key>
          {(update === false && <Result>0123456789</Result>) || (
            <DivInput>
              <Input />
            </DivInput>
          )}
        </Child>
      </DivInfors>
      <DivBtn>
        {(update === false && (
          <Btn onClick={() => handleToUpdate()}>Update</Btn>
        )) || <Btn onClick={() => handleUpdate()}>Oke</Btn>}
      </DivBtn>
      <DivChangePass>
        <Span>You want to change your password?</Span>
        <ToChangePass onClick={() => setChangePass(true)}>
          Click here
        </ToChangePass>
      </DivChangePass>
    </Infors>
  );
};

export default InforUser;
