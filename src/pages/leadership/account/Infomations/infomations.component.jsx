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
    const dulieu = {
      full_name: data.name,
      email: data.email,
      password: data.password,
      mobile: data.phone,
      role: selectedValue.toLowerCase(),
    };

    let response = null;

    if (selectedValue === "Admin") {
      response = await createAdmin(dulieu);
    } else if (selectedValue === "Teacher") {
      // dulieu.classes = [];
      response = await createTeacher(dulieu);
    } else if (selectedValue === "Student") {
      // dulieu.address = "ABC";
      response = await createStudent(dulieu);
    } else if (selectedValue === "Parent") {
      dulieu.student = [data.student.toUpperCase()];
      response = await createParent(dulieu)
    }
    try {
      if (response.data !== undefined) {
        toastSuccess("Tạo tài khoản thành công");
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
        setValue("phone", "");
        setValue("student", "")
      } else {
        toastError("Tạo tài khoản thất bại");
      }
    } catch (error) {
      toastError("Lỗi server!!")
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
              placeholder="Nhập tên ..."
              hasError={!!errors.name}
              {...register("name", {
                required: "Tên không được để trống!",
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
                placeholder="Mã học sinh..."
                hasError={!!errors.student}
                {...register("student", {
                  required: "Mã học sinh không được để trống!",
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
              placeholder="Nhập Email ..."
              hasError={!!errors.email}
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Chưa đúng định dạng",
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
              placeholder="Nhập mật khẩu ..."
              hasError={!!errors.password}
              {...register("password", {
                required: "Mật khẩu không được để trống",
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
              placeholder="Nhập số điện thoại ..."
              hasError={!!errors.phone}
              {...register("phone", {
                required: "Số điện thoại không được để trống",
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
