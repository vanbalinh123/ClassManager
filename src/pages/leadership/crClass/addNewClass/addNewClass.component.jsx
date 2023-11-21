import { useCreateClassMutation } from "../../../../redux/api/leader/class-api.slice";

import { toastSuccess } from "../../../../components/toast/toast";
import { toastError } from "../../../../components/toast/toast";
import { ToastCtn } from "../../../../components/toast/toast";

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
    setValue
  } = useForm();

  const [creatClass] = useCreateClassMutation();

  const onSubmit = async (data) => {
    const class_code = data.classCode;
    const class_name = data.className;
    const course = data.course;

    const newClass = {
      class_code: class_code,
      class_name: class_name,
      course: course
    }

    const response = await creatClass(newClass);

    if(response.data) {
      toastSuccess(`Create class ${class_code} successful`)
      setValue('classCode', '');
      setValue('className', '');
      setValue('course', '');
    } else {
      toastError(`Create class fail, try again!!`);
    }

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
      <ToastCtn />
    </Form>
  );
};

export default AddNewClass;
