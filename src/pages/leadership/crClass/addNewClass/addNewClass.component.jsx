import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";

import {
  Form,
  DivInputs,
  Item,
  Key,
  DivInput,
  Input,
  DivBtn,
  Btn,
  Title,
} from "./addNewClass.styles";

const AddNewClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Form 
        onSubmit={handleSubmit(onSubmit)}
    >
      <Title>Create Class</Title>
      <DivInputs>
        <Item>
          <Key>Class Code</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Class code..."
              hasError={!!errors.classCode}
              {...register("classCode", {
                required: "Class Code is required!",
              })}
            />
          </DivInput>
        </Item>
        <Item>
          <Key>Class Name</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Class Name..."
              hasError={!!errors.className}
              {...register("className", {
                required: "Class Name is required!",
              })}
            />
          </DivInput>
        </Item>
        <Item>
          <Key>Course</Key>
          <DivInput>
            <Input
              type="text"
              placeholder="Course..."
              hasError={!!errors.course}
              {...register("course", {
                required: "Course is required!",
              })}
            />
          </DivInput>
        </Item>
      </DivInputs>
      <DivBtn>
        <Btn>
          <IoAdd size="15px"/>
          Create
          </Btn>
      </DivBtn>
    </Form>
  );
};

export default AddNewClass;
