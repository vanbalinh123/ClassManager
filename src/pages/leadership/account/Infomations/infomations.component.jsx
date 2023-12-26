import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";

import { toastSuccess } from "../../../../components/toast/toast";
import { toastError } from "../../../../components/toast/toast";
import { ToastCtn } from "../../../../components/toast/toast";

import { useCreateAdminMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateTeacherMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateStudentMutation } from "../../../../redux/api/leader/createAccount.slice";
import { useCreateParentsMutation } from "../../../../redux/api/leader/createAccount.slice";

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

const Infomations = ({ selectedValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [createAdmin] = useCreateAdminMutation();
  const [createTeacher] = useCreateTeacherMutation();
  const [createStudent] = useCreateStudentMutation();
  const [createParent] = useCreateParentsMutation();

  const onSubmit = async (data) => {
    console.log(selectedValue);
    const dulieu = {
      full_name: data.name,
      email: data.email,
      password: data.password,
      mobile: data.phone,
      role: selectedValue.toLowerCase(),
    };

    let response = null;
    console.log(dulieu);

    if (selectedValue === "Admin") {
      console.log("ccc");
      dulieu.classes = [];
      response = await createAdmin(dulieu);
    } else if (selectedValue === "Teacher") {
      dulieu.classes = [];
      response = await createTeacher(dulieu);
    } else if (selectedValue === "Student") {
      // dulieu.address = "ABC";
      response = await createStudent(dulieu);
    } else if (selectedValue === "Parent") {
      dulieu.student = [data.student.toUpperCase()];
      response = await createParent(dulieu)
    }
    console.log(response)
    try {
      if (response.data !== undefined) {
        console.log(response.data);
        // alert('Successful')
        toastSuccess("Create Account Successfull");
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
        setValue("phone", "");
        setValue("student", "")
      } else {
        toastError("Create Account Fail");
      }
    } catch (error) {
      console.log("Error Server");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DivInputs>
        <Item>
          <Key>Tên người dùng:</Key>
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
        {selectedValue === "Parent" && (
          <Item>
            <Key>Mã học sinh:</Key>
            <DivInput>
              <Input
                type="text"
                placeholder="student..."
                hasError={!!errors.student}
                {...register("student", {
                  required: "Student code is required!",
                })}
              />
            </DivInput>
          </Item>
        )}
        {selectedValue === "Parent" && errors.student && (
          <MessageErorrs>{errors.student.message}</MessageErorrs>
        )}

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
          <Key>Mật khẩu</Key>
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
          <Key>Số điện thoại</Key>
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
          <AiOutlineUserAdd size="15px" />
          Tạo
        </Btn>
      </DivBtn>
      <ToastCtn />
    </Form>
  );
};

export default Infomations;
