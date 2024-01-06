import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Select from 'react-select'

import { useLoginTeacherMutation } from "../../redux/api/login/teacher-login-api.slice";
import { useLoginAdminMutation } from "../../redux/api/login/teacher-login-api.slice";
import { useLoginStudentMutation } from "../../redux/api/login/teacher-login-api.slice";
import { useLoginParentMutation } from "../../redux/api/login/teacher-login-api.slice";
import { ToastCtn, toastError, toastSuccess } from "../../components/toast/toast";

import {
  Left,
  Right,
  Page,
  Img,
  Form,
  Logo,
  Content,
  Text,
  DivInputs,
  DivInput,
  Input,
  ForgetPass,
  DivBtn,
  Btn,
  DivInput2,
  Input2,
  MessageErorrs,
  DivSelect,
  Value,
  SelectButton,
  OptionsContainer,
  Option,
  ArrowIcon,
} from "./login.styles";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //select option
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Admin");

  const options = [
    { value: "Admin", label: "Admin" },
    { value: "Teacher", label: "Teacher" },
    { value: "Student", label: "Student" },
    { value: "Parents", label: "Parents" },
  ];

  const handleSelectClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setShowOptions(false);
  };


  const [loginTeacher] = useLoginTeacherMutation();
  const [loginAdmin] = useLoginAdminMutation();
  const [loginStudent] = useLoginStudentMutation();
  const [loginParent] = useLoginParentMutation();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const userRole = selectedOption;

    const dataLogin = {
      email: email,
      password: password,
    };

    let response = null;

    if (userRole === "Admin") {
      response = await loginAdmin(dataLogin);
    } else if (userRole === "Teacher") {
      response = await loginTeacher(dataLogin);
    } else if (userRole === "Student") {
      response = await loginStudent(dataLogin);
    } else if (userRole === "Parents") {
      response = await loginParent(data)
    }

    try {
      if (response.data.bool === true) {
        localStorage.setItem("userRole", JSON.stringify(userRole));

        // alert("Login Successfull");
        if (userRole === "Admin") {
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.admin_usercode)
          );
          navigate("/leader/dashboard");
        } else if (userRole === "Teacher") {
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.teacher_usercode)
          );
          navigate("/teacher/schedule");
        } else if (userRole === "Student") {
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.student_usercode)
          );
          navigate("/student/schedule");
        } else if (userRole === "Parents") {
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.parent_usercode)
          );
          navigate("/parents/schedule");
        }

        // window.location.reload();
      } else {
        toastError("Đã xảy ra lỗi, hãy thử lạI!!");
      }
    } catch (error) {
      toastError("Đã xảy ra lỗi, hãy thử lạI!!");
    }
  };

  return (
    <Page>
      <Left>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Logo src="/imgs/logo-login.png" />
          <Content>
            <Text>Đăng nhập</Text>
            <DivInputs>
              <DivInput>
                <Input
                  type="text"
                  placeholder="Nhập email..."
                  hasError={!!errors.email}
                  {...register("email", {
                    required: "Email không được để trống!!",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Không đúng định dạng",
                    },
                  })}
                />
              </DivInput>
              {errors.email && (
                <MessageErorrs>{errors.email.message}</MessageErorrs>
              )}
              <DivInput2>
                <Input2
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  hasError={!!errors.password}
                  {...register("password", {
                    required: "Mật khẩu không được để trống",
                  })}
                />
              </DivInput2>
              {errors.password && (
                <MessageErorrs>{errors.password.message}</MessageErorrs>
              )}
            </DivInputs>
            <DivSelect>
              <SelectButton onClick={handleSelectClick}>
                <Value>{selectedOption}</Value>
                <ArrowIcon>▼</ArrowIcon>
              </SelectButton>
              <OptionsContainer showOptions={showOptions}>
                {options.map((option, index) => (
                  <Option
                    key={index}
                    value={option.value}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </Option>
                ))}
              </OptionsContainer>
            </DivSelect>
            <DivBtn>
              <Btn>Đăng nhập</Btn>
            </DivBtn>
            {/* <ForgetPass>Forgot your password ?</ForgetPass> */}
          </Content>
        </Form>
      </Left>
      <Right>
        <Img src="/imgs/banner-login.png" />
      </Right>
      <ToastCtn />
    </Page>
  );
};

export default Login;
