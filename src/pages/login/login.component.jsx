import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLoginTeacherMutation } from "../../redux/api/login/teacher-login-api.slice";
import { useLoginAdminMutation } from "../../redux/api/login/teacher-login-api.slice";

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
  Select,
  DivSelect,
  Option,
} from "./login.styles";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginTeacher] = useLoginTeacherMutation();
  const [loginAdmin] = useLoginAdminMutation();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const userRole = data.userRole;

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
    }

    try {
      if (response.data.bool === true) {
        localStorage.setItem("userRole", JSON.stringify(userRole));

        alert("Login Successfull");
        if (userRole === "Admin") {
          navigate('/leader');
        } else if (userRole === "Teacher") {
          navigate('/teacher'); 
        }
      } else {
        alert("Đăng nhập không thành công");
      }
    } catch (error) {
      alert("Đăng nhập không thành công");
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
              <Select
                {...register("userRole", {
                  required: "UserRole is required",
                })}
              >
                <Option>Admin</Option>
                <Option>Teacher</Option>
                <Option>Student</Option>
                <Option>Parents</Option>
              </Select>
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
