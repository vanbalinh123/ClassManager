import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Select from 'react-select'

import { useLoginTeacherMutation } from "../../redux/api/login/teacher-login-api.slice";
import { useLoginAdminMutation } from "../../redux/api/login/teacher-login-api.slice";
import { useLoginStudentMutation } from "../../redux/api/login/teacher-login-api.slice";

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
  // Select,
  // DivSelect,
  // Option,
  DivSelect,
  Value,
  SelectButton,
  OptionsContainer,
  Option,
  ArrowIcon,
} from "./login.styles";

const Login = () => {
  // const userRole = JSON.parse(localStorage.getItem("userRole"));
  // console.log(userRole);
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

  //select option

  const [loginTeacher] = useLoginTeacherMutation();
  const [loginAdmin] = useLoginAdminMutation();
  const [loginStudent] = useLoginStudentMutation();

  const onSubmit = async (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    const userRole = selectedOption;

    const dataLogin = {
      email: email,
      password: password,
    };

    console.log(data);

    let response = null;

    if (userRole === "Admin") {
      response = await loginAdmin(dataLogin);
    } else if (userRole === "Teacher") {
      response = await loginTeacher(dataLogin);
    } else if (userRole === "Student") {
      response = await loginStudent(dataLogin);
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
          navigate("/leader");
        } else if (userRole === "Teacher") {
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.teacher_usercode)
          );
          navigate("/teacher");
        } else if (userRole === "Student") {
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.student_usercode)
          );
          navigate("/student");
        } else if (userRole === "Parents") {
          console.log('cc')
          localStorage.setItem(
            "user_code",
            JSON.stringify(response.data.student_usercode)
          );
          navigate("/parents");
        }

        // window.location.reload();
      } else {
        alert("Đăng nhập không thành công");
      }
    } catch (error) {
      alert("Error Server");
    }
  };

  return (
    <Page>
      <Left>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Logo src="/imgs/logo-login.png" />
          <Content>
            <Text>Login</Text>
            <DivInputs>
              <DivInput>
                <Input
                  type="text"
                  placeholder="Your Email..."
                  hasError={!!errors.email}
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
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
                  placeholder="Your Password..."
                  hasError={!!errors.password}
                  {...register("password", {
                    required: "Password is required!",
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
              <Btn>Login</Btn>
            </DivBtn>
            <ForgetPass>Forgot your password ?</ForgetPass>
          </Content>
        </Form>
      </Left>
      <Right>
        <Img src="/imgs/banner-login.png" />
      </Right>
    </Page>
  );
};

export default Login;
