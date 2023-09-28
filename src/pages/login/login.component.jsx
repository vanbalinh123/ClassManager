import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/login-api.slice";
import { useUserQuery } from "../../redux/api/user.slice";

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
  const username = "tedasdsadxt2312312";
  const password = "testasdda23141241123123"

  const handleClick = async () => {
    const data = {
      username: username,
      password: password
    }

    try {
      await login(data).unwrap;
      alert('oke')
      navigate('/teacher/schedule')
    } catch (error) {
      if (error.data) {
        alert(error.data.message)
    } else {
        alert('Errors')
    }
    }
  }

  const { data: user} = useUserQuery();
  console.log(user)

  
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
