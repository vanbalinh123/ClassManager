import { useState } from "react";
import { useEffect } from "react";

import { useUpdateAdminMutation } from "../../../redux/api/leader/update-user.slice";
import { useUpdateTeacherMutation } from "../../../redux/api/teacher/list-teachers-api.slice";
import { useUpdateStudentMutation } from "../../../redux/api/leader/update-user.slice";

import { ToastCtn } from "../../toast/toast";
import { toastSuccess } from "../../toast/toast";
import { toastError } from "../../toast/toast";

import {
  Infors,
  DivImg,
  Div,
  Img,
  InputImg,
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
  const [selectedFile, setSelectedFile] = useState(currentUser?.avatar);
  const [updateUserName, setUpdateUserName] = useState(currentUser?.full_name);
  const [updateEmail, setUpdateEmail] = useState(currentUser?.email);
  const [updatePhone, setUpdatePhone] = useState(currentUser?.mobile);
  const [avatar, setAvatar] = useState(currentUser?.avatar);

  const [updateAdmin] = useUpdateAdminMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const handleToUpdate = () => {
    setUpdate(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    setUpdateUserName(currentUser?.full_name);
    setUpdateEmail(currentUser?.email);
    setUpdatePhone(currentUser?.mobile);
    setAvatar(currentUser?.avatar);
  }, [currentUser]);

  const handleUpdate = async () => {
    const dataUpdate = new FormData();
    dataUpdate.append("full_name", updateUserName);
    dataUpdate.append("email", updateEmail);
    dataUpdate.append("password", currentUser.password);
    dataUpdate.append("mobile", updatePhone);
    dataUpdate.append("usercode", currentUser?.usercode);
    dataUpdate.append("role", userRole.toLowerCase());

    if (selectedFile) {
      dataUpdate.append("avatar", selectedFile);
    }

    let response = null;

    if (userRole === "Admin") {
      response = await updateAdmin(dataUpdate);
    } else if (userRole === "Teacher") {
      response = await updateTeacher(dataUpdate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)
    } else if (userRole === "Student") {
      response = await updateStudent(dataUpdate);
    }

    if (response.data) {
      toastSuccess("Cập nhật thành công!!!");
      // window.location.reload();
      handleCancel();
    } else {
      toastError("Cập nhật thất bại!!!");
      return;
    }
  };

  const handleCancel = () => {
    setUpdate(false);
  };

  return (
    <Infors>
      <DivImg>
        <Div>
          {(currentUser?.avatar === null && (
            <Img src="/imgs/user-img.jpg" />
          )) || <Img src={avatar} />}
        </Div>
        {update === true && (
          <InputImg type="file" onChange={handleFileChange} />
        )}
      </DivImg>
      <DivInfors>
        <Child>
          <Key>Tên người dùng: </Key>
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
          <Key>Mã người dùng: </Key>
          <Result>{currentUser?.usercode}</Result>
        </Child>
        <Child>
          <Key>Vai trò: </Key>
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
          <Key>Số điện thoại: </Key>
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
          <Btn onClick={() => handleToUpdate()}>Cập nhật</Btn>
        </DivBtn>
      )) || (
        <DivBtn>
          <Btn onClick={() => handleCancel()}>Huỷ</Btn>
          <Btn onClick={() => handleUpdate()}>Lưu</Btn>
        </DivBtn>
      )}
      <DivChangePass>
        <Span>Bạn muốn thay đổi mật khẩu ?</Span>
        <ToChangePass onClick={() => setChangePass(true)}>
          Click here
        </ToChangePass>
      </DivChangePass>
      <ToastCtn />
    </Infors>
  );
};

export default InforUser;
