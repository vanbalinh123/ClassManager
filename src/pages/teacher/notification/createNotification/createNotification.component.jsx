import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useListClassQuery } from "../../../../redux/api/leader/class-api.slice";
import { useListSchedulesQuery } from "../../../../redux/api/leader/schedule-api.slice";
import { useCreateNotiTeacherMutation } from "../../../../redux/api/teacher/teacher-notifications-api.slice";
import { Page, Title } from "../../../../generalCss/shared.styles";
import {
  toastSuccess,
  toastError,
  ToastCtn,
} from "../../../../components/toast/toast";
import {
  Form,
  TitleNoti,
  ContentNoti,
  DivHis,
  BtnHis,
  DivRole,
  Select,
  Option,
  Span,
  DivInput,
  Input,
  Textarea,
  DivTextarea,
  DivSend,
  BtnSend,
} from "./createNotification.styles";
const CreateNotificationTeacher = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [listClass, setListClass] = useState([]);
  const [classToSend, setClassToSend] = useState("");

  const { data: listClasses } = useListClassQuery();
  const { data: listSchedule } = useListSchedulesQuery();
  const [createNoti] = useCreateNotiTeacherMutation();

  const userCode = JSON.parse(localStorage.getItem("user_code"));

  useEffect(() => {
    if (listClasses && listSchedule) {
      const mySchedule = listSchedule.filter(
        (item) => item.teacher_code === userCode
      );

      const updatedListClass = listClasses.filter((classItem) => {
        return mySchedule.some(
          (scheduleItem) => classItem.class_code === scheduleItem.class_code
        );
      });

      setListClass(updatedListClass);
    }
  }, [listClasses, listSchedule, userCode]);


  const onSubmit = async (data) => {
    if (classToSend === "") {
      return toastError(`Lớp học không được để trống`);
    }

    const noti = {
      title: data.title,
      message: data.content,
      class_code: [classToSend],
    };

    const response = await createNoti(noti);
    if(response.data) {
       return toastSuccess(`Gửi thông báo đến lớp ${classToSend} thành công!!`);
    }

    if(response.error) {
        return toastError(`Gửi thông báo đến lớp ${classToSend} thất bại!!`);
    }
  };

  return (
    <Page>
      <Title>TẠO THÔNG BÁO</Title>
      {/* <DivHis>
        <BtnHis onClick={() => navigate("/teacher/historyNotifications")}>
          History
          <MdOutlineNavigateNext size="15px" />
        </BtnHis>
      </DivHis> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DivRole>
          Gửi đến lớp:
          <Select onChange={(e) => setClassToSend(e.target.value)}>
            <Option></Option>
            {listClass?.map((item, index) => (
              <Option key={index}>{item.class_code}</Option>
            ))}
          </Select>
        </DivRole>
        <TitleNoti>
          <Span>Tiêu đề</Span>
          <DivInput>
            <Input
              type="text"
              placeholder="Tiêu đề của thông báo..."
              hasError={!!errors.title}
              {...register("title", {
                required: "Tiêu đề không được để trống!!",
              })}
            />
          </DivInput>
        </TitleNoti>
        <ContentNoti>
          <Span>Nội dung</Span>
          <DivTextarea>
            <Textarea
              type="text"
              placeholder="Nội dung của thông báo..."
              hasError={!!errors.content}
              {...register("content", {
                required: "Nội dung không được để trống!!",
              })}
            />
          </DivTextarea>
        </ContentNoti>
        <DivSend>
          <BtnSend>
            <BsSend size="15px" />
            Gửi
          </BtnSend>
        </DivSend>
      </Form>
      <ToastCtn />
    </Page>
  );
};

export default CreateNotificationTeacher;
