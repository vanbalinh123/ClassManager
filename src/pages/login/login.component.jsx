import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  Select,
  DivSelect,
  Option,
} from "./login.styles";

const Login = () => {
  const userRole = JSON.parse(localStorage.getItem("userRole"));
console.log(userRole)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginTeacher] = useLoginTeacherMutation();
  const [loginAdmin] = useLoginAdminMutation();
  const [loginStudent] = useLoginStudentMutation();

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
    } else if (userRole === "Student") {
      response = await loginStudent(dataLogin);
    }

    try {
      if (response.data.bool === true) {
        localStorage.setItem("userRole", JSON.stringify(userRole));

        alert("Login Successfull");
        if (userRole === "Admin") {
          localStorage.setItem("id_user", JSON.stringify(response.data.admin_id));
          navigate('/leader');
        } else if (userRole === "Teacher") {
          localStorage.setItem("id_user", JSON.stringify(response.data.teacher_id));
          navigate('/teacher'); 
        } else if (userRole === "Student") {
          localStorage.setItem("id_user", JSON.stringify(response.data.student_id));
          navigate('/student')
        }

        window.location.reload();

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
