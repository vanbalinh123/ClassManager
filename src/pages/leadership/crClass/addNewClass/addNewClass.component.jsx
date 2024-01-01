import { useCreateClassMutation } from "../../../../redux/api/leader/class-api.slice";
import UploadClassXML from "./uploadClassXml/uploadClassXml.component";
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
  DivUploadXML,
  Div
} from "./addNewClass.styles";

const AddNewClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [creatClass] = useCreateClassMutation();

  const onSubmit = async (data) => {
    const class_code = data.classCode;
    const class_name = data.className;
    const course = data.course;
    const tution = data.tution;

    const newClass = {
      class_code: class_code,
      class_name: class_name,
      course: course,
      cost: tution,
    };

    const response = await creatClass(newClass);

    if (response.data) {
      toastSuccess(`Create class ${class_code} successful`);
      setValue("classCode", "");
      setValue("className", "");
      setValue("course", "");
      setValue("tution", "");
    } else {
      toastError(`Create class fail, try again!!`);
    }
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Tạo lớp học</Title>
        <DivInputs>
          <Item>
            <Key>Mã lớp</Key>
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
            <Key>Tên lớp</Key>
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
            <Key>Khoá</Key>
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
          <Item>
            <Key>Học phí</Key>
            <DivInput>
              <Input
                type="text"
                placeholder="Tution..."
                hasError={!!errors.course}
                {...register("tution", {
                  required: "Tution is required!",
                })}
              />
            </DivInput>
          </Item>
        </DivInputs>
        <DivBtn>
          <Btn>
            <IoAdd />
            Tạo
          </Btn>
        </DivBtn>
        <ToastCtn />
      </Form>
      <DivUploadXML>
        <UploadClassXML />
      </DivUploadXML>
    </Div>
  );
};

export default AddNewClass;
