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
      toastSuccess(`Tạp lớp ${class_code} thành công`);
      setValue("classCode", "");
      setValue("className", "");
      setValue("course", "");
      setValue("tution", "");
    } else {
      toastError(`Tạo lớp thất bại, hãy thử lại!!`);
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
                placeholder="Mã lớp..."
                hasError={!!errors.classCode}
                {...register("classCode", {
                  required: "Mã lớp không được để trống!",
                })}
              />
            </DivInput>
          </Item>
          <Item>
            <Key>Tên lớp</Key>
            <DivInput>
              <Input
                type="text"
                placeholder="Tên lớp..."
                hasError={!!errors.className}
                {...register("className", {
                  required: "Tên lớp không được để trống!",
                })}
              />
            </DivInput>
          </Item>
          <Item>
            <Key>Khoá</Key>
            <DivInput>
              <Input
                type="text"
                placeholder="Khoá..."
                hasError={!!errors.course}
                {...register("course", {
                  required: "Khoá không được dể trống!",
                })}
              />
            </DivInput>
          </Item>
          <Item>
            <Key>Học phí</Key>
            <DivInput>
              <Input
                type="text"
                placeholder="Học phí..."
                hasError={!!errors.course}
                {...register("tution", {
                  required: "Học phí không được để trống",
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
