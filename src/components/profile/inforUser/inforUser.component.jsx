import { useState } from "react";
import { useEffect } from "react";

import { useUpdateAdminMutation } from "../../../redux/api/leader/update-user.slice";
import { useUpdateTeacherMutation } from "../../../redux/api/leader/update-user.slice";
import { useUpdateStudentMutation } from "../../../redux/api/leader/update-user.slice";

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

const InforUser = ({ setChangePass, currentUser, userRole }) => {
  const [update, setUpdate] = useState(false);
  const [updateUserName, setUpdateUserName] = useState(currentUser?.full_name);
  const [updateEmail, setUpdateEmail] = useState(currentUser?.email);
  const [updatePhone, setUpdatePhone] = useState(currentUser?.mobile);

  const [updateAdmin] = useUpdateAdminMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const handleToUpdate = () => {
    setUpdate(true);
  };

  const handleUpdate = async () => {
    const dataUpdate = {
      full_name: updateUserName,
      email: updateEmail,
      password: currentUser?.password,
      mobile: updatePhone,
      role: userRole.toLowerCase(),
      usercode: currentUser?.usercode
    }

    let response = null;

    if(userRole === 'Admin') {
      response = await updateAdmin(dataUpdate);
    } else if (userRole === 'Teacher') {
      response = await updateTeacher(dataUpdate);
    } else if (userRole === 'Student') {
      response = await updateStudent(dataUpdate);
    }
    
    console.log(response)
    
    if(response.data) {
      alert('Change successfull');
      handleCancel();
    } else {
      alert('Error')
      return;
    }

  };

  const handleCancel = () => {
    setUpdate(false);
  }

  return (
    <Infors>
      <DivImg>
        <Img src="/imgs/user-img.jpg" />
      </DivImg>
      <DivInfors>
        <Child>
          <Key>User's Name: </Key>
          {(update === false && <Result>{currentUser?.full_name}</Result>) || (
            <DivInput>
              <Input 
                type="text" 
                value={updateUserName} 
                onChange={(e) => setUpdateUserName(e.target.value)}
              />
            </DivInput>
          )}
        </Child>
        <Child>
          <Key>User's Code: </Key>
          <Result>{currentUser?.usercode}</Result>
        </Child>
        <Child>
          <Key>Role: </Key>
          <Result>{userRole}</Result>
        </Child>
        <Child>
          <Key>Email: </Key>
          {(update === false && <Result>{currentUser?.email}</Result>) || (
            <DivInput>
              <Input 
                type="text" 
                value={updateEmail} 
                onChange={(e) => setUpdateEmail(e.target.value)}
              />
            </DivInput>
          )}
        </Child>
        <Child>
          <Key>Phone: </Key>
          {(update === false && <Result>{currentUser?.mobile}</Result>) || (
            <DivInput>
              <Input 
                type="text" 
                value={updatePhone}
                onChange={(e) => setUpdatePhone(e.target.value)} 
              />
            </DivInput>
          )}
        </Child>
      </DivInfors>
      {(update === false && (
        <DivBtn>
          <Btn onClick={() => handleToUpdate()}>Update</Btn>
        </DivBtn>
      )) || (
        <DivBtn>
          <Btn onClick={() => handleCancel()}>Cancel</Btn>
          <Btn onClick={() => handleUpdate()}>Send</Btn>
        </DivBtn>
      )}
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
