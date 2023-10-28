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

const InforUser = ({setChangePass, currentUser, userRole}) => {
  const [update, setUpdate] = useState(false);
  console.log(currentUser)

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
          {(update === false && <Result>{currentUser.full_name}</Result>) || (
            <DivInput>
              <Input />
            </DivInput>
          )}
        </Child>
        <Child>
          <Key>User's Code: </Key>
          <Result>{currentUser.usercode}</Result>
        </Child>
        <Child>
          <Key>Role: </Key>
          <Result>{userRole}</Result>
        </Child>
        <Child>
          <Key>Email: </Key>
          {(update === false && <Result>{currentUser.email}</Result>) || (
            <DivInput>
              <Input />
            </DivInput>
          )}
        </Child>
        <Child>
          <Key>Phone: </Key>
          {(update === false && <Result>{currentUser.mobile}</Result>) || (
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
