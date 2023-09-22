import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";

import {
  Form,
  Item,
  Key,
  DivInput,
  DivInputs,
  Input,
  DivBtn,
  Btn,
  MessageErorrs,
} from "./infomations.styles";

const Infomations = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DivInputs>
        <Item>
          <Key>User Name</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="User Name..."
              hasError={!!errors.name}
              {...register("name", {
                required: "Name is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.name && <MessageErorrs>{errors.name.message}</MessageErorrs>}
        <Item>
          <Key>User Code</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Code..."
              hasError={!!errors.code}
              {...register("code", {
                required: "Code is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.code && <MessageErorrs>{errors.code.message}</MessageErorrs>}
        <Item>
          <Key>Email</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Email..."
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
        </Item>
        {errors.email && <MessageErorrs>{errors.email.message}</MessageErorrs>}
        <Item>
          <Key>Password</Key>
          <DivInput>
            <Input
              type="password"
              placeholder="Password..."
              hasError={!!errors.password}
              {...register("password", {
                required: "Password is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.password && (
          <MessageErorrs>{errors.password.message}</MessageErorrs>
        )}
        <Item>
          <Key>Phone</Key>
          <DivInput>
            <Input
              type="number"
              placeholder="Phone..."
              hasError={!!errors.phone}
              {...register("phone", {
                required: "Phone is required!",
              })}
            />
          </DivInput>
        </Item>
        {errors.phone && <MessageErorrs>{errors.phone.message}</MessageErorrs>}
      </DivInputs>
      <DivBtn>
        <Btn>
          <AiOutlineUserAdd size="15px"/>
          Create
        </Btn>
      </DivBtn>
    </Form>
  );
};

export default Infomations;