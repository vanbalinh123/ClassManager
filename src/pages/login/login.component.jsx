import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/login-api.slice";

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
} from "./login.styles";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    // navigate('/leader/dashboard')
    // navigate('/teacher/schedule')
  };

  const [login] = useLoginMutation();
  const username = "test";
  const password = "test23141241"

  const handleClick = async () => {
    const data = {
      username: username,
      password: password
    }

    try {
      const response = await login({ username, password });

      if (response.data && response.data.token) {
        // Lưu token vào localStorage hoặc trạng thái Redux
        localStorage.setItem('accessToken', response.data.token);

        // Điều hướng đến trang sau khi đăng nhập thành công
        navigate('/leader/dashboard')
      } else {
        alert('Đăng nhập không thành công');
      }
    } catch (error) {
      alert('Đăng nhập không thành công');
    }
  }


  
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
            <DivBtn>
              <Btn>Login</Btn>
            </DivBtn>
            <ForgetPass>Forgot your password ?</ForgetPass>
          </Content>
        </Form>
        <button style={{width: '300px', backgroundColor: 'red'}}
          onClick={() => handleClick()}
        >
          Oke
        </button>
      </Left>
      <Right>
        <Img src="/imgs/banner-login.png" />
      </Right>
    </Page>
  );
};

export default Login;
